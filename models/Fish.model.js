const { Schema, model } = require("mongoose");
require("./User.model");

const fishSchema = new Schema({
  habitat: String,
  habitatImpacts: String,
  location: String,
  population: String,
  scientificName: String,
  speciesIllustrationPhoto: String,
  speciesName: String,
  biology: String,
  fisher: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

const FishModel = model("fish", fishSchema);

module.exports = FishModel;
