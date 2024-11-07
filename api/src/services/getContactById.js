const axios = require('axios');

// Функция для получения контакта по его ID
async function getContactById(accessToken, contactId) {
	try {
		const response = await axios.get(
			`https://itransition14-dev-ed.develop.my.salesforce.com/services/data/v62.0/sobjects/Contact/${contactId}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		console.log('Contact Data:', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching contact:', error.response ? error.response.data : error.message);
	}
}

// Пример использования
const accessToken = '00DWU00000BrWBV!AQEAQKz3efESL6ovOs6Dv7lyh969KzrmxQz.QpGCSNl3YAu7SfSi4yZKzlDhQ8BqrJt8ITsF5a960WNbnD93DWLB2Bg0MN7k';  // Ваш access token
const contactId = ' 003WU000008T1wzYAC';
getContactById(accessToken, contactId);
