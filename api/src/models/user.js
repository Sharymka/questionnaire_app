const { DataTypes } = require('sequelize');
const sequelize = require('../config/alwaysData');
const Form = require('../models/forms');

const User = sequelize.define('User', {
	first_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	last_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.ENUM('user', 'admin'),
		defaultValue: 'user',
	},
	status: {
		type: DataTypes.ENUM('active', 'blocked'),
		defaultValue: 'active',
	},
}, {
	timestamps: true,
	tableName: 'users'
});

module.exports = User;
