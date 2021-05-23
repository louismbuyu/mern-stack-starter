import {AuthRequest} from '../auth/auth.models';
import {UserSchema} from '../users/user.schema';
import {Post, PostRequest} from './post.model';
import {PostSchema} from './post.schema';
import {User} from '../users/user.models';


export const convertPostRequestToPostSchema = (postRequest: PostRequest): Partial<PostSchema> => {
	const newPostSchema: Partial<PostSchema> = {
		post: postRequest.post,
	};

	return newPostSchema;
};

export const convertPostSchemaToPostModel = (postSchema: PostSchema): Post => {
	const newPostModel: Post = {
		_id: postSchema._id,
		post: postSchema.post,
		user: postSchema.user,
		createdAt: postSchema.createdAt,
		updatedAt: postSchema.updatedAt
	};
	return newPostModel;
};