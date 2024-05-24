const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const alllistings = await listing.find({});
  res.render("listings/index.ejs", { alllistings });
};

module.exports.rendernewform = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const list = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!list) {
    req.flash("error", "Listing you requested for does not exists");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { list });
};

module.exports.create = async (req, res) => {
  // console.log(req.body);
  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  await newlisting.save();
  req.flash("success", "New listing created");
  res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
  let { id } = req.params;
  const list = await listing.findById(id);
  if (!list) {
    req.flash("error", "Listing you requested to edit does not exists");
    res.redirect("/listings");
  }
  let originalimgurl = list.image.url;
  originalimgurl = originalimgurl.replace("/upload","/upload/w_350")

  res.render("listings/edit.ejs", { list, originalimgurl });
};

module.exports.update = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    list.image = { url, filename };
    await list.save();
  }
  req.flash("success", " Listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};
