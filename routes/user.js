const userRouter = require('express').Router();
const { db } = require('../conf');

userRouter.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM User ';
    const [user] = await db.query(sql);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
userRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM User where id=?';
    const [user] = await db.query(sql, [id]);
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = userRouter;
