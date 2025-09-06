'use client';

import { Box } from "@mui/material";
import { Movie } from "../types/movies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import MovieCard from "./MovieCard";
import { useDeleteMovieByIdMutation } from "@/lib/features/movie/moviesApiSlice";
import { log } from "@/app/utils/logger";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/lib/features/snackbar/snackbarSlice";

interface InteractiveMovieCardProps {
  movie: Movie;
}

export default function InteractiveMovieCard({ movie }: InteractiveMovieCardProps) {
  const dispatch = useDispatch();

  const [deleteMovie, deleteMovieResult] = useDeleteMovieByIdMutation();

  const [targetId, setTargetId] = useState<string | null>(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  // For ConfirmationDialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = (id: string) => {
    deleteMovie(id)
      .then((data) => {
        log("successfully deleted", data);
        dispatch(showSnackbar("Movie deleted successfully!"));
      })
      .catch((error) => {
        log("delete error", error);
        dispatch(showSnackbar("Failed to delete movie."));
      });
    handleClose();
  };

  const handleDeleteDecline = () => {
    log("decline");
    handleClose();
  }

  // For MovieCard
  const handleDelete = (movie: Movie) => {
    setTargetId(movie._id);
    setOpen(true);
  };

  const handleDetailClick = (movie: Movie) => {
    log("click");
    router.push(`/movies/${movie._id}`);
  }

  return (
    <Box>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={movie.title}
        message={"are you sure to delete?"}
        onConfirm={() => targetId && handleDeleteConfirm(targetId)}
        onCancel={handleDeleteDecline}
      />
      <MovieCard
        movie={movie}
        // onShowConfirmDialog={handleShowConfirmDialog}
        onDetailClick={() => handleDetailClick(movie)}
        onDelete={() => handleDelete(movie)}
      />
    </Box>
  )
}
