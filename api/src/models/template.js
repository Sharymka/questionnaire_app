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
		type: DataTypes.TEXT,
		allowNull: true,
		get() {
			const value = this.getDataValue('tags');
			return value ? JSON.parse(value) : null;
		},
		set(value) {
			this.setDataValue('tags', JSON.stringify(value));
		}
	},
	questions: {
		type: DataTypes.TEXT,
		allowNull: false,
		get() {
			const value = this.getDataValue('questions');
			return value ? JSON.parse(value) : null;
		},
		set(value) {
			this.setDataValue('questions', JSON.stringify(value));
		}
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
