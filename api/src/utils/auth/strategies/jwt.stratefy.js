import { Strategy, ExtractJwt } from 'passport-jwt';

import { config } from '../../../config.js'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

export default class JwtStrategy extends Strategy {
  constructor() {
    super(options, (payload, done) => {
      return done(null, payload)
    });
  }
}

// const JwtStrategy = new Strategy(options, (payload, done) => {
//   return done(null, payload)
// });

// module.exports = JwtStrategy