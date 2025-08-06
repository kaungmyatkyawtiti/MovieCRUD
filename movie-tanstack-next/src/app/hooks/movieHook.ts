import { useMutation, useQuery } from "@tanstack/react-query"
import { apiDeleteMovieById, apiGetAllMovies } from "../api/movieApi"
import { queryClient } from "./queryClient";
import { Movie } from "@/types/movie";

export const useGetAllMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: apiGetAllMovies,
    refetchOnWindowFocus: false,
  })
}

// export const useMovieById = (movieId: string) => {
//   return useQuery({
//     queryKey: ['movieById', movieId],
//     queryFn: () => getMovieById(movieId),
//   });
// };

export const useGetMovieById = (movieId: string) => {
  const data = queryClient.getQueryData<Movie[]>(['movies']);
  return data?.find(movie => movie._id === movieId);
};

export const useMutationDeleteMovieById = () => {
  return useMutation({
    mutationFn: (movie: Movie) => apiDeleteMovieById(movie._id),
    onSuccess: async () => {
      console.log("I'm onSuccess!");
    },
    onSettled: async () => {
      console.log("I'm onSettled!")
    },
  });
}
