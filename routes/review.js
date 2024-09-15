const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapaAsync.js");
const Expresserror = require("../utils/Expresserror.js");
//const {listingSchema, reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");
const { deleteListing } = require("../controllers/listing.js");

// reviews route post route
router.post("/",
  isLoggedIn,
    validateReview,
     wrapAsync(reviewController.createReview));
  
  //Delete review route
  router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

  module.exports = router;
  