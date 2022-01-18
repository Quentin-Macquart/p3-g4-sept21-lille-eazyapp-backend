const foodRouter = require('express').Router();
const passport = require('passport');
const { db } = require('../conf');

foodRouter.get('/lunch', passport.authenticate('jwt'), async (req, res) => {
  try {
    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.type="food"';
    const [menuItem] = await db.query(sql);
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
    } = req.user;

    const menuItemFiltered = menuItem.filter(
      (typeOfFood) =>
        (!eggFree || (eggFree && typeOfFood.eggFree)) &&
        (!glutenFree || (glutenFree && typeOfFood.glutenFree)) &&
        (!gmoFree || (gmoFree && typeOfFood.gmoFree)) &&
        (!nutFree || (nutFree && typeOfFood.nutFree)) &&
        (!cornFree || (cornFree && typeOfFood.cornFree)) &&
        (!dairyFree || (dairyFree && typeOfFood.dairyFree)) &&
        (!soyFree || (soyFree && typeOfFood.soyFree)) &&
        (!transFatsFree || (transFatsFree && typeOfFood.transFatsFree)) &&
        (!vegan || (vegan && typeOfFood.vegan)) &&
        (!shellfishFree || (shellfishFree && typeOfFood.shellfishFree)) &&
        (!porkFree || (porkFree && typeOfFood.porkFree)) &&
        (!vegetarian || (vegetarian && typeOfFood.vegetarian)) &&
        (!fridayFish || (fridayFish && typeOfFood.fridayFish)) &&
        (!onDiet || (onDiet && typeOfFood.onDiet)) &&
        (!sugarFree || (sugarFree && typeOfFood.sugarFree))
    );

    res.status(200).json(menuItemFiltered);
  } catch (err) {
    res.status(400).send(err);
  }
});

foodRouter.get('/desserts', passport.authenticate('jwt'), async (req, res) => {
  try {
    const {
      eggFree,
      glutenFree,
      gmoFree,
      nutFree,
      sugarFree,
      cornFree,
      dairyFree,
      vegan,
      onDiet,
    } = req.user;
    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.type="dessert"';
    const [menuItem] = await db.query(sql);

    const menuItemFiltered = menuItem.filter(
      (typeOfFood) =>
        (!eggFree || (eggFree && typeOfFood.eggFree)) &&
        (!glutenFree || (glutenFree && typeOfFood.glutenFree)) &&
        (!gmoFree || (gmoFree && typeOfFood.gmoFree)) &&
        (!nutFree || (nutFree && typeOfFood.nutFree)) &&
        (!cornFree || (cornFree && typeOfFood.cornFree)) &&
        (!dairyFree || (dairyFree && typeOfFood.dairyFree)) &&
        (!vegan || (vegan && typeOfFood.vegan)) &&
        (!onDiet || (onDiet && typeOfFood.onDiet)) &&
        (!sugarFree || (sugarFree && typeOfFood.sugarFree))
    );
    res.status(200).json(menuItemFiltered);
  } catch (err) {
    res.status(400).send(err);
  }
});

foodRouter.get('/drinks', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { sugarFree, dairyFree, transFatsFree, vegan, onDiet } = req.user;

    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.type="drink"';
    const [menuItem] = await db.query(sql);
    const menuItemFiltered = menuItem.filter(
      (typeOfFood) =>
        (!dairyFree || (dairyFree && typeOfFood.dairyFree)) &&
        (!vegan || (vegan && typeOfFood.vegan)) &&
        (!onDiet || (onDiet && typeOfFood.onDiet)) &&
        (!transFatsFree || (transFatsFree && typeOfFood.transFatsFree)) &&
        (!sugarFree || (sugarFree && typeOfFood.sugarFree))
    );
    res.status(200).json(menuItemFiltered);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = foodRouter;
