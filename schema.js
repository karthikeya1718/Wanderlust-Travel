const joi = require("joi");

module.exports.listingschema = joi.object({
  listing: joi
    .object({
      title: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().required().min(0),
      image: joi.string().allow("", null),
      location: joi.string().required(),
      country: joi.string().required(),
    })
    .required(),
});

module.exports.reviewschema = joi
  .object({
    review: joi.object({
      rating: joi.number().min(0).max(5).required(),
      comment: joi.string().required(),
    }).required(),
  });

