const router = require("express").Router();
let bcrypt = require("bcryptjs");
let UserModel = require("../models/User.model");
let FishModel = require("../models/Fish.model");
const uploader = require("../middlewares/cloudinary.config.js");

/* GET home page */
router.get("/login", (req, res, next) => {
  res.render("./auth/login.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("./auth/signup.hbs");
});

router.post("/signup", uploader.single("imagePath"), (req, res, next) => {
  const { username, password } = req.body;

  const defaultUserImage =
    "https://res.cloudinary.com/dtjxpedls/image/upload/v1625579445/uhqx9pvj5uzkrtnqp7fx.jpg";
  let imagePath = req.file ? req.file.url : defaultUserImage;

  if (!username || !password) {
    res.render("auth/signup.hbs", { error: "Please enter all fields" });
    //to tell JS to come our off this function
    return;
  }

  let regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!regularExpression.test(password)) {
    res.render("./auth/signup.hbs", {
      error:
        "Invalid password, the valid password should have 6-16 characters and with at least one speail character",
    });
    // To tell JS to come out off this function
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  UserModel.create({ username, password: hash, profilePic: imagePath })
    .then(() => res.redirect("/"))
    .catch((err) => {
      next(err);
    });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  UserModel.findOne({ username })
    .then((user) => {
      if (user) {
        let isValide = bcrypt.compareSync(password, user.password);
        if (isValide) {
          console.log("11111111");
          req.session.loggedInUser = user;
          req.app.locals.isLoggedIn = true;
          res.redirect("/profile");
        } else {
          console.log("22222222");
          res.render("./auth/login.hbs", {
            error: "Invalid password",
          });
        }
      } else {
        console.log("33333333");
        res.render("./auth/login.hbs", { error: "No user" });
      }
    })
    .catch((err) => {
      console.log("444444444");
      next(err);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();

  req.app.locals.isLoggedIn = false;
  res.redirect("/");
});

router.get("/profile", (req, res, nex) => {
  if ((req.app.locals.isLoggedIn = true)) {
    let id = req.session.loggedInUser._id;
    let user = req.session.loggedInUser;

    FishModel.find({ fisher: id })
      .then((fish) => {
        res.render("main/profile.hbs", { user, fish });
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.redirect("/login");
  }
});

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
  // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return
  UserModel.findByIdAndUpdate(req.session.loggedInUser._id, {
    profilePic: req.file.path,
  })
    .then((user) => {
      req.session.loggedInUser = user;
      console.log(req.session);
      res.redirect("/profile");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
