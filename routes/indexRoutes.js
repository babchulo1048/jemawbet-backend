const error = require("../middleware/error");
const express = require("express");
const AdminRoute = require("./adminRoute");
const UserRoute = require("./userRoute");
const MatchRoute = require("./matchRoute");

const GroupRoute = require("./groupRoute");
const BetRoute = require("./betRoute");

const router = express.Router();
// router.use(express.json());

router.use("/admin", AdminRoute);
router.use("/user", UserRoute);
router.use("/match", MatchRoute);

router.use("/group", GroupRoute);
router.use("/bet", BetRoute);

router.use(error);

module.exports = router;
