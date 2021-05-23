import { createValidator } from 'express-joi-validation';
export const validator = createValidator({});

export const wrapAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};


export const wrapAsyncWithSession = (fn) => {
	// const session = mongoose.startSession();
	// session.startTransaction();
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};