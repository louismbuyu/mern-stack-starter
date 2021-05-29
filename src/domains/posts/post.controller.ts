import { Router } from 'express';
import passport from 'passport';
import {validator, wrapAsync, wrapAsyncWithTransaction} from '../../utils/utils';
import {createPostWithSession} from './post.service';
import {ValidPostRequestSchema} from './post.model';
import mongoose from 'mongoose';
const router = Router();

router.post('/',
	validator.body(ValidPostRequestSchema),
	passport.authenticate('jwt', { session: false }),
	wrapAsync(async (req, res) => {
		const session = await mongoose.startSession();
		session.startTransaction();
		try {
			const post = await createPostWithSession(req.user.id, { post: req.body.post }, session);
			await session.commitTransaction();
			return res.send(post);
		} catch (e) {
			console.log('e: ',e);
			await session.abortTransaction();
			return res.status(500).send('Error: '+e.message);
		} finally {
			session.endSession();
		}
	}));

const withTransaction = (req, res, next) => {
	mongoose.startSession().then((clientSession) => {
		clientSession.startTransaction();
		req.transactionSession = clientSession;
		next();
	});
};

router.post('/new',
	validator.body(ValidPostRequestSchema),
	passport.authenticate('jwt', { session: false }),
	withTransaction,
	wrapAsyncWithTransaction( async (req, res) => {
		const post = await createPostWithSession(req.user.id, { post: req.body.post }, req.transactionSession);
		await req.transactionSession.commitTransaction();
		res.send(post);
	}));



module.exports = router;