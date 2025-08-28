const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  leagueId: { type: Number },
  leagueName: { type: String },
  logoImg: { type: String },
  seasons: [
    {
      year: { type: Number },
      start: { type: Date },
      end: { type: Date },
      current: { type: Boolean },
    },
  ],
});

module.exports = mongoose.model('League', leagueSchema);
