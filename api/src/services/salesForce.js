const axios = require('axios');

async function createAccount(accessToken, accountData) {
	try {
		const response = await axios.post(
			'https://itransition14-dev-ed.develop.my.salesforce.com/services/data/v62.0/sobjects/Account',
			{
				Name: accountData.name,
				Industry: accountData.industry,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);
		console.log("Успешное создание аккаунта. ID:", response.data.id);
		return response.data.id;
	} catch (error) {
		if (error.response) {
			console.error("Ошибка Salesforce:", error.response.data);
			console.error("HTTP статус ошибки:", error.response.status);
			console.error("Сообщение об ошибке:", error.response.data[0]?.message);
			console.error("Код ошибки в Salesforce:", error.response.data[0]?.errorCode);
		} else {
			console.error("Ошибка при запросе:", error.message);
		}
	}
}



async function createContact(accessToken, contactData, accountId) {
	try {
		const response = await axios.post(
			'https://itransition14-dev-ed.develop.my.salesforce.com/services/data/v62.0/sobjects/Contact',
			{
				FirstName: contactData.firstName,
				LastName: contactData.lastName,
				Email: contactData.email,
				AccountId: accountId,
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			}
		);
		console.log("Успешное создание контакта. ID:", response.data.id);
		return response.data.id;
	} catch (error) {
		if (error.response) {
			console.error("Ошибка Salesforce:", error.response.data);
			console.error("HTTP статус ошибки:", error.response.status);
			console.error("Сообщение об ошибке:", error.response.data[0]?.message);
			console.error("Код ошибки в Salesforce:", error.response.data[0]?.errorCode);
		} else {
			console.error("Ошибка при запросе:", error.message);
		}
	}
}


module.exports = { createAccount, createContact };