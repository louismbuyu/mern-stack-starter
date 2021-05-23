import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {wrapAsync} from '../../../utils/utils';
import {getUserById} from '../../users/users.service';
const keys = require('../../../config/keys');

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.token_socket
};

passport.use(new JwtStrategy(opts, wrapAsync(async (jwtPayload, done) => {
	const user = await getUserById(jwtPayload.id);
	return done(null, { _id: user._id });
})));