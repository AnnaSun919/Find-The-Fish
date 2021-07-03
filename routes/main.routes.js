const router = require("express").Router();
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");

router.get("/profile", (req, res, nex) => {
  if (req.session.loggedInUser) {
    res.render("main/profile.hbs", { name: req.session.loggedInUser.username });
  } else {
    res.redirect("/login");
  }
});

router.get("/fish/:id", (req, res, next) => {
  let id = req.params.id;
  console.log(id);

  FishModel.findById(id)
    .then((fish) => {
      res.render("main/fishdetails.hbs", { fish });
      console.log(fish);
    })
    .catch(() => {
      next("find no fish");
    });
});

module.exports = router;
