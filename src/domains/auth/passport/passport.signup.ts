import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import {createUserWithAuth} from '../auth.service';
import {wrapAsync} from '../../../utils/utils';

passport.use('signup-email', new LocalStrategy({
	usernameField : 'username',
	passwordField : 'email'
},  wrapAsync(async (username, email, done) => {
	const savedUser = await createUserWithAuth({ email, username });
	return done(null, { _id: savedUser._id });
})));