require('dotenv').config();

const {
  NODE_ENV,
  DB_NAME,
  PORT = 3000,
  JWT_SECRET,
} = process.env;

const db = NODE_ENV === 'production' ? DB_NAME : 'mongodb://localhost:27017/explorernews';
const secret = NODE_ENV === 'production' ? JWT_SECRET : 'devsecret';

module.exports = {
  db,
  PORT,
  secret,
};
