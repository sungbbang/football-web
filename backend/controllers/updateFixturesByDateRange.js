const Schedule = require('../models/Schedule');
const { validateApiResponse } = require('../utils/apiResponseValidator');

async function updateFixturesByDateRange(
  year,
  leagueId,
  fromDateStr,
  toDateStr,
  response
) {
  try {
    validateApiResponse(`${fromDateStr} ~ ${toDateStr} 일정정보`, {
      response,
      year,
      leagueId,
    });

    const leagueObj = {
      'Premier League': 'epl',
      'La Liga': 'laliga',
      Bundesliga: 'bundesliga',
      'Serie A': 'serieA',
      'Ligue 1': 'ligue1',
    };

    const apiResponseData = response.data.response;
    for (const item of apiResponseData) {
      const { fixture, league, teams, goals } = item;

      const schedule = {
        fixtureId: fixture.id,

        leagueId: league.id,
        leagueName: leagueObj[league.name],
        leagueSeason: league.season,
        leagueRound: league.round,

        date: new Date(fixture.date),
        stadium: fixture.venue.name,

        homeTeamId: teams.home.id,
        homeTeamName: teams.home.name,
        homeTeamLogo: teams.home.logo,
        awayTeamId: teams.away.id,
        awayTeamName: teams.away.name,
        awayTeamLogo: teams.away.logo,

        isFinished: fixture.status.long === 'Match Finished' ? true : false,

        homeGoals: goals.home === null ? 0 : goals.home,
        awayGoals: goals.away === null ? 0 : goals.away,
      };

      await Schedule.findOneAndUpdate(
        { fixtureId: fixture.id },
        { $set: schedule },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error(
      `[${year}시즌 ${leagueId}리그 ${fromDateStr} ~ ${toDateStr}] 경기정보 업데이트 중 에러 발생:`,
      error.message,
      error
    );
    throw error;
  }
}

module.exports = updateFixturesByDateRange;
