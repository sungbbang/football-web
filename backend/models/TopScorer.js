const mongoose = require('mongoose');

const topScorerSchema = new mongoose.Schema({
  playerName: { type: String },
  playerImg: { type: String },

  leagueId: { type: Number },
  leagueName: { type: String },
  leagueSeason: { type: Number },

  teamName: { type: String },
  teamLogo: { type: String },

  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  pkGoals: { type: Number, default: 0 },
  keyPasses: { type: Number, default: 0 },
  games: { type: Number },
  minutes: { type: Number },
});

module.exports = mongoose.model('TopScorer', topScorerSchema);
