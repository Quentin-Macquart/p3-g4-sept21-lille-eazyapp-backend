const foodRouter = require('express').Router();
const { db } = require('../conf');

foodRouter.get('/lunch', async (req, res) => {
  try {
    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.type="food"';
    const [menuItem] = await db.query(sql);
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

foodRouter.get('/desserts', async (req, res) => {
  try {
    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.type="dessert"';
    const [menuItem] = await db.query(sql);
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

foodRouter.get('/drinks', async (req, res) => {
  try {
    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.type="drink"';
    const [menuItem] = await db.query(sql);
    res.status(200).json(menuItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = foodRouter;
