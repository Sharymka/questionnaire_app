const {getAll, getOne, createForms, removeOneForm, updateForms} = require("../services/formService");

async function getForms(req, res) {
	try {
		const forms = await getAll();
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
			questions
		} = req.body;

		const form = await createForms(
			idTemplate,
			idUser,
			questions,
		);

		if(form) {
			res.status(200).json('form saved successfully');
		}else {
			res.status(404).json({ message: 'No form saved' });
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

async function getForm(req, res) {
	const { id } = req.params;

	try {
		const form = await getOne(id);
		if (form) {
			res.status(200).json(form);
		} else {
			res.status(404).json({ message: 'Form not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
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

module.exports = {getForms, createForm, getForm, removeForm, updateForm};