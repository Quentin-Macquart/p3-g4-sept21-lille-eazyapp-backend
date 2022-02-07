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
      'SELECT status, User.picture,User.firstname, User.lastname, User.id as UserId FROM Participant JOIN User ON userId = User.id WHERE reservationId = ?';
    const [meeting] = await db.query(sql, [id]);
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).send(err);
  }
});

meetingRouter.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql =
      'SELECT  Meeting.beginning, Meeting.id, MeetingRoom.number, MeetingRoom.location, meetingRoomId, User.picture,User.firstname, User.lastname FROM Meeting  JOIN User ON Meeting.userId = User.id JOIN MeetingRoom ON Meeting.meetingRoomId = MeetingRoom.id  WHERE Meeting.userId= ?';
    const [meetings] = await db.query(sql, [id]);
    res.status(200).json(meetings);
  } catch (err) {
    res.status(400).send(err);
  }
});
meetingRouter.get('/participants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sql =
      'SELECT  Meeting.beginning, Meeting.id, MeetingRoom.number, MeetingRoom.location,status, meetingRoomId, Meeting.userId ,User.picture,User.firstname, User.lastname FROM Participant JOIN Meeting ON Meeting.id = Participant.reservationId JOIN User ON Meeting.userId = User.Id   JOIN MeetingRoom ON Meeting.meetingRoomId = MeetingRoom.id WHERE Participant.userId= ?';
    const [meetings] = await db.query(sql, [id]);
    res.status(200).json(meetings);
  } catch (err) {
    res.status(400).send(err);
  }
});

meetingRouter.post('/participants', async (req, res) => {
  try {
    const newParticipants = req.body;
    const [resSql] = await db.query(
      `
    INSERT INTO Participant (userId, reservationId, status)
    VALUES ?
  `,
      [newParticipants[0]]
    );
    const newData = { ...req.body, id: resSql.insertId };
    res.status(201).send(newData);
  } catch (err) {
    res.status(400).send(err);
  }
});

meetingRouter.post('/', async (req, res) => {
  const { beginning, userId, meetingRoomId } = req.body;
  const [resSql] = await db.query(
    `
    INSERT INTO Meeting (beginning, userId, meetingRoomId)
    VALUES (?,?,?)
  `,
    [beginning, userId, meetingRoomId]
  );
  const newData = { ...req.body, id: resSql.insertId };

  res.status(201).send(newData);
});

module.exports = meetingRouter;
