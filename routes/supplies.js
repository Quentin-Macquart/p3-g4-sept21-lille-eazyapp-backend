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
    const idOrder = cartSupplies.insertId;
    const orderLines = items
      .filter((item) => {
        return item.qtty > 0;
      })
      .map((item) => {
        return [item.qtty, item.itemId, idOrder];
      });
    await db.query(
      'INSERT INTO Supplies (quantity, supplyItemId, cartSuppliesId ) VALUES  ?',
      [orderLines]
    );
    res.status(201).json('Done with success!');
  } catch (err) {
    res.status(400).send(err);
  }
});

suppliesRouter.get('/:id/myOrder', async (req, res) => {
  try {
    const { id } = req.params;
    const sqlOrder =
      'SELECT SupplyItem.name, SupplyItem.picture FROM SupplyItem INNER JOIN Supplies ON SupplyItemId = SupplyItem.id INNER JOIN CartSupplies ON CartSupplies.id = Supplies.cartSuppliesId INNER JOIN User ON User.id = CartSupplies.userId WHERE User.id= ?';
    const [orderRecap] = await db.query(sqlOrder, [id]);
    const sqlQuantity =
      'SELECT Supplies.quantity FROM Supplies INNER JOIN CartSupplies ON CartSupplies.id = Supplies.CartSuppliesId INNER JOIN User ON User.id = CartSupplies.userId WHERE User.id = ? ';
    const [quantityRecap] = await db.query(sqlQuantity, [id]);
    res.status(200).json({ orderRecap, quantityRecap });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = suppliesRouter;
