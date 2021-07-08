const router = require("express").Router();
let FishModel = require("../models/Fish.model");
let RecipeModel = require("../models/Recipe.model");


/* GET Home page */
router.get("/", (req, res, next) => {
  FishModel.find({}, "speciesIllustrationPhoto")
    .limit(6)
    .then((fish) => {
      res.render("index", { fish });
    })
    .catch((err) => {
      next("fish fetch failed: " + err);
    });
    // RecipeModel.find({}, "recipePic")
    // .limit(6)
    // .then((recipe) => {
    //   console.log(recipe)
    //   res.render("index", { recipe });
    
    // })
    // .catch((err) => {
    //   next("recipe fetch failed: " + err);
    // });

});



module.exports = router;
