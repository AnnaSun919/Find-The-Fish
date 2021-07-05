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
  let id = req.session.loggedInUser._id;

  FishModel.find({ fisher: id })
    .then((fish) => {
      res.render("main/profile.hbs", { name, fish });
    })
    .catch((err) => {
      next(err);
    });
});

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
        req.app.locals.isCreatedbyUser = false;
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
    .then((fish) => {})
    .catch((err) => {
      console.log(err);
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

router.post("/fish/:id/edit", loginCheck(), (req, res, next) => {
  let id = req.params.id;

  const {
    habitat,
    location,
    population,
    scientificName,
    speciesIllustrationPhoto,
    speciesName,
    biology,
  } = req.body;

  FishModel.findByIdAndUpdate(id, {
    habitat,
    location,
    population,
    scientificName,
    speciesIllustrationPhoto,
    speciesName,
    biology,
  })
    .then(() => {
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log(err);
      next("Edit failed");
    });
});

router.post("/fish/:id/delete", (req, res, next) => {
  let id = req.params.id;

  FishModel.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/profile");
    })
    .catch(() => {
      next("failed to delete");
    });
});

module.exports = router;
