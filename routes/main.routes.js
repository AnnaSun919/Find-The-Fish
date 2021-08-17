const router = require("express").Router();
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");
let RecipeModel = require("../models/Recipe.model");
const uploader = require("../middlewares/cloudinary.config.js");
const { loginCheck } = require("../middlewares/helper");

router.get("/fish", (req, res, next) => {
  FishModel.find()
    .then((fish) => {
      res.render("main/fish-list.hbs", { fish });
    })
    .catch((err) => {
      next("Find failed");
    });
});

//fish
router.get("/fish/:id", (req, res, next) => {
  let id = req.params.id;

  FishModel.findById(id)
    .populate("fisher")
    .then((fish) => {
      if (!fish.fisher) {
        req.app.locals.isCreatedbyUser = false;
        req.app.locals.isCreator = false;
        res.render("main/fishdetails.hbs", { fish });
      } else if (!req.session.loggedInUser) {
        req.app.locals.isCreator = false;
        res.render("main/fishdetails.hbs", { fish });
      } else if (fish.fisher._id.toString() === req.session.loggedInUser._id) {
        req.app.locals.isCreator = true;
        req.app.locals.isCreatedbyUser = true;
        console.log("else if");
        res.render("main/fishdetails.hbs", { fish });
      } else {
        req.app.locals.isCreator = false;
        req.app.locals.isCreatedbyUser = true;
        res.render("main/fishdetails.hbs", { fish });
      }

      // if (fish.fisher._id === userid) {
      //   req.app.locals.isCreator = true;
      //   res.render("main/fishdetails.hbs", { fish });
      // } else {
      //   res.render("main/fishdetails.hbs", { fish });
      // }
    })
    .catch((err) => {
      console.log(err);
      next("find no fish");
    });
});

//search bar
router.get("/search", (req, res, next) => {
  let searchinput = req.query.searchthefish;
  const option = req.query.selection;
  console.log(option);
  if (option === "Fish") {
    if (!searchinput) {
      FishModel.find({})
        .then((fish) => {
          res.render("main/searchresults.hbs", { fish });
        })
        .catch(() => {
          next("find no fish");
        });
    } else {
      FishModel.find({ speciesName: new RegExp(searchinput, "gi") })

        .then((fish) => {
          if (fish.length === 0) {
            res.render("main/searchresults.hbs", {
              error:
                "Cannot find the fish, Pleae help us build our database by ",
            });

            return;
          }

          res.render("main/searchresults.hbs", { fish });
        })
        .catch(() => {
          next("find no fish");
        });
    }
  }

  if (option === "Recipes") {
    if (!searchinput) {
      RecipeModel.find({})
        .then((recipe) => {
          res.render("main/searchresults.hbs", { recipe });
        })
        .catch(() => {
          next("find no fish");
        });
    } else {
      RecipeModel.find({ title: new RegExp(searchinput, "gi") })

        .then((recipe) => {
          if (recipe.length === 0) {
            res.render("main/searchresults.hbs", {
              error: "Oops, Cannot find the recipe.",
            });

            return;
          }

          res.render("main/searchresults.hbs", { recipe });
        })
        .catch(() => {
          next("find no recipe");
        });
    }
  }
});

router.get(
  "/createfish",
  loginCheck(),

  (req, res) => {
    res.render("main/createfish.hbs");
  }
);

router.post(
  "/createfish",
  uploader.single("speciesIllustrationPhoto"),
  (req, res, next) => {
    const defaultFishImage =
      "https://res.cloudinary.com/dtjxpedls/image/upload/v1625579445/uhqx9pvj5uzkrtnqp7fx.jpg";
    let speciesIllustrationPhoto = req.file ? req.file.path : defaultFishImage;
    const { speciesName, scientificName, avalibility, location, biology } =
      req.body;

    console.log(req.file);

    const fisher = req.session.loggedInUser._id;
    FishModel.create({
      speciesIllustrationPhoto,
      speciesName,
      scientificName,
      avalibility,
      location,
      biology,
      fisher,
    })
      .then(() => {
        res.render("main/createfish.hbs");
      })
      .catch(() => {
        next();
      });
  }
);

router.get("/fish/:id/edit", loginCheck(), (req, res) => {
  let id = req.params.id;

  FishModel.findById(id)
    .then((fish) => {
      res.render("main/editfish.hbs", { fish });
    })
    .catch(() => {
      next("Cannot find fish");
    });
});

router.post(
  "/fish/:id/edit",
  loginCheck(),
  uploader.single("speciesIllustrationPhoto"),
  (req, res, next) => {
    let id = req.params.id;

    const speciesIllustrationPhoto = req.file.path;

    const { speciesName, scientificName, avalibility, location, biology } =
      req.body;

    console.log(speciesIllustrationPhoto);

    FishModel.findByIdAndUpdate(id, {
      speciesIllustrationPhoto,
      speciesName,
      scientificName,
      avalibility,
      location,
      biology,
    })
      .then(() => {
        res.redirect("/profile");
      })
      .catch((err) => {
        console.log(err);
        next("Edit failed");
      });
  }
);

router.post("/fish/:id/delete", loginCheck(), (req, res, next) => {
  let id = req.params.id;

  FishModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/profile");
    })
    .catch(() => {
      next("failed to delete");
    });
});

router.get("/generalinfo", (req, res, next) => {
  res.render("./main/generalinfo.hbs");
});

module.exports = router;
