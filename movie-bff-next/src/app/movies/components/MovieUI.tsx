import { Box, Stack } from "@mui/material";
import { Movie } from "@/app/types/movies";
import InteractiveMovieCard from "./InterActiveMovieCard";

interface MovieUIProps {
  movies: Movie[];
}

export default async function MovieUI({
  movies
}: MovieUIProps) {

  return (
    <Box sx={{ py: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center" // or "center" 
      >
        {
          movies.map(movie => <InteractiveMovieCard
            key={movie._id}
            movie={movie}
            linkToDetail={true}
          />
          )
        }
      </Stack>
    </Box>
  )
}
