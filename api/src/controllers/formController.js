const {getForms, createForms, removeOneForm, updateForms} = require("../services/formService");
async function getForm(req, res) {
	try {
		const forms = await getForms();
		if(forms) {
			res.status(200).json(forms);
		}else {
			res.status(404).json({ message: 'No form found' });
		}
	}catch (error) {
		res.status(500).json({ error: error.message});
	}
}
async function createForm(req, res) {
	try {
		const {
			idTemplate,
			idUser,
			question,
			answerType,
			answer,
			access,
			selectedUsers
		} = req.body;

		const form = await createForms(
			idTemplate,
			idUser,
			question,
			answerType,
			answer,
			access,
			selectedUsers
		);

		if(form) {
			res.status(200).json('form saved successfully');
		}else {
			res.status(404).json({ message: 'No form found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

async function removeForm(req, res) {

	const id = req.params.id;
	try {
		const form = await removeOneForm(id);
		if(form) {
			res.status(200).json('form was removed successfully');
		}else {
			res.status(404).json({ message: "form wasn't removed" });
		}
	}catch (error) {
		res.status(500).json({ error: error.message});
	}
}
async function updateForm(req, res) {
	try {
		const {
			title,
			topic,
			description,
			questions,
		} = req.body;

		const editedTemplate = {
			title:title,
			topic:topic,
			description:description,
			questions:questions,
		}

		const id = req.params.id;

		const response = await updateForms(editedTemplate, id);
		if(response) {
			res.status(200).json('form saved successfully');
		}else {
			res.status(404).json({ message: 'No form found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message});
	}
}

module.exports = {getForm, createForm, removeForm, updateForm};