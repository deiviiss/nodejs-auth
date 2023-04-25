import dotenv from 'dotenv';
dotenv.config();

const config = {
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
}

export { config }