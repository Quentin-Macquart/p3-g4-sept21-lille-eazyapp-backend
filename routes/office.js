const officeRouter = require('express').Router();
const { db } = require('../conf');

officeRouter.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM Office';
    const [office] = await db.query(sql);
    res.status(200).json(office);
  } catch (err) {
    res.status(400).send(err);
  }
});

officeRouter.get('/:id', async (req, res) => {
  try {
    const { id, slot } = req.query;
    const sql =
      'SELECT office.id, Meeting.meetingRoomId as roomId, Meeting.beginning as slot, User.firstname as userFirstname, User.lastname as userLastname, User.picture as userPicture, MeetingRoom.picture as roomPicture FROM Meeting JOIN User ON Meeting.userId = User.id JOIN MeetingRoom ON Meeting.meetingRoomId = MeetingRoom.id WHERE meetingRoomId = ? AND beginning = ?';
    const [office] = await db.query(sql, [id, slot]);
    res.status(200).json(office);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = officeRouter;
