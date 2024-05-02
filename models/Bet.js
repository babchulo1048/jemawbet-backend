const mongoose = require("mongoose");

const betSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "group" },
  matchId: [{ type: mongoose.Schema.Types.ObjectId, ref: "match" }],
  choice: [{ type: String, required: true }],
  scores: { type: Number },
  betResult: { type: String },
  isSubmitted: { type: Boolean },
});

const Bet = mongoose.model("bet", betSchema);

module.exports = Bet;
