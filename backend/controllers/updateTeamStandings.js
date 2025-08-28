const Team = require('../models/Team');
const { validateApiResponse } = require('../utils/apiResponseValidator');

async function updateTeamStandings(year, leagueId, response) {
  try {
    validateApiResponse('팀 순위 정보', { response, year, leagueId });

    await Team.deleteMany({
      leagueId: leagueId,
      leagueSeason: year,
    });

    const apiResponseData = response.data.response[0];
    const { league } = apiResponseData;

    const leagueObj = {
      'Premier League': 'epl',
      'La Liga': 'laliga',
      Bundesliga: 'bundesliga',
      'Serie A': 'serieA',
      'Ligue 1': 'ligue1',
    };

    const teamStandings = league.standings[0].map(item => {
      const { team, all } = item;

      return {
        teamId: team.id,
        teamName: team.name,
        teamLogo: team.logo,

        leagueId: league.id,
        leagueName: leagueObj[league.name],
        leagueSeason: league.season,

        rank: item.rank,
        points: item.points,
        played: all.played,
        win: all.win,
        draw: all.draw,
        lose: all.lose,

        goalsFor: all.goals.for,
        goalsAgainst: all.goals.against,

        form: item.form,
      };
    });

    await Team.insertMany(teamStandings);
  } catch (error) {
    console.error(
      `[${year}시즌 ${leagueId}리그] 팀순위 업데이트 중 에러 발생:`,
      error.message,
      error
    );
    throw error;
  }
}

module.exports = updateTeamStandings;
