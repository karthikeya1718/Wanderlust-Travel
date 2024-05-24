const user = require("../models/user");

module.exports.rendersignupform = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.savesignupformdata = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newuser = new user({ username, email });
    const registereduser = await user.register(newuser, password);
    console.log(registereduser);
    req.login(registereduser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User was registerd successfully");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderloginform = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.saveloginformdata = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirecturl = res.locals.redirecturl || "/listings";
  res.redirect(redirecturl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are successfully logged out!");
    res.redirect("/listings");
  });
};
