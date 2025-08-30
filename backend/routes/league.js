const express = require('express');
const League = require('../models/League');
const router = express.Router();

router.get('/info', async (req, res) => {
  try {
    const queryCategory = req.query.category;

    if (
      !queryCategory ||
      !['epl', 'laliga', 'bundesliga', 'ligue1', 'serieA'].includes(
        queryCategory
      )
    ) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid category' });
    }

    const league = await League.findOne(
      { leagueName: queryCategory },
      { _id: 0, __v: 0 }
    ).lean();

    if (league?.seasons) {
      league.seasons = league.seasons.map(season => {
        const { _id, ...rest } = season;
        return rest;
      });
    }

    res.json({ status: 'success', result: league });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
