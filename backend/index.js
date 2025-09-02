require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
const port = 3000;

const scheduleRoute = require('./routes/schedule');
const leagueRoute = require('./routes/league');
const recordRoute = require('./routes/record');
const userRoute = require('./routes/user');

connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use(express.json());
    app.use(
      cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
      })
    );

    app.use('/api/schedule', scheduleRoute);
    app.use('/api/league', leagueRoute);
    app.use('/api/record', recordRoute);
    app.use('/api/user', userRoute);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('서버 시작 중 MongoDB 연결에 실패했습니다: ', error);
    process.exit(1);
  });
