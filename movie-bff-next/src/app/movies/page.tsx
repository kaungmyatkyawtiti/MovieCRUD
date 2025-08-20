import { Box, Stack, Typography } from "@mui/material";
import { getAllMovies } from "../api/movieApi";
import MovieEntry from "./components/MovieEntry";
import MovieUI from "./components/MovieUI";
import { log } from "../utils/logger";

export default async function MoviePage() {
  const movies = await getAllMovies();
  log(movies);

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
          🎬 My Movie Collections
        </Typography>

        {/* <Button */}
        {/*   variant="outlined" */}
        {/*   size="small" */}
        {/*   startIcon={ */}
        {/*     isFetching */}
        {/*       ? <CircularProgress size={16} color="inherit" /> */}
        {/*       : <RefreshIcon /> */}
        {/*   } */}
        {/*   onClick={refreshHandler} */}
        {/*   sx={{ */}
        {/*     textTransform: 'none', */}
        {/*     fontWeight: 500, */}
        {/*   }} */}
        {/* > */}
        {/*   { */}
        {/*     isFetching */}
        {/*       ? 'Refreshing...' */}
        {/*       : 'Refresh' */}
        {/*   } */}
        {/* </Button> */}

      </Stack>

      <Box sx={{ p: 3 }}>

        <MovieEntry />

        {
          !movies || movies.length === 0
            ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="50vh" // or '100%' or '100vh' depending on context
              >
                <Typography variant="h6" color="textSecondary">
                  No movies found.
                </Typography>
              </Box>
            )
            : (
              <MovieUI movies={movies} />
            )
        }
      </Box>
    </Box>
  )
}
