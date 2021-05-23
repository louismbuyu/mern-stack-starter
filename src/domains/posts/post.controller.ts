import { Router } from 'express';
import passport from 'passport';
import {validator, wrapAsync} from '../../utils/utils';
import {createPost} from './post.service';
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
			const post = await createPost(req.user.id, { post: req.body.post }, session);
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

module.exports = router;