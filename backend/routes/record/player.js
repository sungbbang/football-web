const express = require('express');
const TopScorer = require('../../models/TopScorer');
const TopAssistor = require('../../models/TopAssistor');
const router = express.Router();

router.get('/topScorer', async (req, res) => {
  try {
    const league = req.query.league;
    const season = parseInt(req.query.season);

    const topScorers = await TopScorer.find(
      {
        leagueName: league,
        leagueSeason: season,
      },
      {
        _id: 0,
        __v: 0,
        leagueName: 0,
      }
    );

    res.json({ status: 'success', result: topScorers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.get('/topAssistor', async (req, res) => {
  try {
    const league = req.query.league;
    const season = parseInt(req.query.season);

    const topAsisstors = await TopAssistor.find(
      {
        leagueName: league,
        leagueSeason: season,
      },
      {
        _id: 0,
        __v: 0,
        leagueName: 0,
      }
    );

    res.json({ status: 'success', result: topAsisstors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
