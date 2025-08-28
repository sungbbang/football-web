const TopScorer = require('../models/TopScorer');
const { validateApiResponse } = require('../utils/apiResponseValidator');

async function updateTopScorers(year, leagueId, response) {
  try {
    validateApiResponse('득점 순위 정보', { response, year, leagueId });

    await TopScorer.deleteMany({
      leagueId: leagueId,
      leagueSeason: year,
    });

    const leagueObj = {
      'Premier League': 'epl',
      'La Liga': 'laliga',
      Bundesliga: 'bundesliga',
      'Serie A': 'serieA',
      'Ligue 1': 'ligue1',
    };

    const apiResponseData = response.data.response;

    const topScorers = apiResponseData.map(item => {
      const { player, statistics } = item;
      const stat = statistics[0];

      return {
        playerName: player.name,
        playerImg: player.photo,

        leagueId: stat.league.id,
        leagueName: leagueObj[stat.league.name],
        leagueSeason: stat.league.season,

        teamName: stat.team.name,
        teamLogo: stat.team.logo,

        goals: stat.goals.total,
        assists: stat.goals.assists,
        pkGoals: stat.penalty.scored,
        keyPasses: stat.passes.key,
        games: stat.games.appearences,
        minutes: stat.games.minutes,
      };
    });

    await TopScorer.insertMany(topScorers);
  } catch (error) {
    console.error(
      `[${year}시즌 ${leagueId}리그] 득점왕 정보 업데이트 중 에러 발생:`,
      error.message,
      error
    );
    throw error;
  }
}

module.exports = updateTopScorers;
