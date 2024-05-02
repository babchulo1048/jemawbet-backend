const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
  firstClub: { type: String, required: true },
  secondClub: { type: String, required: true },
  result: { type: String },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
});

const Match = mongoose.model("match", matchSchema);

module.exports = Match;
