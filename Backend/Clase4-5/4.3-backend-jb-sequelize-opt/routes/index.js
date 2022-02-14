const express = require("express");
const router = express.Router();
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/sequelize");

const jwtSecret = Buffer.from(process.env.JWT_SECRET, "base64");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/auth/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await sequelize.models.User.findOne({ where: { email: email } });
  if (!(user && user.validatePassword(password))) {
    res.sendStatus(401);
    return;
  }

  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});

module.exports = router;
