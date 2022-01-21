const userRouter = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../conf');
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
userRouter.get('/:id', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM User where id=?';
    await db.query(sql, [id]);
    const user = { ...req.user };
    const token = jwt.sign(user, jwtSecret);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});
userRouter.put('/:id', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const sql = 'UPDATE User SET amount=? WHERE id=?';
    await db.query(sql, [amount, id]);
    const user = { ...req.user, amount };
    const token = jwt.sign(user, jwtSecret);
    res.status(200).json({ user, token });
    } catch (err) {
    res.status(400).send(err);
  }
});
userRouter.get('/:id/foodProfile', async (req, res) => {
  try {
    const { id } = req.params;
    const sql =
      'SELECT eggFree, glutenFree, gmoFree, nutFree, sugarFree, cornFree, dairyFree, soyFree, transFatsFree, vegan, shellfishFree, porkFree, vegetarian, fridayFish, onDiet FROM User WHERE id=?';
    const userFoodProfile = await db.query(sql, [id]);
    res.status(200).json(userFoodProfile[0]);
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post('/:id/foodProfile', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      eggFree,
      glutenFree,
      gmoFree,
      nutFree,
      sugarFree,
      cornFree,
      dairyFree,
      soyFree,
      transFatsFree,
      vegan,
      shellfishFree,
      porkFree,
      vegetarian,
      fridayFish,
      onDiet,
    } = req.body;
    const sql =
      'UPDATE User SET eggFree=?, glutenFree=?, gmoFree=?, nutFree=?, sugarFree=?, cornFree=?, dairyFree=?, soyFree=?, transFatsFree=?, vegan=?, shellfishFree=?, porkFree=?, vegetarian=?, fridayFish=?, onDiet=? WHERE id=?';
    const userFoodProfile = await db.query(sql, [
      eggFree,
      glutenFree,
      gmoFree,
      nutFree,
      sugarFree,
      cornFree,
      dairyFree,
      soyFree,
      transFatsFree,
      vegan,
      shellfishFree,
      porkFree,
      vegetarian,
      fridayFish,
      onDiet,
      id,
    ]);
    res.status(200).json(userFoodProfile);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = userRouter;