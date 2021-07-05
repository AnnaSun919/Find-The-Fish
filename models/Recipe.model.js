const { Schema, model } = require("mongoose");
require("./User.model");

// const RecipeSchema = new mongoose.Schema({
//     msgBody: String,
//     userId: {
//         ref: 'user',
//         type: mongoose.Schema.Types.ObjectId
//     }
// })


const RecipeSchema = new Schema({
   title: String,
   prepTime: String,
   cookTime: String,
   servings: String,
   ingredients: String,
   instructions: String,




})

const RecipeModel = model('post', RecipeSchema)

// const RecipeModel = mongoose.model('post', RecipeSchema)

module.exports = RecipeSchema