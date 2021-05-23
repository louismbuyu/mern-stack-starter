import {Document, model, Model, Schema} from 'mongoose';
import {UserSchema} from '../users/user.schema';

export interface PostSchema extends Document {
    _id: string;
    post: string;
    user: Schema.Types.ObjectId | UserSchema;
    createdAt: string;
    updatedAt: string;
}

const PostSchemaMongo = new Schema<PostSchema>({
	post: {
		type: String,
		required : true
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	}
}, {
	timestamps: true
});

const diffHistory = require('mongoose-diff-history/diffHistory').plugin;
PostSchemaMongo.plugin(diffHistory);
export const PostCollection: Model<PostSchema> = model('posts', PostSchemaMongo);