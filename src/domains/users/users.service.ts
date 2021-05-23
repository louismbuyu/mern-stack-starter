import {User} from './user.models';
import {UserCollection, UserSchema} from './user.schema';
import {NotFoundError} from '../../errors/not-found-error';
import {convertUserSchemaToUserModel} from './user.convert';

export const createUser = async (partialUserSchema: Partial<UserSchema>): Promise<User> => {
	const savedUserSchema = await new UserCollection(partialUserSchema).save();
	return convertUserSchemaToUserModel(savedUserSchema);
};

export const getUsers = async (): Promise<User[]> => {
	const users = await UserCollection.find({});
	return users.map((us) => convertUserSchemaToUserModel(us));
};

export const getUserByUsername = async (username: string): Promise<User | undefined> => {
	const user = await UserCollection.findOne({ username });
	if (!user) throw new NotFoundError('User not found');
	return user;
};

export const getUserByEmail = async (email: string): Promise<User | undefined> => {
	const user = await UserCollection.findOne({ email });
	if (!user) throw new NotFoundError('User not found');
	return user;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
	const user = await UserCollection.findById(id);
	if (!user) throw new NotFoundError('User not found');
	return user;
};