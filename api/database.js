import Mongoose from 'mongoose';

const url = process.env.DATABASE_URL;
console.log(url)
if (!url) {
  throw new Error('DATABASE_URL is not set');
}

export const connect = async () => {
  await Mongoose.set('strictQuery', true);

  await Mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('[db] Connected');
};
