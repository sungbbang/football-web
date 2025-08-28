const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: { type: Number },
  teamName: { type: String },
  teamLogo: { type: String },

  leagueId: { type: Number },
  leagueName: { type: String },
  leagueSeason: { type: Number },

  rank: { type: Number },
  points: { type: Number },
  played: { type: Number },
  win: { type: Number },
  draw: { type: Number },
  lose: { type: Number },

  goalsFor: { type: Number },
  goalsAgainst: { type: Number },

  form: { type: String },
});

module.exports = mongoose.model('Team', teamSchema);
