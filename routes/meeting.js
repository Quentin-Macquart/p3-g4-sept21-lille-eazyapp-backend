const meetingRouter = require('express').Router();
const { db } = require('../conf');

meetingRouter.get('/', async (req, res) => {
  try {
    const { id, slot } = req.query;
    const sql =
      'SELECT Meeting.id, Meeting.meetingRoomId as roomId, Meeting.beginning as slot, User.firstname as userFirstname, User.lastname as userLastname, User.picture as userPicture, MeetingRoom.picture as roomPicture FROM Meeting JOIN User ON Meeting.userId = User.id JOIN MeetingRoom ON Meeting.meetingRoomId = MeetingRoom.id WHERE meetingRoomId = ? AND beginning = ?';
    const [meeting] = await db.query(sql, [id, slot]);
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).send(err);
  }
});

meetingRouter.get('/:id/participants', async (req, res) => {
  try {
    const { id } = req.params;
    const sql =
      'SELECT status, User.picture FROM Participant JOIN User ON userId = User.id WHERE reservationId = ?';
    const [meeting] = await db.query(sql, [id]);
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).send(err);
  }
});

meetingRouter.get('/', async (req, res) => {
  try {
    const { id, slot } = req.query;
    const sql =
      'SELECT Meeting.id, Meeting.meetingRoomId as roomId, Meeting.beginning as slot, User.firstname as userFirstname, User.lastname as userLastname, User.picture as userPicture, MeetingRoom.picture as roomPicture FROM Meeting JOIN User ON Meeting.userId = User.id JOIN MeetingRoom ON Meeting.meetingRoomId = MeetingRoom.id WHERE meetingRoomId = ? AND beginning = ?';
    const [meeting] = await db.query(sql, [id, slot]);
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).send(err);
  }
});

meetingRouter.post('/', async (req, res) => {
  const { beginning, userId, meetingRoom } = req.body;
  const [resSql] = await db.query(
    `
    INSERT INTO Meeting (beginning, userId, meetingRoom)
    VALUES (?,?,?)
  `,
    [beginning, userId, meetingRoom]
  );
  const newData = { ...req.body, id: resSql.insertId };

  res.status(201).send(newData);
});

module.exports = meetingRouter;
