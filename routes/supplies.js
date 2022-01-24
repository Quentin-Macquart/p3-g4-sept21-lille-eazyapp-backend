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

suppliesRouter.post('/', async (req, res) => {
  const { name, price, picture, quantity, orderTime, statut } = req.body;
  const [resSql] = await db.query(
    `INSERT INTO SupplyItem (name, price, picture) VALUES (?,?,?)`,
    [name, price, picture],

    `INSERT INTO Supplies (quantity) VALUES (?)`,
    [quantity],

    `INSERT INTO cartSupplies (orderTime, statut) VALUES (?, ?)`,
    [orderTime, statut]
  );
  const newData = { ...req.body, id: resSql.insertId };

  res.status(201).send(newData);
});

module.exports = suppliesRouter;
