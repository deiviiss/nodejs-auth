import Mongoose from 'mongoose';

export const UserSchema = new Mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    profileId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

export const UserModel = Mongoose.model('user', UserSchema);
