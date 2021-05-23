import { Router } from 'express';
import passport from 'passport';
import {getUserById, getUsers} from './users.service';
import {wrapAsync} from '../../utils/utils';
const router = Router();

router.get('/',
	passport.authenticate('jwt', { session: false }),
	wrapAsync(async (req, res) => {
		const users = await getUsers();
		return res.send(users);
	}));

router.get('/:id',
	passport.authenticate('jwt', { session: false }),
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const user = await getUserById(id);
		return res.send(user);
	}));

module.exports = router;