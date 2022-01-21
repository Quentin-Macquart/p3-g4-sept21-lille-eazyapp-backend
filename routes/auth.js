const express = require('express');
const passport = require('passport');

const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../conf');
require('../passport-strategies');

router.post('/login/token', passport.authenticate('jwt'), (req, res) => {
  const token = jwt.sign(req.user, jwtSecret);
  res.status(200).json({ user: req.user, token });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = jwt.sign(req.user, jwtSecret);
  res.status(200).json({ user: req.user, token });
});

module.exports = router;
