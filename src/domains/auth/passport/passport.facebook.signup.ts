import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import {createUserWithAuth} from '../auth.service';
import {wrapAsync} from '../../../utils/utils';
import {NotFoundError} from '../../../errors/not-found-error';
const keys = require('../../../config/keys');

passport.use('facebook-signup', new FacebookStrategy({
	clientID: keys.facebook_client_id,
	clientSecret: keys.facebook_client_secret,
	callbackURL: `${keys.ui_url}/api/auth/signup/facebook/callback`,
	profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
},  wrapAsync(async (accessToken, refreshToken, profile, done) => {
	if (!profile.id) throw new NotFoundError('profile id not found');
	// profile.id
	// profile.photos[0]['value']
	// profile.emails[0]['value']
	const savedUser = await createUserWithAuth({ email: profile.emails[0]['value'], username: profile.displayName });
	return done(null, { _id: savedUser._id });
})));