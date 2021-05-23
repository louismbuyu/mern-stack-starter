import {User} from '../../../src/domains/users/user.models';
const mockingoose = require('mockingoose');
import {createUserWithAuth} from '../../../src/domains/auth/auth.service';
import {AuthRequest} from '../../../src/domains/auth/auth.models';
import {UserCollection} from '../../../src/domains/users/user.schema';


describe('Auth unit tests', () => {

	it('createUser return createdUser with email and username', async () => {
		const reqVal: AuthRequest = {
			email: 'test@test.com',
			username: 'test'
		};

		mockingoose(UserCollection).toReturn({ ...reqVal  }, 'save');

		const createdUser: User = await createUserWithAuth(reqVal);

		expect(createdUser._id).toBeDefined();
		expect(createdUser.email).toBe('test@test.com');
		expect(createdUser.username).toBe('test');
	});
});