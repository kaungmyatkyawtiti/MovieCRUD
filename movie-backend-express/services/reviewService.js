const Reviews = require("../models/Review.js");
const mongoose = require("mongoose");

const getAllReviews = async () =>
  Reviews.find();

const getReviewById = async (reviewId) =>
  Reviews.findById(reviewId).populate("movie");

const getReviewByMovieId = async (movieId) =>
  Reviews.find({ movie: movieId }).populate("movie");

const saveReview = async ({ movie, rating, review }) => {
  const saved = await new Reviews({ movie, rating, review }).save();
  // return saved.populate("movie");
  return saved;
};

const updateReviewById = async (reviewId, review) => {
  const updated = await Reviews.findByIdAndUpdate(
    reviewId,
    { ...review, movie: new mongoose.Types.ObjectId(review.movie) },
    { new: true }
  );
  return updated.populate("movie");
};

const deleteReviewById = async (reviewId) =>
  Reviews.findByIdAndDelete(reviewId);

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewByMovieId,
  saveReview,
  updateReviewById,
  deleteReviewById,
}
