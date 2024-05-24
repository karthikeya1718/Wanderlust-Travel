const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveredirecturl } = require("../middleware.js");

const usercontroller = require("../controllers/users.js");

//! combining routes which has same path
router
  .route("/signup")
  .get(usercontroller.rendersignupform)
  .post(wrapAsync(usercontroller.savesignupformdata));

router
  .route("/login")
  .get(usercontroller.renderloginform)
  .post(
    saveredirecturl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usercontroller.saveloginformdata
  );

//!signup form route
// router.get("/signup", usercontroller.rendersignupform);

//! signup post route
// router.post("/signup", wrapAsync(usercontroller.savesignupformdata));

//! login form route
// router.get("/login", usercontroller.renderloginform);

//! login post route
// router.post(
//   "/login",
//   saveredirecturl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   usercontroller.saveloginformdata
// );

router.get("/logout", usercontroller.logout);
module.exports = router;
