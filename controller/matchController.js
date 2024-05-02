const asyncMiddleware = require("../middleware/async");
const Match = require("../models/Match");
const Admin = require("../models/Admin");
const Bet = require("../models/Bet");
const Groups = require("../models/Group");

const express = require("express");
const router = express.Router();
router.use(express.json());

exports.matchCreate = asyncMiddleware(async (req, res) => {
  const { firstClub, secondClub, adminId } = req.body;

  //   let admin = await Admin.findById(adminId);
  //   if (!admin) return res.status(404).send("Admin not found");
  const match = new Match({ firstClub, secondClub, adminId });

  await match.save();

  res.status(200).send(match);
});

exports.matchDetail = asyncMiddleware(async (req, res) => {
  const match = await Match.find({});
  res.status(200).send(match);
});

exports.matchUpdate = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const match = await Match.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).send("match successfully updated");
});

// exports.matchResult = asyncMiddleware(async (req, res) => {
//   const { id } = req.params;
//   const { result } = req.body;
//   const match = await Match.findByIdAndUpdate(id, { result }, { new: true });
//   res.status(200).send("Match result successfully updated");
// });

exports.matchResult = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const { result } = req.body;

  // Update match result
  const updatedMatch = await Match.findByIdAndUpdate(
    id,
    { result },
    { new: true }
  );

  // Find all bets associated with this match
  const bets = await Bet.find({ matchId: id });

  // Update scores based on match result
  for (const bet of bets) {
    // Check if the user's choice matches the match result
    if (bet.choice.includes(result)) {
      // Update scores
      console.log("bet:", bet);
      if (isNaN(bet.scores)) {
        bet.scores = 0; // Initialize to 0 if it's NaN
      }
      // Update scores
      bet.scores += 1; // Example: Increase scores by 1

      await bet.save();
    }
  }

  // Call betResult function to update betResult based on scores
  await updateBetResults();

  res.status(200).json({
    message: "Match result successfully updated",
    updatedMatch,
    updatedBets: bets,
  });
});

async function updateBetResults() {
  // Fetch all unique group IDs
  const groupIds = await Bet.distinct("groupId");

  for (const groupId of groupIds) {
    // Find bets associated with the current group
    const bets = await Bet.find({ groupId });

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
      await bet.save(); // Save the updated bet
    }
  }
}

exports.matchDelete = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const match = await Match.findByIdAndDelete(id);

  // Find all remaining matches
  const remainingMatches = await Match.find();

  // If there are no remaining matches, update isSubmitted for all bets to false
  if (remainingMatches.length === 0) {
    const bets = await Bet.find();
    // bets.deleteMany({});
    // await Bet.updateMany(
    //   {},
    //   {
    //     $unset: {
    //       // _id: "",
    //       // groupId: "",
    //       // userId: "",
    //       matchId: "",
    //       choice: "",
    //       scores: "",
    //       betResult: "",
    //       isSubmitted: "",
    //     },
    //   }
    // );
    for (const bet of bets) {
      bet.isSubmitted = false;
      await Bet.deleteMany({});
      // bet.deleteMany({});
      await bet.save();
    }
  }

  res.status(200).send("match successfully deleted.");
});
