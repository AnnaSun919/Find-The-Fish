const router = require("express").Router();

/* GET home page */
router.get("/login", (req, res, next) => {
  res.render("./auth/login.hbs");
});
  
router.get("/signup", (req, res, next) => {
    res.render("./auth/signup.hbs");
  });

module.exports = router;

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
    res.render("auth/signup.hbs", {
      error: "special charater , a number  and 6-16 characters",
    });
    // To tell JS to come out off this function
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  UserModel.create({ username, email, password: hash })
    .then(() => res.redirect("/"))
    .catch((err) => {
      next(err);
    });
});
