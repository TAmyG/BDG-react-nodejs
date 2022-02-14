var express = require("express");
var router = express.Router();
let users = [
  {
    id: 1,
    name: "Luis",
    lastName: "Perez",
    jobTitle: "Boss",
  },
  {
    id: 2,
    name: "Carlos",
    lastName: "Penia",
    jobTitle: "Technical II",
  },
];

/* GET home page. */
router.get("/user", function (req, res, next) {
  res.json(users);
});

router.get("/user/:id", function (req, res, next) {
  const user = users.find(({ id }) => id === +req.params.id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  res.json(user);
});

router.post("/user", function (req, res, next) {
  const { name, lastName, jobTitle } = req.body;

  let newUser = {
    id: users.length + 1,
    name,
    lastName,
    jobTitle,
  };
  users.push(newUser);
  res.json(users);
});

router.delete("/user/:id", function (req, res, next) {
  users = users.filter(({ id }) => id !== +req.params.id);
  res.json(users);
});

router.put("/user/:id", function (req, res, next) {
  users = users.map((user) => {
    if (user.id === +req.params.id) {
      user.name = req.body.name ? req.body.name : user.name;
      user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
      user.jobTitle = req.body.jobTitle ? req.body.jobTitle : user.jobTitle;
    }
    return user;
  });
  res.json(users);
});

module.exports = router;
