import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';

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
}
