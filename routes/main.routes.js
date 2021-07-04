const router = require("express").Router();
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");

//asscess profile
router.get("/profile", (req, res, nex) => {
  if (req.session.loggedInUser) {
    res.render("main/profile.hbs", { name: req.session.loggedInUser.username });
  } else {
    res.redirect("/login");
  }
});
//home page displaying six fish
router.get("/fish/:id", (req, res, next) => {
  let id = req.params.id;
  console.log(id);

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

router.get("/fish/createfirsh", (req, res, next) => {
  res.render("main/fishdetails.hbs");
});

module.exports = router;
