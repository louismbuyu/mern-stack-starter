import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expressWinston from 'express-winston';
import winston from 'winston';
import errorMiddleware from './utils/middleware/error.middleware';
const keys = require('./config/keys');
const app = express();

require('./domains/auth/passport/passport.signup');
require('./domains/auth/passport/passport.login');
require('./domains/auth/passport/passport.jwt');
require('./domains/auth/passport/passport.facebook.signup');
require('./domains/auth/passport/passport.facebook.login');

const dev = app.get('env') !== 'production';
let transports: any[] = [
	new winston.transports.Console()
];

require('winston-mongodb');
mongoose.connect(keys.mongo_url, { useNewUrlParser: true, autoIndex: false, useUnifiedTopology: true });
// mongoose.set('debug', (collectionName, methodName, ...methodArgs) => {
// 	console.log('collectionName: ',collectionName);
// 	console.log('methodName: ',methodName);
// 	console.log('methodArgs: ',methodArgs);
// });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
transports = [...transports, new winston.transports.MongoDB({
	db : keys.mongo_url,
	level : 'info',
	metaKey: 'meta'
})];

if (dev) {
	app.use(cors());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressWinston.logger({
	transports,
	meta: true,
	requestWhitelist: [
		'url',
		'method',
		'httpVersion',
		'originalUrl',
		'query',
		'body'
	],
	responseWhitelist: [
		'method',
		'body',
		'statusCode'
	],
	// optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	msg: 'HTTP {{req.method}} {{req.url}}',
	expressFormat: true
}));

app.use('/api/auth', require('./domains/auth/auth.controller'));
app.use('/api/users', require('./domains/users/users.controller'));
app.use('/api/posts', require('./domains/posts/post.controller'));

app.get('/', (req, res) => {
	return res.send('Hello World!');
});

app.use(errorMiddleware);

module.exports = {
	app
};