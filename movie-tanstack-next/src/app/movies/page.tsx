'use client';

import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import {
  Refresh as RefreshIcon
} from "@mui/icons-material";
import Loading from "@/app/loading";
import MovieList from "./components/MovieList";
import { useGetAllMovies } from "../hooks/movieHook";
import MovieEntry from "./components/MovieEntry";

type CenteredMessageProps = {
  children: React.ReactNode;
  color?: string;
};

const CenteredMessage = ({ children, color }: CenteredMessageProps) => (
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
  const { data, isSuccess, isError, isPending, refetch } = useGetAllMovies();

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

  const isLoading = isPending || isRefreshing;

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold">
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
          disabled={isRefreshing}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Refresh
        </Button>
      </Stack>

      <Box sx={{ p: 3 }}>
        <MovieEntry />

        {
          isLoading && <Loading />
        }

        {
          isError && !isRefreshing && (
            <CenteredMessage color="error">
              Error loading movies. Please try again.
            </CenteredMessage>
          )
        }

        {
          isSuccess && !isRefreshing && (
            data?.length === 0
              ? (
                <CenteredMessage color="text.secondary">
                  No movies found.
                </CenteredMessage>
              )
              : (
                <Stack
                  direction="row"
                  spacing={2}
                  useFlexGap
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  <MovieList movies={data} />
                </Stack>
              )
          )
        }
      </Box>
    </Box>
  );
}
