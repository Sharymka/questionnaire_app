const Template = require("../models/template");

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
}

module.exports = TemplateService;