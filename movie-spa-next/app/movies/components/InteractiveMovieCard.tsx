'use client';

import { Box } from "@mui/material";
import { Movie } from "../types/movies";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import MovieCard from "./MovieCard";
import { useDeleteMovieByIdMutation } from "@/lib/features/movie/moviesApiSlice";

interface InteractiveMovieCardProps {
  movie: Movie;
}

export default function InteractiveMovieCard({ movie }: InteractiveMovieCardProps) {

  const [deleteMovie, deleteMovieResult] = useDeleteMovieByIdMutation();

  const [targetId, setTargetId] = useState<string | null>(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleShowConfirmDialog = () => {
  //   setOpen(true);
  // };
  // const handleDelete = (movie: Movie) => {
  //   handleShowConfirmDialog();
  //   console.log("movie", movie);
  // }
  //
  // const handleDeleteConfirm = () => {
  //   console.log("confirm and delete");
  //   deleteMovie(movie._id)
  //     .then(data => console.log("successfully deleted", data));
  // }

  const handleDelete = (movie: Movie) => {
    setTargetId(movie._id);
    setOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    deleteMovie(id)
      .then(data => console.log("successfully deleted", data));
  };

  const handleDeleteDecline = () => {
    console.log("decline");
  }

  const handleDetailClick = (movie: Movie) => {
    console.log("click");
    router.push(`/movies/${movie._id}`);
  }

  return (
    <Box>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={movie.title}
        message={"are you sure to delete?"}
        onClose={handleClose}
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
