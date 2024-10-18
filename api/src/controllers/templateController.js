
const { getTemplate, createTemplate } = require('../services/templateService');

async function get(req, res) {
	try {
		const templates = await getTemplate();
		console.log(templates);
		if(templates) {
			res.status(200).json(templates);
		}else {
			res.status(404).json({ message: 'No templates found' });
		}
	}catch (error) {
		res.status(500).json({ error: error.message});
	}
}

async function create(req, res) {
	try {
		const {
			title,
			topic,
			description,
			questions,
		} = req.body;

		const template = await createTemplate(
			title,
			topic,
			description,
			questions
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

module.exports = {get, create};