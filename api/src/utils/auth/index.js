import passport from 'passport'

import LocalStrategy from './strategies/local.strategy.js';
import JwtStrategy from './strategies/jwt.stratefy.js'

passport.use(new LocalStrategy())
passport.use(new JwtStrategy())

export default passport