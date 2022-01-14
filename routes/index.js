const meetingRoomRouter = require('./meetingRoom');
const foodRouter = require('./food');
const suppliesRouter = require('./supplies');
const meetingRouter = require('./meeting');
const authRouter = require('./auth');
const userRouter = require('./user');

const setupRoutes = (app) => {
  app.use('/meetingRoom', meetingRoomRouter);
  app.use('/food', foodRouter);
  app.use('/supplies', suppliesRouter);
  app.use('/meeting', meetingRouter);
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
};

module.exports = {
  setupRoutes,
};
