'use client';

import { Movie } from "@/types/movie";
import InteractiveMovieCard from "./InterActiveMovieCard";

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
