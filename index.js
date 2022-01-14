const express = require('express');
const cors = require('cors');
const passport = require('passport');
const { backPort } = require('./conf');
const { setupRoutes } = require('./routes');

const app = express();
app.use(passport.initialize());

app.use(cors());

app.use(express.json());

setupRoutes(app);

app.use('/', (req, res) => {
  res.status(404).send('Route not found! ');
});

app.listen(backPort, () => {
  console.log(`Eazyapp API now available on http://localhost:${backPort} !`);
});
