import Joi from 'joi';

export const ValidAuthSchema = Joi.object({
	email: Joi.string().required(),
	username: Joi.string().required()
});

export interface AuthRequest {
    email: string;
    username: string;
}