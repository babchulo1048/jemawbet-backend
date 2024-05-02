const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: { type: String, required: true },
  userAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const Group = mongoose.model("group", groupSchema);

module.exports = Group;
