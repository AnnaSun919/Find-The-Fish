const router = require("express").Router();
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");
let RecipeModel = require("../models/Recipe.model");




  router.get("/addrecipe", (req, res) => {
    res.render("main/addrecipe.hbs");
  });
  
  router.post("/addrecipe", (req, res, next) => {
    const {
   title,
   ingredients,
   instructions,

    } = req.body;
   
  
    const recipe = req.session.loggedInUser._id;
    RecipeModel.create({
        title,
        ingredients,
        instructions,
        recipe,
    })
      .then(() => {
        res.render("main.hbs");
      })
      .catch(() => {
        next("failed to save recipe");
      });
  });



  module.exports = router;