//check login function
const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.loggedInUser) {
      next();
    } else {
      res.redirect("/login");
    }
  };
};

module.exports = { loginCheck };
