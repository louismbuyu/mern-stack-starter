import jwt from 'jsonwebtoken';
import {AuthRequest} from './auth.models';
import {convertAuthRequestToUserSchema} from './auth.convert';
import {User} from '../users/user.models';
import {createUser} from '../users/users.service';
const keys = require('../../config/keys');

export const createUserWithAuth = async (authRequest: AuthRequest): Promise<User> => {
	const partialUserSchema = convertAuthRequestToUserSchema(authRequest);
	return createUser(partialUserSchema);
};

const getRandomInt = (max) => {
	return Math.floor(Math.random() * Math.floor(max));
};

export const newUsername = (email): string => {
	const name = email.split('@')[0];
	const nameReplace = name.replace(/@.*$/, '');
	return `${nameReplace}${getRandomInt(10000)}`;
};

export const generateTokenForUserId = (userId: string): string => {
	return jwt.sign({ id: userId }, keys.token_socket,{
		expiresIn: 60 * 5 // expires in 24 hours times 7 = 7 days
	});
};