const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const router = express.Router();

const { User, schemas } = require("../../models/User");
const { auth } = require("../../middlewares");
const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

router.post("/register", async (req, res, next) => {
  try {
    res.json("work");
  } catch (err) {
    console.log("not work");
    next();
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await User.find({ email: email });
    if (result[0].password !== password) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = {
      id: result._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    const findAndUpdate = await User.findByIdAndUpdate(result[0]._id, {
      token,
    });

    res.status(200).json({
      token: token,
      user: {
        email: findAndUpdate.email,
      },
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
