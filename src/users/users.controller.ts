import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { BelongsToMany } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/user-roles/user-roles.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Создание пользователя' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDTO: CreateUserDTO) {
		return this.usersService.createUser(userDTO);
	}

	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@UseGuards(JwtAuthGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];
}
