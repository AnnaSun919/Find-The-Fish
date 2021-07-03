require("../db");

const FishModel = require("../models/Fish.model.js");

const axios = require("axios");

axios
  .get("https://www.fishwatch.gov/api/species")
  .then((response) => {
    for (let i = 0; i < response.data.length; i++) {
      let listoffish = response.data[i];

      FishModel.insertMany({
        habitat: listoffish.Habitat,
        habitatImpacts: listoffish["Habitat Impacts"],
        location: listoffish.Location,
        population: listoffish.Population,
        speciesIllustrationPhoto: listoffish["Species Illustration Photo"].src,
        speciesName: listoffish["Species Name"],
        biology: listoffish.Biology,
      });
    }
  })
  .then(() => {
    console.log("fish data added");
  })
  .catch((err) => {
    console.log("Axios BB fetch failed", err);
  });
