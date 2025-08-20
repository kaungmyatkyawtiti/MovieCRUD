const express = require("express");
const router = express.Router();
const movies = require("../controllers/movieController.js");

router.get("/", movies.getAllMovies);
router.get("/:id", movies.getMovieById);
router.get("/title/:title", movies.searchMovieByTitle);
router.get("/year/:year", movies.searchMovieByYear);
router.post("/", movies.saveMovie);
router.put("/:id", movies.updateMovieById);
router.delete("/:id", movies.deleteMovieById);

module.exports = router;

