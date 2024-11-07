const axios = require('axios');

async function getAccessToken(clientId, clientSecret, username, password) {
	try {
		const data = new URLSearchParams();
		data.append('client_id', clientId);
		data.append('client_secret', clientSecret);
		data.append('grant_type', 'password');
		data.append('username', username);
		data.append('password', password);

		const response = await axios.post('https://login.salesforce.com/services/oauth2/token', data, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded', // Content-Type для формы
			},
		});

		console.log('Access Token:', response.data.access_token);
		return response.data.access_token;
	} catch (error) {
		console.error('Error getting access token:', error.response ? error.response.data : error.message);
	}
}

module.exports = getAccessToken;