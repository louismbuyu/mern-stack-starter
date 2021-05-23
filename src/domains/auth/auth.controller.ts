import {Router} from 'express';
import {ValidAuthSchema} from './auth.models';
import {generateTokenForUserId} from './auth.service';
import {validator} from '../../utils/utils';
import passport from 'passport';
const router = Router();

router.post('/signup',
	validator.body(ValidAuthSchema),
	passport.authenticate('signup-email', {session : false}),
	async (req, res) => {
		const user = req.user as { _id: string };
		const token = generateTokenForUserId(user._id);
		return res.send({ token });
	});

router.post('/login',
	validator.body(ValidAuthSchema),
	passport.authenticate('login', {session : false}),
	async (req, res) => {
		const user = req.user as { _id: string };
		const token = generateTokenForUserId(user._id);
		return res.send({ token });
	});

router.get('/signup/facebook', passport.authenticate('facebook-signup', {scope:['email'], session : false}));

router.get('/signup/facebook/callback',
	passport.authenticate('facebook-signup', { failureRedirect: '/', session : false }),
	(req, res) => {
		const user = req.user as { _id: string };
		const token = generateTokenForUserId(user._id);
		return res.send({ token });
	});

module.exports = router;