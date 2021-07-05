const router = require("express").Router();
let bcrypt = require("bcryptjs");
let UserModel = require("../models/User.model");

/* GET home page */
router.get("/login", (req, res, next) => {
  res.render("./auth/login.hbs");
});

router.get("/signup", (req, res, next) => {
  res.render("./auth/signup.hbs");
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

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

  UserModel.create({ username, password: hash })
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
          req.session.loggedInUser = user;
          req.app.locals.isLoggedIn = true;
          res.redirect("/profile");
        } else {
          res.render("./auth/login.hbs", {
            error: "Invalid password",
          });
        }
      } else {
        res.render("./auth/login.hbs", { error: "No user" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();

  req.app.locals.isLoggedIn = false;
  res.redirect("/");
});

module.exports = router;
