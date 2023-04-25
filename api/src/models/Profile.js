import Mongoose from 'mongoose';

export const ProfileSchema = new Mongoose.Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    name: {
      type: String,
      lowercase: true,
      required: true,
    },
    lastname: {
      type: String,
      lowercase: true,
    },
    age: {
      type: Number,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true
    },
  },
  { timestamps: true }
);

export const ProfileModel = Mongoose.model('profile', ProfileSchema);
