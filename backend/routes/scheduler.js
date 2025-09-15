const express = require('express');
const { dailyUpdateData } = require('../scripts/startDailyScheduler');
const router = express.Router();

const SECRET = process.env.SCHEDULER_SECRET;

router.get('/run', async (req, res) => {
  if (req.query.secret !== SECRET) {
    return res.status(401).json({ status: 'error', message: 'Unauthorized' });
  }
  try {
    await dailyUpdateData();
    res.json({ status: 'success', message: 'Scheduler executed successfully' });
  } catch (err) {
    console.error('Scheduler 실행 중 오류:', err);
    res
      .status(500)
      .json({ status: 'error', message: 'Scheduler execution failed' });
  }
});

module.exports = router;
