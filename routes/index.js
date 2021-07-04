const router = require("express").Router();
let FishModel = require("../models/Fish.model");

/* GET home page */
router.get("/", (req, res, next) => {
  FishModel.find({}, "speciesIllustrationPhoto")
    .limit(6)
    .then((fish) => {
      res.render("index", { fish });
    })
    .catch((err) => {
      next("fish fetch failed: " + err);
    });
});

module.exports = router;
