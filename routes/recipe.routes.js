const router = require("express").Router();
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");
let RecipeModel = require("../models/Recipe.model");




  router.get("/addrecipe", (req, res) => {
    res.render("main/addrecipe.hbs");
  });
  
//   router.post("/addrecipe", (req, res, next) => {
//     const {
//    title,
//    prepTime,
//    cookTime,
//    servings,
//    ingredients,
//    instructions,
//     } = req.body;
   
  
//     const recipe = req.session.loggedInUser._id;
//     RecipeModel.create({
//         title,
//         prepTime,
//         cookTime,
//         servings,
//         ingredients,
//         instructions,
//     })
//       .then(() => {
//         res.render("main/addrecipe.hbs");
//       })
//       .catch(() => {
//         next();
//       });
//   });






  
// //     const fisher = req.session.loggedInUser._id;
// //     FishModel.create({
// //       habitat,
// //       location,
// //       population,
// //       scientificName,
// //       speciesIllustrationPhoto,
// //       speciesName,
// //       biology,
// //       fisher,
// //     })
// //       .then(() => {
// //         res.render("main/createfish.hbs");
// //       })
// //       .catch(() => {
// //         next();
// //       });
// //   });
  
  module.exports = router;