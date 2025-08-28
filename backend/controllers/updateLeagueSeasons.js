const League = require('../models/League');
const { validateApiResponse } = require('../utils/apiResponseValidator');

async function updateLeagueSeasons(leagueId, response) {
  try {
    validateApiResponse('리그 시즌정보', { response, leagueId });

    const apiResponseData = response.data.response[0];
    const leagueInfo = apiResponseData.league;
    const sortedSeasons = apiResponseData.seasons.sort(
      (a, b) => new Date(b.year) - new Date(a.year)
    );
    const latestThreeSeasons = sortedSeasons.slice(0, 3);

    const leagueObj = {
      'Premier League': 'epl',
      'La Liga': 'laliga',
      Bundesliga: 'bundesliga',
      'Serie A': 'serieA',
      'Ligue 1': 'ligue1',
    };

    await League.findOneAndUpdate(
      { leagueId: leagueInfo.id },
      {
        leagueName: leagueObj[leagueInfo.name],
        logoImg: leagueInfo.logo,
        seasons: latestThreeSeasons.map(v => ({
          year: v.year,
          start: v.start,
          end: v.end,
          current: v.current,
        })),
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  } catch (error) {
    console.error(
      `[${leagueId}리그] 시즌정보 업데이트 중 에러 발생:`,
      error.message,
      error
    );
    throw error;
  }
}

module.exports = updateLeagueSeasons;
