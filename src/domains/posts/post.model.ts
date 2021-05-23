import Joi from 'joi';
import {Schema} from 'mongoose';
import {UserSchema} from '../users/user.schema';

export const ValidPostRequestSchema = Joi.object({
	post: Joi.string().required(),
});

export interface PostRequest {
    post: string;
}

export interface Post {
    _id: string;
    post: string,
    user: Schema.Types.ObjectId | UserSchema;
    createdAt: string;
    updatedAt: string;
}