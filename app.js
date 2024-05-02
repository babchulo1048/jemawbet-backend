const express = require("express");

require("dotenv").config;
const db = require("./config/db");
const config = require("./config/index");
const routes = require("./routes/indexRoutes");
const cors = require("cors");

const app = express();

const PORT = config.PORT;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB connection successful");
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://jemawbet.netlify.app/"],
  })
);
app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
