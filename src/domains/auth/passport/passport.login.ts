import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {UserCollection} from '../../users/user.schema';
import {wrapAsync} from '../../../utils/utils';
import {getUserByUsername} from '../../users/users.service';

passport.use('login', new LocalStrategy({
	usernameField : 'username',
	passwordField : 'email'
}, wrapAsync( async (username, email, done) => {
	const user = await getUserByUsername(username);
	return done(null, { _id: user._id });
})));