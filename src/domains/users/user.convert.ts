import {User} from './user.models';
import {UserSchema} from './user.schema';

export const convertUserModelToUserSchema = (user: User): Partial<UserSchema> => {
	const newUserSchema: Partial<UserSchema> = {
		email: user.email,
		username: user.username,
		postsCount: user.postsCount,
	};
	return newUserSchema;
};

export const convertUserSchemaToUserModel = (userSchema: UserSchema): User => {
	const newUserModel: User = {
		_id: userSchema._id,
		email: userSchema.email,
		username: userSchema.username,
		postsCount: userSchema.postsCount,
	};
	return newUserModel;
};