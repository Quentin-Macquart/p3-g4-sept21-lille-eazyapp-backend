const meetingRoomRouter = require('./meetingRoom');
const foodRouter = require('./food');
const suppliesRouter = require('./supplies');

const setupRoutes = (app) => {
  app.use('/meetingRoom', meetingRoomRouter);
  app.use('/food', foodRouter);
  app.use('/supplies', suppliesRouter);
};

module.exports = {
  setupRoutes,
};
