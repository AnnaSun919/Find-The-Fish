const router = require("express").Router();
// let UserModel = require("../models/User.model");
// let FishModel = require("../models/Fish.model");
const uploader = require("../middlewares/cloudinary.config.js");
let RecipeModel = require("../models/Recipe.model");

// GET home page
router.get("/recipes", (req, res, next) => {
  RecipeModel.find()
    .then((recipe) => {
      res.render("recipe/recipe-list.hbs", { recipe });
    })
    .catch((err) => {
      next("Find failed");
    });
});

// handling GET request to main/addrecipe
router.get("/addrecipe", (req, res) => {
  res.render("recipe/addrecipe.hbs");
});

// handling POST request to /addrecipe
router.post("/recipes", uploader.single("photo"), (req, res, next) => {
  const defaultRecipeImage =
    "https://res.cloudinary.com/dtjxpedls/image/upload/v1625579445/uhqx9pvj5uzkrtnqp7fx.jpg";
  let photo = req.file ? req.file.path : defaultRecipeImage;
  const { title, ingredients, instructions } = req.body;
  const creater = req.session.loggedInUser._id;
  RecipeModel.create({ photo, title, ingredients, instructions, creater })
    .then(() => {
      res.redirect("/recipes");
    })
    .catch(() => {
      next("failed to save recipe");
    });
});

router.get("/recipes/:id", (req, res, next) => {
  let dynamicRecipeId = req.params.id;

  RecipeModel.findById(dynamicRecipeId)
    .populate("creater")
    .then((recipe) => {
      if (!recipe.creater) {
        req.app.locals.isCreatedbyUser = false;
        req.app.locals.isCreator = false;
        res.render("recipe/recipe-details.hbs", { recipe });
      } else if (!req.session.loggedInUser) {
        req.app.locals.isCreator = false;
        res.render("recipe/recipe-details.hbs", { recipe });
      } else if (
        recipe.creater._id.toString() === req.session.loggedInUser._id
      ) {
        req.app.locals.isCreator = true;
        req.app.locals.isCreatedbyUser = true;
        console.log("isCreatedbyUser");
        res.render("recipe/recipe-details.hbs", { recipe });
      } else {
        req.app.locals.isCreator = false;
        req.app.locals.isCreatedbyUser = true;
        res.render("recipe/recipe-details.hbs", { recipe });
      }
    })
    .catch(() => {
      next("Finding details failed");
    });
});

//Dynamic Update for form
router.get("/recipes/:id/edit", (req, res, next) => {
  let dynamicRecipeId = req.params.id;

  RecipeModel.findById(dynamicRecipeId)
    .then((recipe) => {
      //pass the recipe value to the edit form
      res.render("recipe/update-recipe.hbs", { recipe });
    })
    .catch((err) => {
      next("Cannot find the damn recipe details");
    });
});

//Dynamic POST
router.post("/recipes/:id/edit", (req, res, next) => {
  let dynamicRecipeId = req.params.id;
  const { title, ingredients, instructions } = req.body;
  console.log("HI");
  console.log(ingredients);

  RecipeModel.findByIdAndUpdate(dynamicRecipeId, {
    title,
    ingredients,
    instructions,
  })
    .then(() => {
      res.redirect("/recipes");
    })
    .catch(() => {
      next("Edit failed");
    });
});

//Deletes POST
router.post("/recipes/:id/delete", (req, res, next) => {
  //create variable for dynamic ID
  let dynamicRecipeId = req.params.id;

  RecipeModel.findByIdAndDelete(dynamicRecipeId)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch(() => {
      next("Failed to delete recipe");
    });
});

module.exports = router;
