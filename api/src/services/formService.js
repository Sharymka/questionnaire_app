const { Form, User, Template} =require('../models/index');


class FormService {

	static async getForms() {
		return await Form.findAll(
			{
			include: [
				{
					model: User,
					attributes: ['first_name', 'last_name', 'email'],
					as: 'user'
				},
				{
					model: Template,
					attributes: ['img', 'topic', 'title', 'description'],
					as: 'template'
				}
			]
		}
		);
	}


	static async createForms(
		idTemplate,
		idUser,
		question,
		answerType,
		answer,
		access,
		selectedUsers

	) {

		return  await Form.create({
			idUser: idUser,
			idTemplate:idTemplate,
			question:question,
			answerType:answerType,
			answer:answer,
			access:access,
			selectedUsers:selectedUsers
		})
	}

	static async updateForms(editedForm , id) {
		return await Form.update(editedForm, { where: {id: id}, returning: true });
	}

	static async removeOneForm(id) {
		return await Form.destroy({where: {id: id}});
	}
}

module.exports = FormService;