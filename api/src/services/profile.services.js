import { ProfileModel } from '../models/Profile.js';

export class ProfileService {

  async create (data) {
    console.log('data profile')
    console.log(data)
    const newProfile = await ProfileModel.create(data);
    return newProfile;
  }

  async findById (id) {
    const profile = await ProfileModel.findById(id);
    return profile;
  }

  async findByUserId (userId) {
    const profile = await ProfileModel.findOne({ userId });
    return profile;
  }

  async updateById (id, data) {
    const profile = await ProfileModel.findByIdAndUpdate(id, data, { new: true });
    return profile;
  }

  async deleteById (id) {
    const profile = await ProfileModel.findByIdAndDelete(id);
    return profile;
  }
}
