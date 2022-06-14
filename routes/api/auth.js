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

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, `Електронна пошта ${email} вже використовується`);
    };

    const hashPass = await bcrypt.hash(password, 10);

    const result = await User.create({ email, password: hashPass });    
    
    
    res.status(201).json({
        user: {
            email: result.email            
        }
    });
    
  } catch (err) {
    console.log("not work");
    next();
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await User.findOne({ email: email });
    if (result.password !== password) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = {
      id: result._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    const findAndUpdate = await User.findByIdAndUpdate(result._id, {
      token,
    });

    res.status(200).json({
      token: token,
      user: {
        email: findAndUpdate.email,
        name: findAndUpdate.name
      },
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;
