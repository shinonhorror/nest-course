import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDTO {
	@ApiProperty({
		example: 'ADMIN',
		description: 'Роль',
	})
	readonly value: string;
	@ApiProperty({ example: 1, description: 'id пользователя' })
	readonly userId: number;
}
