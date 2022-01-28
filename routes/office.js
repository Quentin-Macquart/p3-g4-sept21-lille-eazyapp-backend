const officeRouter = require('express').Router();
const { db } = require('../conf');

officeRouter.get('/:id/myReservation', async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT beginning FROM OfficeReservation WHERE userId = ?';
    const reservation = await db.query(sql, [id]);
  } catch (err) {
    res.status(400).send(err);
  }
});

officeRouter.get('/', async (req, res) => {
  try {
    const { slot } = req.query;
    const sql =
      'SELECT number,User.picture, OfficeReservation.officeId, OfficeReservation.userId, OfficeReservation.beginning FROM Office JOIN OfficeReservation ON OfficeReservation.officeId = Office.id JOIN User ON OfficeReservation.userId = User.id WHERE OfficeReservation.beginning = ?';
    const [office] = await db.query(sql, [slot]);
  } catch (err) {
    res.status(400).send(err);
  }
});

officeRouter.post('/officeReservation', async (req, res) => {
  try {
    const { userId, beginning, officeId } = req.body;
    const [resSql] = await db.query(
      `
    INSERT INTO OfficeReservation (userId, beginning, officeId)
    VALUES (?,?,?)
  `,
      [userId, beginning, officeId]
    );
    const newData = { ...req.body, id: resSql.insertId };
    res.status(201).send(newData);
  } catch (err) {
    res.status(400).send(err);
  }
});

officeRouter.delete('/officeReservation', async (req, res) => {
  try {
    const { userId, beginning } = req.body;
    const [resSql] = await db.query(
      `
    DELETE FROM OfficeReservation WHERE userId = ? AND beginning = ?; 
  `,
      [userId, beginning]
    );
    const newData = { ...req.body, id: resSql.insertId };
    res.status(201).send(newData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = officeRouter;
