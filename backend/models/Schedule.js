const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  fixtureId: { type: Number },

  leagueId: { type: Number },
  leagueName: { type: String },
  leagueSeason: { type: Number },
  leagueRound: { type: String },

  date: { type: Date },
  stadium: { type: String },

  homeTeamId: { type: Number },
  homeTeamName: { type: String },
  homeTeamLogo: { type: String },

  awayTeamId: { type: Number },
  awayTeamName: { type: String },
  awayTeamLogo: { type: String },

  isFinished: { type: Boolean },

  homeGoals: { type: Number },
  awayGoals: { type: Number },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
