const bcrypt = require('bcrypt');
const { db, jwtRounds } = require('./conf');

const pswds = [
  'password01',
  'password02',
  'password03',
  'password04',
  'password05',
  'password06',
];
for (let i = 0; i < pswds.length; i += 1) {
  const pswd = bcrypt.hashSync(pswds[i], jwtRounds);
  const id = i + 1;
  db.query(`UPDATE User SET password = ? WHERE id =?`, [pswd, id]);
}
