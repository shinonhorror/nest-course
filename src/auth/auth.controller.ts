import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@ApiOperation({ summary: 'Авторизация' })
	@Post('/login')
	login(@Body() userDTO: CreateUserDTO) {
		return this.authService.login(userDTO);
	}

	@ApiOperation({ summary: 'Регистрация' })
	@Post('/registration')
	registration(@Body() userDTO: CreateUserDTO) {
		return this.authService.registration(userDTO);
	}
}
