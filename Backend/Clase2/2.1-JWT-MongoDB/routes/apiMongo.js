var express = require("express");
var router = express.Router();
const models = require("../models");

/* GET home page. */
router.post("/user", async (req, res, next) => {
  try {
    const { name, lastName, jobTitle } = req.body;
    // create the instance
    const newUser = new models.User({
      name,
      lastName,
      jobTitle,
    });

    //save the instance
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/user", async function (req, res, next) {
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
    await models.User.findByIdAndDelete({ id: req.params.id });
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

module.exports = router;
