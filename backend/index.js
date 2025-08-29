require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const app = express();
const port = 3000;

const scheduleRoute = require('./routes/schedule');

connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.use('/api/schedule', scheduleRoute);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('서버 시작 중 MongoDB 연결에 실패했습니다: ', error);
    process.exit(1);
  });
