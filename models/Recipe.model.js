// const mongoose = require('mongoose')

const { Schema, model } = require("mongoose");
require("./User.model");

// const RecipeSchema = new mongoose.Schema({
//     msgBody: String,
//     userId: {
//         ref: 'user',
//         type: mongoose.Schema.Types.ObjectId
//     }
// })

// const RecipeSchema = new mongoose.Schema({
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
// const RecipeModel = model('recipes', RecipeSchema)

// const RecipeModel = mongoose.model('post', RecipeSchema)

// module.exports = RecipeSchema
module.exports = RecipeModel;