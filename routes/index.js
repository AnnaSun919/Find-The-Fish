const router = require("express").Router();
let FishModel = require("../models/Fish.model");
let RecipeModel = require("../models/Recipe.model");
/* GET Home page */
router.get("/", (req, res, next) => {
  FishModel.find({}, "speciesIllustrationPhoto")
    .limit(6)
    .then((fish) => {
      return RecipeModel.find({}, "photo")
        .limit(6)
        .then((recipe) => {
          res.render("index", { recipe, fish });
        });
    })
    .catch((err) => {
      next("fish fetch failed: " + err);
    });
});

module.exports = router;
