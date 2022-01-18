const moment = require('moment');

const dayDate = new Date();
const beginnings = [];
// Meeting for Room 1 and 2
// d+1

dayDate.setDate(dayDate.getDate() + 1);
beginnings.push(
  moment(dayDate.setHours(8, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(9, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(10, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(14, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(15, 0, 0)).format('YYYY-MM-DD HH:mm:ss')
);

// d+2

dayDate.setDate(dayDate.getDate() + 1);
beginnings.push(
  moment(dayDate.setHours(9, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(11, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(15, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(16, 0, 0)).format('YYYY-MM-DD HH:mm:ss')
);
// d+3

dayDate.setDate(dayDate.getDate() + 1);
beginnings.push(
  moment(dayDate.setHours(10, 0, 0)).format('YYYY-MM-DD HH:mm:ss'),
  moment(dayDate.setHours(14, 0, 0)).format('YYYY-MM-DD HH:mm:ss')
);

// beginnings --> beginning,userId,meetingRoom

const meetings = [
  [beginnings[0], 2, 1],
  [beginnings[1], 3, 1],
  [beginnings[2], 6, 1],
  [beginnings[4], 5, 1],
  [beginnings[6], 4, 1],
  [beginnings[8], 1, 1],
  [beginnings[9], 2, 1],
  [beginnings[0], 4, 2],
  [beginnings[3], 4, 2],
  [beginnings[4], 5, 2],
  [beginnings[5], 6, 2],
  [beginnings[7], 5, 2],
  [beginnings[10], 2, 2],
];

const participants = [
  [1, 1, 'présentiel'],
  [3, 1, 'distenciel'],
  [4, 1, 'distanciel'],
  [5, 1, 'présentiel'],
  [6, 1, 'présentiel'],
  [1, 2, 'distanciel'],
  [2, 2, 'présentiel'],
  [1, 3, 'présentiel'],
  [3, 3, 'distenciel'],
  [4, 3, 'distanciel'],
  [5, 3, 'présentiel'],
  [6, 3, 'présentiel'],
  [1, 4, 'distanciel'],
  [2, 4, 'présentiel'],
  [6, 4, 'distanciel'],
  [3, 4, 'présentiel'],
  [3, 5, 'distenciel'],
  [1, 5, 'distanciel'],
  [6, 5, 'présentiel'],
  [6, 6, 'présentiel'],
  [5, 6, 'distanciel'],
  [4, 6, 'présentiel'],
  [3, 6, 'distanciel'],
  [2, 6, 'présentiel'],
  [6, 7, 'présentiel'],
  [4, 7, 'présentiel'],
  [5, 7, 'distanciel'],
  [1, 8, 'présentiel'],
  [3, 8, 'distanciel'],
  [2, 8, 'présentiel'],
  [6, 9, 'présentiel'],
  [5, 9, 'distanciel'],
  [1, 10, 'présentiel'],
  [3, 10, 'distanciel'],
  [2, 10, 'présentiel'],
  [2, 11, 'présentiel'],
  [5, 11, 'distanciel'],
  [1, 11, 'présentiel'],
  [3, 12, 'distanciel'],
  [2, 12, 'présentiel'],
  [5, 13, 'distanciel'],
  [1, 13, 'présentiel'],
  [3, 13, 'distanciel'],
  [4, 13, 'présentiel'],
];

module.exports = { meetings, participants };
