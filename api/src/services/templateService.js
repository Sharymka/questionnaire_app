const Template = require("../models/template");
const {id} = require("nodemon");

class TemplateService {

	static async getTemplate(id= null) {

		if (id) {
			return await Template.findOne({ where: { id, disable: true } });
		}

		return  await Template.findAll({where: {disable: true}});
	}

	static async createTemplate(
		title,
		topic,
		description,
		questions,
		img,
		tags
	) {
		return  await Template.create({
			userId: 1,
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:tags,
			img:img
		})
	}

	static async updateTemplate(editedTemplate , id) {
		return await Template.update(editedTemplate, { where: {id: id}, returning: true });
	}

	static async removeTemplate(id) {
		return await Template.update({ disable: false },{where: {id: id}});
	}
}

module.exports = TemplateService;