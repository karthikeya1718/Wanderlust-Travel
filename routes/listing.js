//! Restructuing listing routes in a separate file.

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedin, isowner, validatelisting } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js"); //! open listings.js file in controllers folder for more clarity.

const multer = require("multer"); //? multer is used to parse the data and send it to database, for example when you upload photo in a google form it does not directly saved into the database, we need some third paty like cloudinary to store that photo so multer parse that photo format into link to the backend then that photo wii be saved in your cloudinary and then the parsed url wii be saved inside the database.
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage }); //! saves the files in cloudinary

//! index route and create listing route which has same path "/"
router
  .route("/")
  .get(wrapAsync(listingcontroller.index))
  .post(
    isloggedin,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingcontroller.create)
  );

//! New route
router.get("/new", isloggedin, listingcontroller.rendernewform);

//! show route,update route and delete route which has same path
router  
  .route("/:id")
  .get(wrapAsync(listingcontroller.show))
  .put(
    isloggedin,
    isowner,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingcontroller.update)
  )
  .delete(isloggedin, isowner, wrapAsync(listingcontroller.delete));

//! Edit route
router.get("/:id/edit", isloggedin, isowner, wrapAsync(listingcontroller.edit));

//! index route
// router.get("/", wrapAsync(listingcontroller.index));

//! show route
// router.get("/:id", wrapAsync(listingcontroller.show));

//! create route
// router.post(
//   "/",
//   isloggedin,
//   validatelisting,
//   wrapAsync(listingcontroller.create)
// );

//! update route
// router.put(
//   "/:id",
//   isloggedin,
//   isowner,
//   validatelisting,
//   wrapAsync(listingcontroller.update)
// );

//! Delete route
// router.delete("/:id", isloggedin, isowner, wrapAsync(listingcontroller.delete));

module.exports = router;
