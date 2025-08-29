const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const League = require('../models/League');

router.get('/dateRange', async (req, res) => {
  try {
    const leagueList = await League.find();
    const dateList = [];
    leagueList.forEach(league => {
      league.seasons.forEach(season => {
        dateList.push(season.start);
        dateList.push(season.end);
      });
    });

    dateList.sort((a, b) => a.getTime() - b.getTime());

    res.json({
      status: 'success',
      result: { minDate: dateList[0], maxDate: dateList[dateList.length - 1] },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.get('/all/nearest-date', async (req, res) => {
  try {
    // 기준일 설정: 쿼리스트링이 있으면 해당 날짜, 없으면 오늘
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const queryDate = req.query.date ? new Date(req.query.date) : today;

    // 유효하지 않은 날짜 포맷이면 400 반환
    if (isNaN(queryDate.getTime())) {
      return res.status(400).json({ status: 'error', message: 'Invalid date' });
    }

    // searchDate: DB 조회용, queryDate의 연/월/일을 기준으로 00:00 설정
    const searchDate = new Date(
      queryDate.getFullYear(),
      queryDate.getMonth(),
      queryDate.getDate()
    );

    // 1) 기준일 이후(>=) 중 가장 가까운 미래 경기 조회
    let nearestMatch = await Schedule.findOne({
      date: { $gte: searchDate },
    }).sort({ date: 1 });

    // 미래 경기 있으면 바로 반환
    if (nearestMatch) {
      return res.json({
        status: 'success',
        result: { date: new Date(nearestMatch.date) },
      });
    }

    // 2) 미래 경기가 없다면, 가장 최근 과거 경기(<=) 조회
    nearestMatch = await Schedule.findOne().sort({ date: -1 });
    if (nearestMatch) {
      return res.json({
        status: 'success',
        result: { date: new Date(nearestMatch.date) },
      });
    }

    // 3) 경기 일정이 아예 없는 경우
    return res.json({ status: 'success', result: { date: null } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
