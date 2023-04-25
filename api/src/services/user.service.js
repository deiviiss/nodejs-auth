import bcrypt from 'bcrypt'
import { UserModel } from '../models/User.js';
import { ProfileService } from './profile.services.js';
const service = new ProfileService()

export class UserService {

  async create (body) {

    const hash = await bcrypt.hash(body.password, 10)

    const newUser = await UserModel.create({
      ...body, //clona el objeto data
      password: hash //cambia la propiedad password
    });

    // create profile
    await service.create({
      userId: newUser._id,
      name: newUser.username
    });

    return newUser
  }

  async findByUserName (userName) {
    const user = await UserModel.findOne({ username: userName })
    return user;
  }
}