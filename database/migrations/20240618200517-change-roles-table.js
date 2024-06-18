'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('roles', 'banned');
		await queryInterface.removeColumn('roles', 'banReason');

		await queryInterface.addColumn('roles', 'value', {
			type: Sequelize.DataTypes.STRING,
			unique: true,
			allowNull: true,
		});
		await queryInterface.addColumn('roles', 'description', {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('roles', 'banned', {
			type: Sequelize.DataTypes.BOOLEAN,
			defaultValue: false,
		});
		await queryInterface.addColumn('roles', 'banReason', {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		});

		await queryInterface.removeColumn('roles', 'description');
		await queryInterface.removeColumn('roles', 'value');
	},
};
