const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(), // Use 'Joi' with a capital 'J' and 'required()'
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null)
    }).required()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
      rating: Joi.number().required().min(1).max(5),
      comment: Joi.string().required(),
    }).required()
  })










// Corrected export
// module.exports = { listingSchema };

// const Joi = require('joi'); // Import Joi
// const review = require('./models/review');

// // Define your Joi schema
// const listingSchema = Joi.object({
//   listing: Joi.object({
//     title: Joi.string().required(),
//     price: Joi.number().required().min(0),
//     description: Joi.string().required(),
//     location: Joi.string().required(),
//   }).required(),
// });

// // module.exports = listingSchema;

