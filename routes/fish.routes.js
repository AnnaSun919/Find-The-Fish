const router = require("express").Router();
const axios = require("axios");
const FishModel = require("../models/Fish.model");

router.get("/fish", (req, res, next) => {
  const json = JSON.stringify(req.query);
  console.log(`hihi  ${json}`);
  axios
    .get(`https://www.fishwatch.gov/api/species`)
    .then((response) => {
      let listoffish = response.data;
      let fishphoto = listoffish[0]["Species Illustration Photo"].src;

      res.render("main/fish.hbs", { fishphoto });

      // FishModel.create({
      //   habitat: listoffish[0].Habitat,
      //   habitatImpacts: listoffish[0]["Habitat Impacts"],
      //   location: listoffish[0].Location,
      //   population: listoffish[0].Population,
      //   scientificName: listoffish[0]["Scientific Name"],
      //   speciesIllustrationPhoto:
      //     listoffish[0]["Species Illustration Photo"].src,
      //   speciesName: listoffish[0]["Species Name"],
      //   biology: listoffish[0].Biology,
      // });
    })
    .catch((err) => {
      console.log(err);
      next("fish api fails");
    });
});

// ${req.query.species}

router.get("/profile", (req, res, next) => {
  res.render;
});

module.exports = router;
