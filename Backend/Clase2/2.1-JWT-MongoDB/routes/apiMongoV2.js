var express = require("express");
var router = express.Router();
const models = require("../models");
const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  try {
    const isValid = jwt.verify(req.headers.token, "shhhhh");
    if (!isValid) {
      throw new Error("Session expired");
    }
    return next();
  } catch (error) {
    throw new Error(error);
  }
};

/* GET home page. */
router.post("/user", async (req, res, next) => {
  try {
    const { name, lastName, jobTitle, password, email } = req.body;
    // create the instance
    const newUser = new models.User({
      email,
      name,
      lastName,
      jobTitle,
      password,
    });

    //save the instance
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/user", checkJWT, async function (req, res, next) {
  try {
    const users = await models.User.find({});
    console.log(users);
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const users = await models.User.find({ id: req.params.id });
    console.log(users);
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

router.delete("/user/:id", async (req, res, next) => {
  try {
    await models.User.findByIdAndDelete(req.params.id);
    res.status(200).json();
  } catch (error) {
    throw new Error(error);
  }
});

router.put("/user/:id", async (req, res, next) => {
  try {
    const userUpdated = await models.User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.json(userUpdated);
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // create the instance
    const userFound = await models.User.findOne({
      email: req.body.email,
    });

    if (!userFound) {
      //throw new Error({ error: "User does not exists" });
      return res.json({ error: "User does not exists" });
    }
    const isValid = userFound.validatePassword(password);
    if (!isValid) {
      //throw new Error({ error: "User does not exists" });
      return res.json({ error: "Check your email and password" });
    }

    const { name, lastName, jobTitle } = userFound;
    const token = jwt.sign({ name, lastName, jobTitle }, "shhhhh", {
      expiresIn: "1s",
    });

    res.json({ token });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
