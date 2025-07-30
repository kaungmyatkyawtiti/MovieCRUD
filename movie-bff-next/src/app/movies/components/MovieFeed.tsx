import { getMovieById } from "@/app/api/MovieApi";
import MovieCard from "./MovieCard";
import EditMovie from "./EditMovie";

export default async function MovieFeed({ id }: { id: string }) {
  const movie = await getMovieById(id);

  return (
    <>
      {
        movie &&
        < MovieCard movie={movie} />
      }

      <EditMovie movie={movie} />
    </>
  )
}
