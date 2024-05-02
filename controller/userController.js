const User = require("../models/User");
const asyncMiddleware = require("../middleware/async");
const jwt = require("jsonwebtoken");

exports.userRegister = asyncMiddleware(async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("Email already exist");

  user = new User({ name, email });
  await user.save();

  res.status(200).send(user);
});

exports.userDetail = asyncMiddleware(async (req, res) => {
  const user = await User.find({});
  res.status(200).send(user);
});

exports.userUpdate = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).send("user successfully updated");
});

exports.userDelete = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  res.status(200).send("user successfully deleted.");
});

exports.userLogin = asyncMiddleware(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send("Invalid email ");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
    expiresIn: "1h",
  });

  res.status(200).send({ token, name: user.name, userId: user._id });
});
