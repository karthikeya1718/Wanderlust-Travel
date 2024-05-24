//! Restructuring review routes in a separate file
const express = require("express");
const router = express.Router({ mergeParams: true }); //! it will merge the id from app.js file to review.js file
const wrapAsync = require("../utils/wrapAsync.js");
const reviewcontroller = require("../controllers/reviews.js");
const {
  validatereview,
  isloggedin,
  isreviewauthor,
} = require("../middleware.js");

//? REVIEWS
//! post route
router.post(
  "/",
  isloggedin,
  validatereview,
  wrapAsync(reviewcontroller.createreview)
);

//! Deleting the review
router.delete(
  "/:reviewId",
  isloggedin,
  isreviewauthor,
  wrapAsync(reviewcontroller.deletereview)
);

module.exports = router;
