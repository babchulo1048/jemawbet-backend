const Admin = require("../models/Admin");
const asyncMiddleware = require("../middleware/async");
const jwt = require("jsonwebtoken");

// require("dotenv").config();

exports.adminRegister = asyncMiddleware(async (req, res) => {
  const { name, email, password } = req.body;

  let admin = await Admin.findOne({ email });
  if (admin) return res.status(400).send("Email already exist");

  admin = new Admin({ name, email, password });
  await admin.save();

  res.status(200).send(admin);
});

exports.adminDetail = asyncMiddleware(async (req, res) => {
  const admin = await Admin.find({});
  res.status(200).send(admin);
});

exports.adminUpdate = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).send("Admin successfully updated");
});

exports.adminDelete = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  const admin = await Admin.findByIdAndDelete(id);

  res.status(200).send("Admin successfully deleted.");
});

exports.adminLogin = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || admin.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  const token = jwt.sign({ adminId: admin._id }, process.env.JWTSECRET, {
    expiresIn: "1h",
  });

  res.status(200).send({ token, email: admin.email, adminId: admin._id });
});
