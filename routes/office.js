const officeRouter = require('express').Router();
const { db } = require('../conf');

officeRouter.get('/:id/myReservation', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT beginning FROM OfficeReservation WHERE userId = ?';
    const reservation = await db.query(sql, [id]);
    res.status(200).json(reservation);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = officeRouter;
