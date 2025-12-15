require('dotenv').config();
const { connectDB, disconnectDB } = require('../config/db');
const League = require('../models/League');
const Schedule = require('../models/Schedule');

async function validateSeasonInfo() {
  await connectDB();
  const leagueIds = [39, 140, 78, 135, 61];

  for (const leagueId of leagueIds) {
    const league = await League.findOne({ leagueId });
    if (!league) {
      console.error(`[validateSeasonInfo] league not found: ${leagueId}`);
      continue;
    }

    for (const season of league.seasons) {
      try {
        const seasonYear = season.year;

        const seasonSchedules = await Schedule.find({
          leagueId,
          leagueSeason: seasonYear,
        }).sort({ date: 1 });

        if (seasonSchedules.length === 0) {
          console.warn(
            `[validateSeasonInfo] no schedules: league=${leagueId}, season=${seasonYear}`
          );
          continue;
        }

        const seasonStartDate = seasonSchedules[0].date;
        const seasonEndDate = seasonSchedules[seasonSchedules.length - 1].date;

        await League.updateOne(
          { leagueId, 'seasons.year': seasonYear },
          {
            $set: {
              'seasons.$.start': seasonStartDate,
              'seasons.$.end': seasonEndDate,
            },
          }
        );
      } catch (error) {
        console.error(
          `[validateSeasonInfo] failed: league=${leagueId}, season=${season.year}`,
          error
        );
      }
    }
  }

  await disconnectDB();
}

validateSeasonInfo();
