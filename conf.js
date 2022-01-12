const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const {
  DB_HOST,
  DB_PASSWORD,
  DB_SCHEMA,
  DB_USER,
  BACK_PORT,
  JWT_SALTROUNDS,
  JWT_SECRET,
} = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
});

const backPort = parseInt(BACK_PORT, 10);

module.exports = {
  backPort,
  db,
  jwtRounds: parseInt(JWT_SALTROUNDS, 10),
  jwtSecret: JWT_SECRET,
};
