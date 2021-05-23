import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {getUserByEmail} from '../../users/users.service';
const keys = require('../../../config/keys');

passport.use('facebook-login', new FacebookStrategy({
	clientID: keys.facebook_client_id,
	clientSecret: keys.facebook_client_secret,
	callbackURL: `${keys.ui_url}/api/auth/login/facebook/callback`,
	profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
}, async (accessToken, refreshToken, profile, done) => {
	const email = profile.emails[0]['value'];
	const user = await getUserByEmail(email);
	return done(null, { _id: user._id });
}));