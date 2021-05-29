import { createValidator } from 'express-joi-validation';
export const validator = createValidator({});

export const wrapAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch(next);
	};
};

export const wrapAsyncWithTransaction = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((error) => {
			req.transactionSession.abortTransaction();
			req.transactionSession.endSession();
			next(error);
		});
	};
};