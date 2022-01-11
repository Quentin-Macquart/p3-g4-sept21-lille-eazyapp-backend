const meetingRoomRouter = require('./meetingRoom');
const foodRouter = require('./food');
const authRouter = require('./auth');

const setupRoutes = (app) => {
  app.use('/meetingRoom', meetingRoomRouter);
  app.use('/food', foodRouter);
  app.use('/auth', authRouter);
};

module.exports = {
  setupRoutes,
};
