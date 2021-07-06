const { Schema, model } = require("mongoose");
require("./User.model");

const fishSchema = new Schema({
  speciesName: String,
  scientificName: String,
  avalibility: String,
  location: String,
  biology: String,
  speciesIllustrationPhoto: String,
  fisher: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

const FishModel = model("fish", fishSchema);

module.exports = FishModel;
