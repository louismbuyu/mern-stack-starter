import {AuthRequest} from './auth.models';
import {UserSchema} from '../users/user.schema';

export const convertAuthRequestToUserSchema = (authRequest: AuthRequest): Partial<UserSchema> => {
	const newUserSchema: Partial<UserSchema> = {
		email: authRequest.email,
		username: authRequest.username
	};

	return newUserSchema;
};