const express = require("express");
const groupController = require("../controller/groupController");

const router = express.Router();

router.use(express.json());

router.get("/detail", groupController.groupDetail);

router.get("/specificGroup/:id", groupController.groupSpecificDetail);

router.post("/register/:id", groupController.groupRegister);

module.exports = router;
