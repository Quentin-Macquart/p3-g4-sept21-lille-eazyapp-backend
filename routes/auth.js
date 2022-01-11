const express = require('express');
const passport = require('passport');

const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../conf');
require('../passport-strategies');

// router.post('/signup', async (req, res) => {
//   try {
//     const formData = req.body;
//     formData.password = bcrypt.hashSync(formData.password, jwt_rounds);
//     const [sqlRes] = await db.query(`INSERT INTO user SET ?`, formData);
//     delete formData.password;
//     formData.id = sqlRes.insertId;
//     const token = jwt.sign(formData, jwt_secret);
//     res.status(201).json({ user: formData, token });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json(e);
//   }
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = jwt.sign(req.user, jwtSecret);
  res.status(200).json({ user: req.user, token });
});

module.exports = router;
