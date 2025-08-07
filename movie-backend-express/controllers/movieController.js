const mongoose = require("mongoose");
const movieService = require("../services/movieService.js");
const { log, logError } = require("../utils/logger.js");

// --- Async Handler Wrapper ---
const handleAsync = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error("Error:", error);

    return error instanceof mongoose.Error.ValidationError
      ? res.status(400).json({
        error: {
          message: error.message,
          name: error.name
        },
      })
      : res.status(500).json({
        error: {
          message: error.message || "Internal server error",
          name: error.name || "UnknownError",
        },
      });
  }
};

// --- Validators ---
const customValidator =
  (predicate, status, message) =>
    (value, res, customMessage) =>
      predicate(value)
        ? (res.status(status).json({ error: customMessage || message }), true)
        : false;

// object validator
const isInvalid = id => !mongoose.Types.ObjectId.isValid(id);

const validateObjectId = customValidator(
  isInvalid,
  400,
  "Invalid movie ID format"
);

// empty or not found validator 
const isEmptyOrNotFound = data =>
  data == null ||
  (Array.isArray(data) && data.length === 0) ||
  (typeof data === 'object' && Object.keys(data).length === 0);

const validateEmptyOrNotFound = customValidator(
  isEmptyOrNotFound,
  404,
  "No data found"
);

// delay logic code
const waitFor = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

// --- Controller Logic ---
const getAllMovies = handleAsync(async (req, res) => {
  const movies = await movieService.getAllMovies();

  res.status(200).json({ message: "success", data: movies });
});

const getMovieById = handleAsync(async (req, res) => {
  const { id: movieId } = req.params;

  if (validateObjectId(movieId, res)) return;

  const movie = await movieService.getMovieById(movieId);

  if (validateEmptyOrNotFound(movie, res, `Movie ID ${movieId} not found`)) return;

  res.status(200).json({ message: "success", data: movie });
});

const searchMovieByTitle = handleAsync(async (req, res) => {
  const { title: movieTitle } = req.params;

  const results = await movieService.searchMovieByTitle(movieTitle);

  if (validateEmptyOrNotFound(results, res, "No movies found with that title")) return;

  res.status(200).json({ message: "success", data: results });
});

const searchMovieByYear = handleAsync(async (req, res) => {
  const { year: movieYear } = req.params;

  if (!movieYear || !/^\d{4}$/.test(movieYear)) {
    return res.status(400).json({ error: "Invalid year format" });
  }
  const results = await movieService.searchMovieByYear(movieYear);

  if (validateEmptyOrNotFound(results, res, "No movies found from that year")) return;

  res.status(200).json({ message: "success", data: results });
});

const saveMovie = handleAsync(async (req, res) => {
  await waitFor(5000);
  const movie = req.body;
  // log("movie", movie);
  //  if (validateEmptyOrNotFound(movie, res, "no movie to save")) return;

  const saved = await movieService.saveMovie(movie);

  res.status(201).json({ message: "success", data: saved });
});

const updateMovieById = handleAsync(async (req, res) => {
  await waitFor(5000);
  const { id: movieId } = req.params;

  if (validateObjectId(movieId, res)) return;

  const movie = req.body;
  // log("movie ", movie);

  // if (validateEmptyOrNotFound(movie, res, "Movie not found for update")) return;

  const updated = await movieService.updateMovieById(movieId, movie);
  //  log(updated);

  res.status(200).json({ message: "success", data: updated });
});

const deleteMovieById = handleAsync(async (req, res) => {
  await waitFor(5000);
  const { id: movieId } = req.params;

  if (validateObjectId(movieId, res)) return;

  const deleted = await movieService.deleteMovieById(movieId);

  if (validateEmptyOrNotFound(deleted, res, "Movie not found for deletion")) return;

  res.status(200).json({ message: "success", data: deleted });
});

// --- Export ---
module.exports = {
  handleAsync,
  getAllMovies,
  getMovieById,
  searchMovieByTitle,
  searchMovieByYear,
  saveMovie,
  updateMovieById,
  deleteMovieById,
};
