const meetingRoomRouter = require('./meetingRoom');
const foodRouter = require('./food');
const userRouter = require('./user');

const setupRoutes = (app) => {
  app.use('/meetingRoom', meetingRoomRouter);
  app.use('/food', foodRouter);
  app.use('/user', userRouter);
};

module.exports = {
  setupRoutes,
};
