
const User = require('./user');
const Form = require('./forms');
const Template = require('./template');

// Определяем ассоциации
Form.belongsTo(User, { foreignKey: 'idUser', as: 'user' });
Form.belongsTo(Template, { foreignKey: 'idTemplate', as: 'template' });
User.hasMany(Form, { foreignKey: 'idUser', as: 'forms' });
Template.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Template.hasMany(Form, { foreignKey: 'idTemplate', as: 'forms' });

// Экспортируем модели и sequelize
module.exports = {
	User,
	Form,
	Template
};
