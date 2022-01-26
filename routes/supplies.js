const suppliesRouter = require('express').Router();
const { db } = require('../conf');

suppliesRouter.get('/', async (req, res) => {
  try {
    const sql = 'SELECT id, name, description, picture FROM SupplyItem ';
    const [supplyItem] = await db.query(sql);
    res.status(200).json(supplyItem);
  } catch (err) {
    res.status(400).send(err);
  }
});

suppliesRouter.post('/:id/cartSupplies', async (req, res) => {
  try {
    const items = req.body;

    const { id } = req.params;
    const sql = 'INSERT INTO cartSupplies (userId) VALUES (?)';
    const [cartSupplies] = await db.query(sql, [id]);

    items.forEach((item) => {
      item.push(cartSupplies.insertId);
    });
    console.log(items);
    const sql2 =
      'INSERT INTO Supplies ( quantity, SupplyItem_id, cartSupplies_id) VALUES ?';
    const supplies = await db.query(sql2, [items[0]]);
    res.status(200).json(cartSupplies, supplies);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = suppliesRouter;
