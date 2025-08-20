'use client';

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/movie";
import ConfirmationDialog from "./ConfirmationDialog";
import { useMutationDeleteMovieById } from "@/app/hooks/movieHook";
import { log } from "@/utils/logger";

interface InteractiveMovieCardProps {
  movie: Movie;
}

export default function InteractiveMovieCard({ movie }: InteractiveMovieCardProps) {

  const [targetMovie, setTargetMovie] = useState<Movie | null>(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { mutate: deleteMovieById, isSuccess } = useMutationDeleteMovieById();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (movie: Movie) => {
    setTargetMovie(movie);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (targetMovie) {
      deleteMovieById(targetMovie);
    }
  };

  const handleDeleteDecline = () => {
    log("decline");
  }

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
        onClose={handleClose}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteDecline}
      />
      <MovieCard
        movie={movie}
        onDetailClick={() => handleDetailClick(movie)}
        onDelete={() => handleDelete(movie)}
      />
    </Box>
  )
}
