const updateFixturesByDateRange = require('./updateFixturesByDateRange');
const updateLeagueFixtures = require('./updateLeagueFixtures');
const updateLeagueSeasons = require('./updateLeagueSeasons');
const updateTeamStandings = require('./updateTeamStandings');
const updateTopAssistors = require('./updateTopAssistors');
const updateTopScorers = require('./updateTopScorers');

module.exports = {
  updateLeagueSeasons,
  updateLeagueFixtures,
  updateFixturesByDateRange,
  updateTeamStandings,
  updateTopScorers,
  updateTopAssistors,
};
