'use client';

import { useGetAllMoviesQuery } from "@/lib/features/movie/moviesApiSlice";
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
import IsAuth from "@/app/auth/IsAuth";

function MovieDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { movie } = useGetAllMoviesQuery(undefined, {
    refetchOnMountOrArgChange: false,
    selectFromResult: ({ data }) => ({
      movie: data?.find(item => item._id === id),
    })
  })

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editHandler = () => {
    console.log("edit");
    handleClickOpen();
  }

  const backHandler = () => {
    console.log("back");
    router.back();
  }

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
            onClick={backHandler}
          >
            <ArrowBackIcon />
          </IconButton>
          <MovieIcon fontSize="large" color="action" />
          <Typography variant="h5" fontWeight={600} color="text.secondary">
            Movie Details
          </Typography>
        </Box>

        <Box position="relative">
          <MovieCard movie={movie ?? {} as Movie} />
          <Button
            variant="contained"
            size="small"
            sx={{ my: 2 }}
            onClick={editHandler}
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
