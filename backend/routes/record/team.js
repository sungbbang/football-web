const express = require('express');
const Team = require('../../models/Team');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const league = req.query.league;
    const season = parseInt(req.query.season);

    const teamRecord = await Team.find(
      {
        leagueName: league,
        leagueSeason: season,
      },
      {
        _id: 0,
        __v: 0,
        leagueName: 0,
      }
    ).sort({ rank: 1 });

    res.json({ status: 'success', result: teamRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
