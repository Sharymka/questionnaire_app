const Template = require("../models/template");
const {id} = require("nodemon");

class TemplateService {

	static async getTemplate() {

		return  await Template.findAll();
	}
	static async createTemplate(
		title,
		topic,
		description,
		questions
	) {

		return  await Template.create({
			userId: 1,
			title:title,
			topic:topic,
			description:description,
			questions:questions,
		})
	}

	static async updateTemplate(editedTemplate , id) {
		return await Template.update(editedTemplate, { where: {id: id}, returning: true });
	}

	static async removeTemplate(id) {
		return await Template.destroy({where: {id: id}});
	}
}

module.exports = TemplateService;