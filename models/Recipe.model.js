const { Schema, model } = require("mongoose");
require("./User.model");

const RecipeSchema = new Schema({
  photo: String,
  title: String,
  ingredients: String,
  instructions: String,
  creater: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

const RecipeModel = model("recipes", RecipeSchema);

module.exports = RecipeModel;
