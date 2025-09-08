'use client';

import { Movie } from "@/app/types/movies";
import InteractiveMovieCard from "./InteractiveMovieCard"

interface MovieListProps {
  movies: Movie[];
}
export default function MovieList({ movies }: MovieListProps) {
  return (
    <>
      {
        movies.map(movie => <InteractiveMovieCard key={movie._id} movie={movie} />)
      }
    </>
  )
}
