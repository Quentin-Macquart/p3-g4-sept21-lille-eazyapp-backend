const resetRouter = require('express').Router();
const { db } = require('../conf');
const { meetings, participants, resOffice } = require('../newdata');

resetRouter.post('/', async (req, res) => {
  try {
    await db.query(`TRUNCATE Participant;`);
    await db.query(`DELETE FROM Meeting WHERE Meeting.id > 0;`);
    await db.query(`ALTER TABLE Meeting AUTO_INCREMENT = 1;`);
    await db.query(
      `INSERT INTO Meeting (beginning, userId, meetingRoomId) VALUES ? `,
      [meetings]
    );
    await db.query(
      `INSERT INTO Participant (userId, reservationId, status) VALUES ? `,
      [participants]
    );
    await db.query(
      `DELETE FROM OfficeReservation WHERE OfficeReservation.id > 0;`
    );
    await db.query(`ALTER TABLE OfficeReservation AUTO_INCREMENT = 1;`);
    await db.query(
      `INSERT INTO OfficeReservation (beginning, userId, officeId) VALUES ? `,
      [resOffice]
    );
    await db.query(`DELETE FROM MenuItems WHERE MenuItems.cartId > 0;`);
    await db.query(`ALTER TABLE MenuItems AUTO_INCREMENT = 1;`);
    await db.query(`DELETE FROM CartMenu WHERE CartMenu.id > 0;`);
    await db.query(`ALTER TABLE CartMenu AUTO_INCREMENT = 1;`);
    await db.query(`DELETE FROM Supplies WHERE Supplies.cartSuppliesId > 0;`);
    await db.query(`ALTER TABLE Supplies AUTO_INCREMENT = 1;`);
    await db.query(`DELETE FROM CartSupplies WHERE CartSupplies.id > 0;`);
    await db.query(`ALTER TABLE CartSupplies AUTO_INCREMENT = 1;`);
    await db.query(`DELETE FROM Messages WHERE Messages.id > 0;`);
    await db.query(`ALTER TABLE Messages AUTO_INCREMENT = 1;`);
    const newData = { ...meetings, ...participants };
    res.status(201).send(newData);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = resetRouter;
