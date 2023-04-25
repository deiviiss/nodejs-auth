import { Strategy } from 'passport-local';

// service
import { AuthService } from '../../../services/auth.services.js'
const service = new AuthService()

// estrategy
export default class LocalStrategy extends Strategy {
  constructor() {
    super({
      usernameField: 'username',
    }, async (username, password, done) => {

      try {
        const user = await service.getUser(username, password)
        done(null, user)
      } catch (error) {
        done(error, false)
      }
    });
  }
}

// export const LocalStrategy = new Strategy({
//   usernameField: 'username',
// },
//   async (username, password, done) => {
//     try {

//       const user = await service.getUser(username, password)

//       done(null, user)

//     } catch (error) {
//       done(error, false)
//     }
//   })
