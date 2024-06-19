import { ApiProperty } from '@nestjs/swagger';

export class BanUserDTO {
	@ApiProperty({ example: 1, description: 'id пользователя' })
	readonly userId: number;
	@ApiProperty({ example: "Непристойное поведение", description: 'Причина бана' })
	readonly reason: string;
}
