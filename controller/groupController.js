const Group = require("../models/Group");
const User = require("../models/User");
const asyncMiddleware = require("../middleware/async");

exports.groupRegister = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const { name, members } = req.body;

  // Find the IDs of the users based on their emails
  const memberIds = await Promise.all(
    members.map(async (email) => {
      const user = await User.findOne({ email });
      return user ? user._id : null;
    })
  );

  // Get the userAdmin ID
  const userAdminId = await User.findById(id);

  // Remove null values from memberIds array
  const validMemberIds = [...memberIds.filter((id) => id), userAdminId];

  // Create the group with the valid member IDs
  group = new Group({ name, members: validMemberIds, userAdmin: id });

  // const group = new Group({ name, members, userAdmin: id });
  await group.save();

  res.status(200).send(group);
});

exports.groupDetail = asyncMiddleware(async (req, res) => {
  const group = await Group.find({})
    .populate("userAdmin")
    .populate("members", "name");
  res.status(200).send(group);
});

exports.groupSpecificDetail = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const group = await Group.findById(id).populate("members", "name");

  res.status(200).send(group);
});
