
const { getTemplate, createTemplate, removeTemplate, updateTemplate} = require('../services/templateService');

async function get(req, res) {
	try {
		const templates = await getTemplate();
		if(templates) {
			res.status(200).json(templates);
		}else {
			res.status(404).json({ message: 'No templates found' });
		}
	}catch (error) {
		res.status(500).json({ error: error.message});
	}
}

async function getTemplateById(req, res) {
	const { id } = req.params;
	try {
		const template = await getTemplate(id);
		if (template) {
			res.status(200).json(template);
		} else {
			res.status(404).json({ message: 'Template not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}


async function create(req, res) {
	try {
		const {
			title,
			topic,
			description,
			questions,
			img,
			tags
		} = req.body;

		const template = await createTemplate(
			title,
			topic,
			description,
			questions,
			img,
			tags
		);

		if(template) {
			res.status(200).json('template saved successfully');
		}else {
			res.status(404).json({ message: 'No template found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
    }
}

async function remove(req, res) {

	const id = req.params.id;
	try {
		const templates = await removeTemplate(id);
		if(templates) {
			res.status(200).json('template was removed successfully');
		}else {
			res.status(404).json({ message: "template wasn't removed" });
		}
	}catch (error) {
		res.status(500).json({ error: error.message});
	}
}
async function update(req, res) {
	try {
		const {
			title,
			topic,
			description,
			questions,
			tags,
			img
		} = req.body;

		const editedTemplate = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
			tags:tags,
			img:img
		}

		const id = req.params.id;

		const response = await updateTemplate(editedTemplate, id);
		if(response) {
			res.status(200).json('template saved successfully');
		}else {
			res.status(404).json({ message: 'No template found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

module.exports = {get, getTemplateById,  create, remove, update};