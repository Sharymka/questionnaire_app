const sequelize = require('../config/db');
const User = require('./user');
const Form = require('./forms');
const Template = require('./template');

// Определяем ассоциации
Form.belongsTo(User, { foreignKey: 'idUser', as: 'user' });
Form.belongsTo(Template, { foreignKey: 'idTemplate', as: 'template' });
User.hasMany(Form, { foreignKey: 'idUser', as: 'forms' });
Template.hasMany(Form, { foreignKey: 'idTemplate', as: 'forms' });

// Экспортируем модели и sequelize
module.exports = {
	sequelize,
	User,
	Form,
	Template
};
