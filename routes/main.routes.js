const router = require("express").Router();
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");

//asscess profile

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.loggedInUser) {
      next();
    } else {
      res.redirect("/login");
    }
  };
};

router.get("/profile", loginCheck(), (req, res, nex) => {
  let name = req.session.loggedInUser.username;

  FishModel.find({})
    .populate("userId")
    .then((fish) => {
      res.render("main/profile.hbs", { name });
    })
    .catch((err) => {
      next(err);
    });
});
//home page displaying six fish
router.get("/fish/:id", (req, res, next) => {
  let id = req.params.id;

  FishModel.findById(id)
    .then((fish) => {
      res.render("main/fishdetails.hbs", { fish });
    })
    .catch(() => {
      next("find no fish");
    });
});

//search bar
router.get("/search", (req, res, next) => {
  let searchinput = req.query.searchthefish;

  if (!searchinput) {
    FishModel.find({}, "speciesIllustrationPhoto")
      .then((fish) => {
        res.render("main/searchresults.hbs", { fish });
      })
      .catch(() => {
        next("find no fish");
      });
  } else {
    FishModel.find({ speciesName: new RegExp(searchinput) })

      .then((fish) => {
        if (fish.length === 0) {
          res.render("main/searchresults.hbs", {
            error: "Cannot find the fish, Pleae help us build our database by ",
          });

          return;
        }

        res.render("main/searchresults.hbs", { fish });
      })
      .catch(() => {
        next("find no fish");
      });
  }
});

router.get("/createfish", loginCheck(), (req, res) => {
  res.render("main/createfish.hbs");
});

router.post("/createfish", (req, res, next) => {
  const {
    habitat,
    location,
    population,
    scientificName,
    speciesIllustrationPhoto,
    speciesName,
    biology,
  } = req.body;

  const fisher = req.session.loggedInUser._id;
  FishModel.create({
    habitat,
    location,
    population,
    scientificName,
    speciesIllustrationPhoto,
    speciesName,
    biology,
    fisher,
  })
    .then(() => {
      res.render("main/createfish.hbs");
    })
    .catch(() => {
      next();
    });
});

module.exports = router;
