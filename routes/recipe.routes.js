const router = require("express").Router();

const express = require('express');
// const router  = express.Router();

// include CLOUDINARY:
const uploader = require('../middlewares/cloudinary.config.js');

// let UserModel = require("../models/User.model");
// let FishModel = require("../models/Fish.model");
let RecipeModel = require("../models/Recipe.model");


// GET home page
router.get('/recipes', (req, res, next) => {

    RecipeModel.find()
      .then((recipe) => {
          res.render('recipe/recipe-list.hbs', {recipe})
      })
      .catch((err) => {
          next('Find failed')
      })
  });

// handling GET request to main/addrecipe
  router.get("/addrecipe", (req, res) => {
    res.render("recipe/addrecipe.hbs");
  });
  
  // handling POST request to /addrecipe
  router.post("/recipes", (req, res, next) => {
    const {title, ingredients, instructions} = req.body
    const recipe = req.session.loggedInUser._id;
    RecipeModel.create({title, ingredients,instructions,recipe})
      .then(() => {
        res.redirect("/recipes");
      })
      .catch(() => {
        next("failed to save recipe");
      });
  });


  router.get('/recipes/:id', (req,res,next) => {
    let dynamicRecipeId =req.params.id
  
    RecipeModel.findById(dynamicRecipeId)
    .then((recipe)=>{
      res.render('recipe/recipe-details.hbs', {recipe})
    })
    .catch(()=>{
      next('Finding details failed')
    })  
  })
  
  
  //Dynamic Update for form
router.get('/recipes/:id/edit', (req, res, next) => {

    let dynamicRecipeId = req.params.id


    RecipeModel.findById(dynamicRecipeId)
      .then ((recipe)=> {
        //pass the recipe value to the edit form
        res.render('recipe/update-recipe.hbs', {recipe})
      })
      .catch((err)=> {
        next('Cannot find the damn recipe details')
      })
  });
  

//Dynamic POST
  router.post('/recipes/:id/edit', (req, res, next) => {

    let dynamicRecipeId = req.params.id
    const {title, ingredients, instructions} = req.body
  
    RecipeModel.findByIdAndUpdate(dynamicRecipeId,{title, ingredients,instructions})
    .then (()=> {
      res.redirect('/recipes')
    })
    .catch (()=>{
      next('Edit failed')
    })
    
    
  });
  

  //Deletes POST
  router.post('/recipes/:id/delete', (req, res, next) => {

    //create variable for dynamic ID
    let dynamicRecipeId = req.params.id
  
    RecipeModel.findByIdAndDelete(dynamicRecipeId)
      .then(()=>{
        res.redirect('/recipes')
      })
      .catch(()=>{
        next('Failed to delete recipe')
      })
    
  });




  
  // ensure you have an input type like this in your hbs file
  /*
  <form method="POST" action="/upload" enctype="multipart/form-data">
      <input type="file" name="imageUrl" accept="image/png, image/jpg">
      <button type="submit">Submit</button> 
  </form>     
  */
  
  // imageUrl is the input name in your hbs file
  
  
  router.post('/uploadrecipe', uploader.single("imageUrl"), (req, res, next) => {
       console.log('file is: ', req.file)
      if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
      //You will get the image url in 'req.file.path'
      //store that in the DB  
  })

  module.exports = router;