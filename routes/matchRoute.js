const express = require("express");

const matchController = require("../controller/matchController");

const router = express.Router();

router.use(express.json());

/**
 * @api {get} /match/detail Request Match Information
 * @apiName GetMatch
 * @apiGroup Match
 * @apiSuccess {Object[]} match fetch all match attribute

 */
router.get("/detail", matchController.matchDetail);

/**
 * @api {post} /match/create Create New Match
 * @apiName CreateMatch
 * @apiGroup Match
 *
 *@apiBody {String} name name of the match
 *@apiBody {objectId} adminId unique Id of admin
 * @apiSuccess {String} message successfully match created.
 */
router.post("/create", matchController.matchCreate);

/**
 * @api {put} /match/:id Update Match
 * @apiName updateMatch
 * @apiGroup Match
 * @apiParam {objectId} id match unique Id
 * @apiBody {String} name name of the match
 *
 * @apiSuccess {String} message successfully match updated.
 */
router.put("/:id", matchController.matchUpdate);

// document

router.put("/result/:id", matchController.matchResult);

/**
 * @api {delete} /match/:id Delete Match Information
 * @apiName DeleteMatch
 * @apiGroup Match
 * 
 * @apiParam {objectId} id match unique Id
 * @apiSuccess {Object[]} match delete all match attribute

 */
router.delete("/:id", matchController.matchDelete);

module.exports = router;
