import {Post, PostRequest} from './post.model';
import {PostCollection} from '../posts/post.schema';
import {convertPostRequestToPostSchema, convertPostSchemaToPostModel} from './post.convert';
import {ClientSession} from 'mongoose';
import {UserCollection} from '../users/user.schema';

export const createPost = async (userId: string, postRequest: PostRequest, session: ClientSession): Promise<Post> => {
	const partialPostSchema = convertPostRequestToPostSchema(postRequest);
	const savedPostSchema = await PostCollection.insertMany([partialPostSchema], { session });
	await UserCollection.findOneAndUpdate({_id: userId },
		{ $inc: { postsCount: 1 },  },
		{ runValidators: true, new: true })
		.session(session);
	return convertPostSchemaToPostModel(savedPostSchema[0]);
};