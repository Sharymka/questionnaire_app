// testSalesforceContact.js
const createSalesforceContact = require('../utils/salesforceService');

// Пример данных для отправки
const userData = {
	FirstName: 'Иван',
	LastName: 'Иванов',
	Email: 'ivan.ivanov@example.com',
	Phone: '123456789',
};

createSalesforceContact(userData);
