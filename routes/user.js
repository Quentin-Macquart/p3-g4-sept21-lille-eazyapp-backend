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

userRouter.post('/:id/menuItems', async (req, res) => {
  try {
    const { id: menuItemId } = req.body;
    const { id } = req.params;
    const sqlCart = 'INSERT INTO CartMenu (userId) VALUES (?)';
    const [cartMenu] = await db.query(sqlCart, [id]);

    const idOrder = cartMenu.insertId;
    const sqlMenu =
      'INSERT INTO MenuItems (cartId, menuItemId, quantity) VALUES (?,?,1)';
    const menuItems = await db.query(sqlMenu, [idOrder, menuItemId]);
    res.status(200).json({ cartMenu, menuItems });
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.get('/:id/myMeal', async (req, res) => {
  try {
    const { id } = req.params;
    const sql =
      'SELECT MenuItem.name, MenuItem.picture FROM MenuItem INNER JOIN MenuItems ON menuItemId = MenuItem.id INNER JOIN CartMenu ON CartMenu.id = MenuItems.cartId INNER JOIN User ON User.id = CartMenu.userId WHERE User.id= ?';
    const [myMeal] = await db.query(sql, [id]);
    res.status(200).json(myMeal);
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.put(
  '/:id/foodProfile',
  passport.authenticate('jwt'),
  async (req, res) => {
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
      await db.query(sql, [
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
      const user = {
        ...req.user,
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
      };
      const token = jwt.sign(user, jwtSecret);
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

module.exports = userRouter;
