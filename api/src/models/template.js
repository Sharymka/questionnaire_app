const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Template = sequelize.define('Template', {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Title cannot be empty'
			}
		}
	},
	topic: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Title cannot be empty'
			}
		}
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Title cannot be empty'
			}
		}
	},
	questions: {
		type: DataTypes.JSON,
		allowNull: false,
	}
}, {
	timestamps: true,
	tableName: 'templates'
});

module.exports = Template;
