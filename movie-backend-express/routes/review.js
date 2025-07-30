const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviewController.js");

router.get("/", reviews.getAllReviews);
router.get("/:id", reviews.getReviewById);
router.get("/movie/:id", reviews.getReviewByMovieId);
router.post("/", reviews.saveReview);
router.put("/:id", reviews.updateReviewById);
router.delete("/:id", reviews.deleteReviewById);

module.exports = router;
