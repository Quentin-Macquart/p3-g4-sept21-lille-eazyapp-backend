const meetingRoomRouter = require('./meetingRoom');
const foodRouter = require('./food');

const setupRoutes = (app) => {
  app.use('/meetingRoom', meetingRoomRouter);
  app.use('/food', foodRouter);
};

module.exports = {
  setupRoutes,
};
