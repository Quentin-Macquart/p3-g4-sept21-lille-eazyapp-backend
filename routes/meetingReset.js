const meetingResetRouter = require('express').Router();
const { db } = require('../conf');
const { meetings, participants } = require('../newMeeting');

meetingResetRouter.post('/', async (req, res) => {
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
    const newData = { ...meetings, ...participants };
    res.status(201).send(newData);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = meetingResetRouter;
