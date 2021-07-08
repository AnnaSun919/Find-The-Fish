

const { Schema, model } = require("mongoose");
require("./User.model");


const RecipeSchema = new Schema({
   title: String,
   ingredients: String,
   instructions: String,
   recipe: {
     ref: 'user',
     type:Schema.Types.ObjectId
   },
   recipePic: {
    type: String,
    default:"https://www.clipartmax.com/png/middle/439-4391307_433-x-512-2-fork-knife-logo-png.png"
  },



})

const RecipeModel = model('recipes', RecipeSchema)

module.exports = RecipeModel;