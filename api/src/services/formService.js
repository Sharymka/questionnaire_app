const { Form, User, Template} =require('../models/index');


class FormService {

static async getAll() {
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

	static async getOne(id) {
		return await Form.findOne({
			where: { id },
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
		});

	}


	static async createForms(
		idTemplate,
		idUser,
		questions,
	) {

		return  await Form.create({
			idUser: idUser,
			idTemplate: idTemplate,
			questions: questions
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