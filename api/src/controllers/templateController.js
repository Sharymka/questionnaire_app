
const { createTemplate } = require('../services/templateService');
async function create(req, res) {
	try {
		const {
			title,
			topic,
			description,
			questions,
			// answerType,
			// checkboxes,
			// accessLevel,
			// selectedUsers,
			// selectedTags
		} = req.body;

		const template = await createTemplate(
			title,
			topic,
			description,
			questions
		);

		if(template) {
			res.status(200).json('template saved successfully');
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
    }
}

module.exports = {create};