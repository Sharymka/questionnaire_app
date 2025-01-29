const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');
const sequelize = require('../config/alwaysData');

const Template = sequelize.define('Template', {
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	img: {
		type: DataTypes.STRING,
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
	tags: {
		type: DataTypes.JSON,
		allowNull: true,
	},
	questions: {
		type: DataTypes.JSON,
		allowNull: false,
	},
	disable: {
		type: DataTypes.BOOLEAN,
		defaultValue: true,
		allowNull: false,
	}
}, {
	timestamps: true,
	tableName: 'templates'
});

module.exports = Template;
