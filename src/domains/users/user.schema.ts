import mongoose, { Model, Document, Schema, model } from 'mongoose';
import mongooseSchemaJson from 'mongoose-schema-jsonschema';
const config = require('mongoose-schema-jsonschema/config');
mongooseSchemaJson(mongoose);

export interface UserSchema extends Document {
    _id: string;
    email: string;
    username: string;
	postsCount: number,
    createdAt: string;
    updatedAt: string;
}

const UserSchemaMongo = new Schema<UserSchema>({
	email: {
		type: String,
		required : true,
		unique: true
	},
	username: {
		type: String,
		required : true,
		lowercase: true,
		unique: true
	},
	age: {
		type: Number,
		min: 18,
		max: 60
	},
	postsCount: {
		type: Number,
		default: 0,
		min: 0,
	}
}, {
	timestamps: true
});

// config({});
// // @ts-ignore
// const jsonSchema = UserSchemaMongo.jsonSchema();
//
// console.dir(jsonSchema, { depth: null });
const diffHistory = require('mongoose-diff-history/diffHistory').plugin;
UserSchemaMongo.plugin(diffHistory);
export const UserCollection: Model<UserSchema> = model('users', UserSchemaMongo);


const userEventEmitter = UserCollection.watch();

userEventEmitter.on('change', change => {
	console.log('JSON.stringify(change): ', change);
});