const router = require("express").Router();
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");
let RecipeModel = require("../models/Recipe.model");


// GET home page
router.get('/', (req, res, next) => {

    RecipeModel.find()
      .then((recipes) => {
          res.render('main/recipe-list.hbs', {recipes})
      })
      .catch(() => {
          next('Find failed')
      })
  });

// handling GET request to main/addrecipe
  router.get("/addrecipe", (req, res) => {
    res.render("main/addrecipe.hbs");
  });
  
  // handling POST request to main/addrecipe
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
        res.render("main/recipe-list.hbs");
      })
      .catch(() => {
        next("failed to save recipe");
      });
  });



  //Updates form
router.get('/main/:id/edit', (req, res, next) => {

    let dynamicçId = req.params.id
    RecipeModel.findById(dynamicRecipeId)
      .then ((recipes)=> {
        //pass the drones value to the edit form
        res.render('drones/update-form.hbs', {recipes})
      })
      .catch(()=> {
        next('Cannot find the damn drone details')
      })
  });
  

  router.post('/main/:id/edit', (req, res, next) => {

    let dynamicRecipeId = req.params.id

    const {name, propellers, maxSpeed } = req.body
  
    RecipeModel.findByIdAndUpdate(dynamicRecipeId,{title, ingredients,instructions})
    .then (()=> {
    
      res.redirect('/main')
    })
    .catch (()=>{
      next('Edit failed')
    })
    
    
  });
  
  router.post('/main/:id/delete', (req, res, next) => {

    //create variable for dynamic ID
    let dynamicRecipeId = req.params.id
  
    RecipeModel.findByIdAndDelete(dynamicRecipeId)
      .then(()=>{
        res.redirect('/main')
      })
      .catch(()=>{
        next('Failed to delet recipe')
      })
    
  });



  module.exports = router;