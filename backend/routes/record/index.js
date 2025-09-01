const express = require('express');
const router = express.Router();

const playerRankRouter = require('./player');
const teamRankRouter = require('./team');

router.use('/player', playerRankRouter);
router.use('/team', teamRankRouter);

module.exports = router;
