import request from 'supertest';
const {
	dbConnect,
	dbDisconnect,
} = require('../../utils/dbHandler.utils');
const { app } = require('../../../src/app');

describe('Auth integration tests', () => {

	beforeAll(async () => dbConnect());
	afterAll(async () => dbDisconnect());

	const endpointUrl = '/api/auth/signup';
	it('Sign up - POST ' + endpointUrl, async () => {
		const response = await request(app)
			.post(endpointUrl)
			.send({
				email: 'test@test.com',
				username: 'test'
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.token).toBeDefined();
		expect(response.body.user._id).toBeDefined();
		expect(response.body.user.email).toBe('test@test.com');
		expect(response.body.user.username).toBe('test');
	});
});