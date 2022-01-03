const meetingRoomRouter = require('./meetingRoom');

const setupRoutes = (app) => {
  app.use('/meetingRoom', meetingRoomRouter);
};

module.exports = {
  setupRoutes,
};
