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
  try {
    const { error } = schemas.loginUser.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const result = await User.findOne({ email });
    if (!result) {
      throw createError(401, "Email is wrong");
    }
    if (!result.verify) {
      throw createError(403, "Verify your email first!");
    }
    // const passwordCompare = await bcrypt.compare(password, user.password);
    // if (!passwordCompare) {
    //   throw createError(401, "Password is wrong");
    // }
    if (result.password !== password) {
      throw createError(401, "Password is wrong");
    }

    const payload = {
      id: result._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    await User.findByIdAndUpdate(result._id, { token });

    console.log(token);
    res.status(200).json({
      token,
      user: {
        email: result.email,
        name: result.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/logout", auth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(200).json()
  } catch (err) {
    next();
  }
});

module.exports = router;
