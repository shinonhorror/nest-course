import { ApiProperty } from '@nestjs/swagger';
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript';
import { UserRoles } from 'src/user-roles/user-roles.model';
import { User } from 'src/users/users.model';

interface RoleCreationAttribute {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttribute> {
	@ApiProperty({ example: '1', description: 'Уникальный id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number;

	@ApiProperty({ example: 'ADMIN', description: 'Роль' })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: true,
	})
	value: boolean;

	@ApiProperty({
		example: 'Администратор',
		description: 'Описание роли',
	})
	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	description: string;

	@BelongsToMany(() => User, () => UserRoles)
	users: User[];
}
