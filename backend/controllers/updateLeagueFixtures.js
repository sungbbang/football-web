const League = require('../models/League');
const Schedule = require('../models/Schedule');
const { validateApiResponse } = require('../utils/apiResponseValidator');

async function updateLeagueFixtures(year, leagueId, response) {
  try {
    validateApiResponse('시즌일정 정보', { response, year, leagueId });

    const apiResponseData = response.data.response;
    apiResponseData.sort(
      (a, b) => new Date(a.fixture.date) - new Date(b.fixture.date)
    );

    const firstMatchDate = new Date(apiResponseData[0].fixture.date);
    const lastMatchDate = new Date(
      apiResponseData[apiResponseData.length - 1].fixture.date
    );

    await League.findOneAndUpdate(
      { leagueId: leagueId, 'seasons.year': year },
      {
        $set: {
          'seasons.$.start': firstMatchDate,
          'seasons.$.end': lastMatchDate,
        },
      },
      { new: true, upsert: false }
    );
    console.log('## 시작날짜와 종료날짜 정확하게 업데이트');

    const leagueObj = {
      'Premier League': 'epl',
      'La Liga': 'laliga',
      Bundesliga: 'bundesliga',
      'Serie A': 'serieA',
      'Ligue 1': 'ligue1',
    };

    for (let item of apiResponseData) {
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
      `[${year}시즌 ${leagueId}리그] 시즌 일정 업데이트 중 에러 발생:`,
      error.message,
      error
    );
    throw error;
  }
}

module.exports = updateLeagueFixtures;
