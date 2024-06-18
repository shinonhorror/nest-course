import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
	@ApiProperty({ example: 'example@gmail.com', description: 'Почта' })
	readonly email: string;
	@ApiProperty({ example: 'password', description: 'Пароль' })
	readonly password: string;
}
