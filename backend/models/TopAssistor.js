const mongoose = require('mongoose');

const topAssistorSchema = new mongoose.Schema({
  playerName: { type: String },
  playerImg: { type: String },

  leagueId: { type: Number },
  leagueName: { type: String },
  leagueSeason: { type: Number },

  teamName: { type: String },
  teamLogo: { type: String },

  goals: { type: Number },
  assists: { type: Number },
  pkGoals: { type: Number },
  keyPasses: { type: Number },
  games: { type: Number },
  minutes: { type: Number },
});

module.exports = mongoose.model('TopAssistor', topAssistorSchema);
