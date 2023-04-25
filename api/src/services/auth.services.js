import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UserService } from '../services/user.service.js'
import { config } from '../config.js'

const service = new UserService()

export class AuthService {

  async getUser (username, password) {
    const user = await service.findByUserName(username)

    if (!user) {
      throw new Error('username or password is incorrect')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new Error('username or password is incorrect')
    }

    return user
  }

  async singToken (user) {

    const jwtConfig = {
      expiresIn: '2h'
    }

    const payload = {
      sub: user._id.toString(),
      role: user.role
    }

    const token = jwt.sign(payload, config.jwtSecret, jwtConfig)

    return { user, token }
  }
}