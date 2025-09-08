'use client';

import { useGetAllMoviesQuery, useGetMovieByIdQuery } from "@/lib/features/movie/moviesApiSlice";
import { useParams, useRouter } from "next/navigation";
import MovieCard from "../components/MovieCard";
import { Box, Button, IconButton, Typography } from "@mui/material";
import {
  Movie as MovieIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import { useState } from "react";
import MovieFormDialog from "../components/MovieFormDialog";
import { Movie } from "../types/movies";
import ReviewBox from "../components/ReviewBox";
import IsAuth from "@/app/components/IsAuth";
import CustomLoading from "@/app/components/CustomLoading";

function MovieDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // const { movie } = useGetAllMoviesQuery(undefined, {
  //   selectFromResult: ({ data }) => ({
  //     movie: data?.find(item => item._id === id),
  //   })
  // })

  const { data: movies } = useGetAllMoviesQuery();
  const cachedMovie = movies?.find(item => item._id === id);

  // Fetch by ID only if not in cache
  const { data: movieById, isLoading } = useGetMovieByIdQuery(id, { skip: !!cachedMovie });
  const movie = cachedMovie || movieById;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleEdit = () => handleClickOpen();

  const handleBack = () => router.replace("/movies");

  if (isLoading) return <CustomLoading />;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={3}
      gap={2}
    >
      <Box position="relative" width="100%" maxWidth={600}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <IconButton
            color="error"
            edge="start"
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <MovieIcon fontSize="large" color="action" />
          <Typography variant="h5" fontWeight={600} color="text.secondary">
            Movie Details
          </Typography>
        </Box>

        <Box position="relative">
          {
            movie && <MovieCard movie={movie} />
          }
          <Button
            variant="contained"
            size="small"
            sx={{ my: 2 }}
            onClick={handleEdit}
          >
            Edit
          </Button>

          <ReviewBox id={id} />
        </Box>
        <MovieFormDialog
          open={open}
          onClose={handleClose}
          movieToEdit={movie}
        />
      </Box>
    </Box>
  )
}

export default IsAuth(MovieDetailPage);
