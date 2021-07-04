const { Schema, model } = require("mongoose");

const fishSchema = new Schema({
  habitat: String,
  habitatImpacts: String,
  location: String,
  population: String,
  scientificName: String,
  speciesIllustrationPhoto: String,
  speciesName: String,
  biology: String,
});

const FishModel = model("fish", fishSchema);

module.exports = FishModel;
