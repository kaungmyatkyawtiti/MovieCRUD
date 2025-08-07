'use client';

import { Box, Stack, Typography, } from "@mui/material";
import Loading from "@/app/loading";
import MovieList from "./components/MovieList";
import { useGetAllMovies } from "../hooks/movieHook";
import MovieEntry from "./components/MovieEntry";

type CenteredMessageProps = {
  children: React.ReactNode;
  color?: string;
};

const CenteredMessage = ({
  children,
  color
}: CenteredMessageProps) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="200px"
    sx={{ px: 2, textAlign: 'center' }}
  >
    <Typography color={color}>
      {children}
    </Typography>
  </Box>
);

export default function MoviePage() {
  const { data, isSuccess, isError, isPending } = useGetAllMovies();

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
          isPending && <Loading />
        }

        {
          isError &&
          <CenteredMessage color="error">
            Error loading movies. Please try again.
          </CenteredMessage>
        }

        {
          isSuccess && data?.length === 0 &&
          <CenteredMessage color="text.secondary">No movies found.</CenteredMessage>
        }

        {
          isSuccess && data?.length > 0 &&
          <Stack
            direction="row"
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            justifyContent="center"
          >
            <MovieList movies={data} />
          </Stack>
        }
      </Box>
    </Box>
  )
}

