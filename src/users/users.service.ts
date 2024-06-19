import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDTO } from './dto/add-role.dto';
import { BanUserDTO } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService,
	) {}

	async createUser(dto: CreateUserDTO) {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('USER');
		await user.$set('roles', [role.id]);

		user.roles = [role];
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });

		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: {
				all: true,
			},
		});

		return user;
	}

	async addRole(dto: AddRoleDTO) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.roleService.getRoleByValue(dto.value);

		if (user && role) {
			await user.$add('role', role.id);
			return dto;
		}

		throw new HttpException(
			'Пользователь или роль не найдены',
			HttpStatus.NOT_FOUND,
		);
	}

	async addBan(dto: BanUserDTO) {
		const user = await this.userRepository.findByPk(dto.userId);
		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
		}
		user.banned = true;
		user.banReason = dto.reason;

		await user.save();

		return user;
	}
}
