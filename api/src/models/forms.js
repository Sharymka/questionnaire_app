const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
const sequelize = require('../config/alwaysData');

const Form = sequelize.define('Form', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	idTemplate: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	idUser: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	questions: {
		type: DataTypes.JSON,
		allowNull: true,
	},
}, {
	tableName: 'forms',
	timestamps: true
});

module.exports = Form;
