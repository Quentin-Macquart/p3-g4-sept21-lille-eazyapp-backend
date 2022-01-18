const suppliesRouter = require('express').Router();
const { db } = require('../conf');

suppliesRouter.get('/', async (req, res) => {
  try {
    const sql = 'SELECT name, description, picture FROM SupplyItem ';
    const [supplyItem] = await db.query(sql);
    res.status(200).json(supplyItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = suppliesRouter;
