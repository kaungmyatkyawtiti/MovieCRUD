import { useQuery } from "@tanstack/react-query"
import { getAllMovies } from "../api/movieApi"

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: getAllMovies,
  })
}
