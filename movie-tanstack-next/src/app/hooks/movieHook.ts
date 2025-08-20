import { useMutation, useQuery } from "@tanstack/react-query"
import { apiDeleteMovieById, apiGetAllMovies, apiSaveMovie, apiUpdateMovieById } from "./api/movieApi"
import { queryClient } from "./queryClient";
import { Movie, NewMovie } from "@/types/movie";
import { log, logError } from "@/utils/logger";

export const useGetAllMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: apiGetAllMovies,
    refetchOnWindowFocus: false,
  })
}

// export const useMovieById = (movieId: string) => {
//   return useQuery({
//     queryKey: ['movies', movieId],
//     queryFn: () => getMovieById(movieId),
//   });
// };

export const useGetMovieById = (movieId: string) => {
  const data = queryClient.getQueryData<Movie[]>(['movies']);
  return data?.find(movie => movie._id === movieId);
};

export const useMutationSaveMovie = () => {
  return useMutation({
    mutationFn: (movie: NewMovie) => apiSaveMovie(movie),

    onSuccess: async (savedMovie: NewMovie) => {
      log("I'm onSuccess!", savedMovie);

      queryClient.setQueriesData(
        { queryKey: ["movies"] },
        (oldState: Movie[]) => [...oldState, savedMovie]
      )
    },
    onSettled: async () => {
      log("I'm onSettled!")
    },
  });
}

export const useMutationUpdateMovieById = () => {
  return useMutation({
    mutationFn: (movie: Movie) => apiUpdateMovieById(movie),

    onSuccess: async (updatedMovie: Movie) => {
      log("I'm onSuccess!", updatedMovie);

      queryClient.setQueriesData(
        { queryKey: ["movies"] },
        (oldState: Movie[]) => oldState.map(m => m._id == updatedMovie._id ? updatedMovie : m)
      )
    },

    onSettled: async () => {
      log("I'm onSettled!")
    },
  });
}

// Pessimistic Update
// export const useMutationDeleteMovieById = () => {
//   return useMutation({
//     mutationFn: (movie: Movie) => apiDeleteMovieById(movie._id),
//
//     onSuccess: async (deletedMovie: Movie) => {
//       log("I'm onSuccess!", deletedMovie);
//
//       // queryClient.invalidateQueries({ queryKey: ["movies"] });
//       queryClient.setQueriesData(
//         { queryKey: ["movies"] },
//         (oldState: Movie[]) => oldState.filter(m => m._id != deletedMovie._id)
//       )
//     },
//
//     onSettled: async () => {
//       log("I'm onSettled!")
//     },
//   });
// }

// Optimistic Update
export const useMutationDeleteMovieById = () => {
  return useMutation({
    mutationFn: (movie: Movie) => apiDeleteMovieById(movie._id),

    onMutate: (movie: Movie) => {
      log("onMutate", movie._id);

      const oldState = queryClient.getQueryData(["movies"]);

      queryClient.setQueriesData(
        { queryKey: ["movies"] },
        (oldState: Movie[]) => oldState.filter(m => m._id != movie._id)
      )

      return { oldState };
    },

    onSuccess: async (deletedMovie: Movie) => {
      log("I'm onSuccess!", deletedMovie);
    },

    onSettled: async () => {
      log("I'm onSettled!")
    },

    onError: (error, movie, context) => {
      logError(error);
      queryClient.setQueryData(["movies"], context?.oldState);
    }
  });
}
