const router = require("express").Router();

/* GET home page */
router.get("/signin", (req, res, next) => {
  res.render("./auth/signin.hbs");
});

router.get("/signup", (req, res, next) => {
    res.render("./auth/signup.hbs");
  });

module.exports = router;
