const TopAssistor = require('../models/TopAssistor');
const { validateApiResponse } = require('../utils/apiResponseValidator');

async function updateTopAssistors(year, leagueId, response) {
  try {
    validateApiResponse('도움 순위 정보', { response, year, leagueId });

    await TopAssistor.deleteMany({
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

    const topAssistors = apiResponseData.map(item => {
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

    await TopAssistor.insertMany(topAssistors);
  } catch (error) {
    console.error(
      `[${year}시즌 ${leagueId}리그] 도움왕 정보 업데이트 중 에러 발생:`,
      error.message,
      error
    );
    throw error;
  }
}

module.exports = updateTopAssistors;
