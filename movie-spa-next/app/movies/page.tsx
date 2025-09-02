'use client';

import { useGetAllMoviesQuery } from "@/lib/features/movie/moviesApiSlice";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import {
  Refresh as RefreshIcon
} from "@mui/icons-material";
import IsAuth from "@/app/auth/IsAuth";
import MovieList from "./components/MovieList";
import MovieEntry from "./components/MovieEntry";
import { useState } from 'react';
import CustomLoading from '../components/CustomLoading';
import { backIn } from "framer-motion";

// let movies: Movie[] = [
//   {
//     "_id": "684a964b5749dd65e7b29990",
//     "title": "Inception 3",
//     "director": {
//       "name": "Christopher Nolan",
//       "phoneNo": "123-456-7890",
//       "_id": "684bcd34b758682478c9a5d7"
//     },
//     "year": 2019
//   },
//   {
//     "_id": "684b1fd39bf638816f8e959d",
//     "title": "Inception",
//     "director": {
//       "name": "Christopher Nolan",
//       "phoneNo": "123-456-7890",
//       "_id": "684b1fd39bf638816f8e959e" },
//     "year": 2010,
//   }
// ]

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

function MoviePage() {
  const { data, isError, isLoading, isSuccess, refetch, isFetching } = useGetAllMoviesQuery();
  // useGetAllMoviesQuery(undefined, {
  //   pollingInterval: 300000,
  //   skipPollingIfUnfocused: true,
  // });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshHandler = async () => {
    console.log("refresh");

    setIsRefreshing(true);

    const delay = new Promise((resolve, reject) =>
      setTimeout(resolve, 3000)
    );

    await Promise.all([refetch(), delay]);

    setIsRefreshing(false);
  };

  const isSpinning = isLoading || isRefreshing;

  return (
    <Box p={3}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          my: 2
        }}
      >
        <Typography variant="h4" fontWeight="600">
          🎬 My Movie Collections
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            isRefreshing
              ? <CircularProgress size={16} color="inherit" />
              : <RefreshIcon />
          }
          onClick={refreshHandler}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Refresh
        </Button>
      </Stack>

      <Box
        sx={{
          my: 2
        }}
      >

        {/* New Movie From Section */}
        <MovieEntry />

        {
          isSpinning && <CustomLoading height={"50vh"} />
        }

        {
          isError && isSpinning &&
          <CenteredMessage color="error">
            Error loading movies. Please try again.
          </CenteredMessage>
        }

        {
          isSuccess && !isRefreshing && (
            data?.length === 0
              ? <CenteredMessage color="text.secondary">No movies found.</CenteredMessage>
              : (
                <Stack
                  direction="row"
                  spacing={2}
                  useFlexGap
                  sx={{
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <MovieList movies={data} />
                </Stack>
              )
          )
        }
      </Box>
    </Box >
  )
}

export default IsAuth(MoviePage);
