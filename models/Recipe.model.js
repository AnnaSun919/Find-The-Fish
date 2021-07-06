

const { Schema, model } = require("mongoose");
require("./User.model");


const RecipeSchema = new Schema({
   title: String,
   ingredients: String,
   instructions: String,
   recipe: {
     ref: 'user',
     type:Schema.Types.ObjectId
   }



})

const RecipeModel = model('recipes', RecipeSchema)

module.exports = RecipeModel;