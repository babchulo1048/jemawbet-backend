const express = require("express");

const betController = require("../controller/betController");

const router = express.Router();

router.get("/", betController.betGet);
router.get("/betResult", betController.betResult);
router.get("/bet/:id", betController.userBet);

router.post("/create", betController.betCreate);

router.put("/score", betController.scoreUpdate);

module.exports = router;
