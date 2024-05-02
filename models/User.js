const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
