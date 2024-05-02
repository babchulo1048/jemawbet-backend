const asyncMiddleware = require("../middleware/async");
const Bet = require("../models/Bet");
const express = require("express");

const router = express.Router();
router.use(express.json());

exports.betGet = asyncMiddleware(async (req, res) => {
  const bet = await Bet.find({});

  res.send(bet);
});

exports.userBet = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const bet = await Bet.find({ userId: id });

  if (!bet) return res.send("user not found");

  res.send(bet);
});

exports.betCreate = asyncMiddleware(async (req, res) => {
  const { userId, matchId, choice, scores, groupId, isSubmitted } = req.body;

  const bet = new Bet({
    userId,
    matchId,
    choice,
    scores,
    groupId,
    isSubmitted,
  });

  await bet.save();

  res.status(200).send(bet);
});

exports.betResult = asyncMiddleware(async (req, res) => {
  const bets = await Bet.find({});

  // Find the highest scores among all bets
  let maxScores = -Infinity;
  for (let bet of bets) {
    if (bet.scores > maxScores) {
      maxScores = bet.scores;
    }
  }

  // Set the betResult based on the highest scores
  for (let bet of bets) {
    bet.betResult = bet.scores === maxScores ? "Win" : "Lose";
  }

  res.send(bets);
});

exports.scoreUpdate = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const { scores, matchIds } = req.body;

  const updatedMatches = await Promise.all(
    matchIds.map(async (matchId) => {
      const updatedBet = await Bet.findOneAndUpdate(
        { matchId: matchId }, // Find the bet associated with the match
        { scores: scores },
        { new: true }
      );
      return updatedBet;
    })
  );

  res
    .status(200)
    .json({ message: "Scores updated successfully", updatedMatches });
});
