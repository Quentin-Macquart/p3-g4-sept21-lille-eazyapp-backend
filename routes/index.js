const meetingRoomRouter = require('./meetingRoom');
const foodRouter = require('./food');
const meetingRouter = require('./meeting');

const setupRoutes = (app) => {
  app.use('/meetingRoom', meetingRoomRouter);
  app.use('/food', foodRouter);
  app.use('/meeting', meetingRouter);
};

module.exports = {
  setupRoutes,
};
