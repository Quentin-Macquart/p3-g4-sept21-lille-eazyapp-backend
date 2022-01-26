const officeRouter = require('express').Router();
const { db } = require('../conf');

officeRouter.get('/', async (req, res) => {
  try {
    const { slot } = req.query;
    const sql =
      'SELECT number,User.picture, OfficeReservation.officeId, OfficeReservation.userId, OfficeReservation.beginning FROM Office JOIN OfficeReservation ON OfficeReservation.officeId = Office.id JOIN User ON OfficeReservation.userId = User.id WHERE OfficeReservation.beginning = ?';
    const [office] = await db.query(sql, [slot]);
    res.status(200).json(office);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = officeRouter;
