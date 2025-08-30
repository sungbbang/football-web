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

router.get('/nearest-date', async (req, res) => {
  try {
    // 기준일 설정: 쿼리스트링이 있으면 해당 날짜, 없으면 오늘
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const queryCategory = req.query.category;

    if (
      queryCategory &&
      !['epl', 'laliga', 'bundesliga', 'ligue1', 'serieA'].includes(
        queryCategory
      )
    ) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid category' });
    }

    const baseQuery = {};
    if (queryCategory) {
      baseQuery.leagueName = queryCategory;
    }

    // 1) 기준일 이후(>=) 중 가장 가까운 미래 경기 조회
    let nearestMatch = await Schedule.findOne({
      ...baseQuery,
      date: { $gte: today },
    }).sort({ date: 1 });

    // 미래 경기 있으면 바로 반환
    if (nearestMatch) {
      return res.json({
        status: 'success',
        result: { date: new Date(nearestMatch.date) },
      });
    }

    // 2) 미래 경기가 없다면, 가장 최근 과거 경기(<=) 조회
    nearestMatch = await Schedule.findOne({ ...baseQuery }).sort({ date: -1 });

    // 3) 결과 반환 (없으면 null)
    return res.json({
      status: 'success',
      result: { date: nearestMatch ? new Date(nearestMatch.date) : null },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.get('/all/monthly', async (req, res) => {
  try {
    const queryDate = new Date(req.query.date);

    // 유효하지 않은 날짜 포맷이면 400 반환
    if (isNaN(queryDate.getTime())) {
      return res.status(400).json({ status: 'error', message: 'Invalid date' });
    }

    const [y, m] = req.query.date.split('-').map(Number);

    const start = new Date(y, m - 1);
    const end = new Date(y, m, 1);

    const monthlySchedule = await Schedule.find(
      {
        date: { $gte: start, $lt: end },
      },
      // 필요없는 필드는 제외
      {
        __v: 0,
        _id: 0,
        leagueSeason: 0,
        awayTeamId: 0,
        homeTeamId: 0,
        leagueId: 0,
      }
    )
      .sort({ date: 1 })
      .lean();

    res.json({ status: 'success', result: { schedule: monthlySchedule } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.get('/seasonSchedule', async (req, res) => {
  try {
    const queryCategory = req.query.category;
    const querySeason = parseInt(req.query.season);

    const seasonSchedule = await Schedule.find(
      {
        leagueName: queryCategory,
        leagueSeason: querySeason,
      }, // 필요없는 필드는 제외
      {
        __v: 0,
        _id: 0,
        leagueSeason: 0,
        awayTeamId: 0,
        homeTeamId: 0,
        leagueId: 0,
      }
    ).sort({ date: 1 });

    res.json({ status: 'success', result: seasonSchedule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
