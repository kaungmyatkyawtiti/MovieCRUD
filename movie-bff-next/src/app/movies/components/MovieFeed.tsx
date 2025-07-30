import { getMovieById } from "@/app/api/movieApi";
import EditMovie from "./EditMovie";
import MovieCard from "./MovieCard";

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
