const reviewService = require("../services/reviewService.js");
const mongoose = require("mongoose");
const { handleAsync } = require("./movieController.js");
const { log, logError } = require("../utils/logger.js");

// --- Validators ---
const customValidator =
  (predicate, status, message) =>
    (value, res, customMessage) =>
      predicate(value)
        ? (res.status(status).json({ error: customMessage || message }), true)
        : false;

// objectId validator 
const isInvalid = id => !mongoose.Types.ObjectId.isValid(id);

const validateObjectId = customValidator(
  isInvalid,
  400,
  "Invalid movie ID format"
);

// empty or not found validator
const isEmpty =
  data =>
    data == null ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === 'object' && Object.keys(data).length === 0);

const validateEmptyOrNotFound = customValidator(
  isEmpty,
  404,
  "No data found"
);

// delay logic code
const waitFor = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

const getAllReviews = handleAsync(async (req, res, next) => {
  const reviews = await reviewService.getAllReviews();

  console.log("res ", res.status);
  if (validateEmptyOrNotFound(reviews, res, "No reviews fonnd")) return;

  res.status(200).json({ message: "success", data: reviews });
});

const getReviewById = handleAsync(async (req, res, next) => {
  const { id: reviewId } = req.params;

  if (validateObjectId(reviewId, res)) return;

  const review = await reviewService.getReviewById(reviewId);

  if (validateEmptyOrNotFound(review, res, `reviewId ${reviewId} is not found`)) return;

  res.status(200).json({ message: "success", data: review });
});

const getReviewByMovieId = handleAsync(async (req, res, next) => {
  await waitFor(5000);
  const { id: movieId } = req.params;

  if (validateObjectId(movieId, res)) return;

  const review = await reviewService.getReviewByMovieId(movieId);

  // if (validateEmptyOrNotFound(review, res, `movieId ${movieId} is not found`)) return;

  res.status(200).json({ message: "success", data: review });
});

const saveReview = handleAsync(async (req, res, nextx) => {
  await waitFor(5000);
  const review = req.body;

  if (validateEmptyOrNotFound(review, res, "no review found to save")) return;

  const newReview = await reviewService.saveReview(review);

  res.status(201).json({ message: "success", data: newReview });
});

const updateReviewById = handleAsync(async (req, res, next) => {
  await waitFor(5000);
  const { id: reviewId } = req.params;

  if (validateObjectId(reviewId, res)) return;

  const review = req.body;

  if (validateEmptyOrNotFound(review, res, "No review found to update")) return;

  const updated = await reviewService.updateReviewById(reviewId, review);

  res.status(200).json({ message: "success", data: updated });
});

const deleteReviewById = handleAsync(async (req, res, next) => {
  await waitFor(5000);
  const { id: reviewId } = req.params;

  if (validateObjectId(reviewId, res)) return;

  const deleted = await reviewService.deleteReviewById(reviewId);
  console.log("deleted ", deleted);
  if (validateEmptyOrNotFound(deleted, res, `reviewId ${reviewId} not found to delete`)) return;

  res.status(200).json({ message: "success", data: deleted });
});

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewByMovieId,
  saveReview,
  updateReviewById,
  deleteReviewById,
}
