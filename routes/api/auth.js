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

module.exports = router;
