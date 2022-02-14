var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:identificador", function (req, res, next) {
  res.json({
    parametroEntrada: req.params.identificador,
  });
});

module.exports = router;
