import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/user-roles/user-roles.model';

interface UserCreationAttribute {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttribute> {
	@ApiProperty({ example: '1', description: 'Уникальный id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ example: 'example@gmail.com', description: 'Почта' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	email: string;

	@ApiProperty({ example: 'password', description: 'Пароль' })
	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password: string;

	@ApiProperty({ example: true, description: 'Флаг бана' })
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	banned: boolean;

	@ApiProperty({
		example: 'Непристойное поведение',
		description: 'Причина бана',
	})
	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	banReason: string;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];
}
