const Movies = require("../models/Movie.js");

const getAllMovies = async () => {
  return Movies.find();
}

const getMovieById = async (movieId) => {
  return Movies.findById(movieId);
};

//const searchMovieByTitle = async (movieTitle) => {
//  return Movies.find({
//    title: {
//      $regex: movieTitle,
//      $options: 'i' // this makes the search case-insensitive
//    }
//  });
//}

const searchMovieByTitle = async (movieTitle) => {
  return Movies.find({
    title: {
      $regex: new RegExp(movieTitle, 'i')
    }
  });
}

const searchMovieByYear = async (year) => {
  return Movies.find({
    year: year
  })
}

const saveMovie = async (movie) => {
  const newMovie = new Movies(movie);
  return newMovie.save();
}

// const updateMovieById = async (movieId, movie) => {
//   return Movies.findOneAndReplace(
//     { _id: movieId },  //filter object 
//     movie,
//     {
//       new: true,
//       runValidators: true,
//     }
//   );
// };

const updateMovieById = async (movieId, movie) => {
  return Movies.findByIdAndUpdate(
    movieId,
    movie,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );
}

const deleteMovieById = async (movieId) => {
  return Movies.findByIdAndDelete(movieId);
}

module.exports = {
  getAllMovies,
  getMovieById,
  searchMovieByTitle,
  searchMovieByYear,
  saveMovie,
  updateMovieById,
  deleteMovieById,
}
