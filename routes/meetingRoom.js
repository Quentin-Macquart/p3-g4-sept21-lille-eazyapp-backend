const meetingRoomRouter = require('express').Router();
const { db } = require('../conf');

meetingRoomRouter.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM MeetingRoom ';
    const [meetingRoom] = await db.query(sql);
    res.status(200).json(meetingRoom);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = meetingRoomRouter;
