const officeReservationRouter = require('express').Router();
const { db } = require('../conf');

officeReservationRouter.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM Office';
    const [office] = await db.query(sql);
    res.status(200).json(office);
  } catch (err) {
    res.status(400).send(err);
  }
});

officeReservationRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM Office where id= ?';
    const [officeReservation] = await db.query(sql, [id]);
    res.status(200).json(officeReservation);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = officeReservationRouter;
