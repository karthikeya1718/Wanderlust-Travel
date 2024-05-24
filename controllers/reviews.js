const listing = require("../models/listing.js");
const review = require("../models/review.js");

module.exports.createreview = async (req, res) => {
  let list = await listing.findById(req.params.id);
  // console.log(req.body.review);
  let newreview = new review(req.body.review);
  newreview.author = req.user._id;
  list.reviews.push(newreview);
  await newreview.save();
  await list.save();
  req.flash("success", "New review created");

  res.redirect(`/listings/${list.id}`);
};

module.exports.deletereview = async (req, res) => {
  let { id, reviewId } = req.params;
  let ReviewId = reviewId.trim();
  // console.log(ReviewId);
  await listing.findByIdAndUpdate(id, {
    $pull: { reviews: ReviewId }, //! $pull helps to remove the reviews that matches the reviewid  from reviews array from listings schema.
  });
  await review.findByIdAndDelete(ReviewId);
  req.flash("success", "Review deleted");
  res.redirect(`/listings/${id}`);
};
