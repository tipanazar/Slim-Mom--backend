const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const router = express.Router();

const { User, schemas } = require("../../models/User");
const { auth } = require("../../middlewares");
const { createError, sendEmail } = require("../../helpers");

const { SECRET_KEY } = process.env;

const msg = (email, verificationToken) => {
  return ({
    to: email,
    subject: "Підтвердження реєстрації",
    html: `<a target="_blank" href="http://localhost:4000/api/auth/verify/${verificationToken}">НАТИСНІТЬ ДЛЯ ПІДТВЕРДЖЕННЯ ВАШОЇ ЕЛЕКТРОННОЇ АДРЕСИ </a>`
  })        
    };

router.post("/register", async (req, res, next) => {
  try {   
    const { error } = schemas.addUser.validate(req.body);    
        if(error) {
          throw error;
    };

    const { name, email, password } = req.body;
    // console.log(password.length)
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, `Електронна пошта ${email} вже використовується`);
    };

    const hashPass = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const result = await User.create({
      name,
      email,
      password: hashPass,
      verificationToken
    });   

    await sendEmail(msg(email, verificationToken));    
    
    res.status(201).json({
        user: {
            name: result.name,            
            email: result.email            
        }
    });
    
  } catch (error) {
    next(error);    
  }
});


router.get("/verify/:verificationToken", async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    console.log(verificationToken)
        const user = await User.findOne({verificationToken});
        if(!user){
            throw createError(404);
        }
        await User.findByIdAndUpdate(user._id, {verificationToken: null, verify: true});
    res.json({
      message: 'Підтвердження успішне'
    });
    
  } catch (error) {
    next(error);    
  }
});


router.get("/verify", async (req, res, next) => {
  try {    
    const { error } = schemas.emailValidation.validate(req.body);    
        if(error) {
            throw createError(400, "Відсутня адреса електронної пошти");
    };
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            throw createError(400);
    };
        if(user.verify) {
            throw createError(400, "Електронна пошта вже перевірена")
    };

    const { verificationToken } = user;        
    await sendEmail(msg(email, verificationToken));
    
    res.status(200).json({
       message: "Повідомлення для підтвердження електронної пошти відправлено"
    });
    
  } catch (error) {
    next(error);    
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
