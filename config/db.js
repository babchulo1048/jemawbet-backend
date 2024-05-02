const mongoose = require("mongoose");
require("dotenv").config();

const Mongodb_URI = process.env.MONGODB_URI;

mongoose
  .connect(Mongodb_URI)
  .then(() => console.log("mongodb connected"))
  .catch((ex) => console.log("Database connection error", ex.message));

module.exports = mongoose.connection;
