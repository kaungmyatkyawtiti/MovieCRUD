"use client";

import { Box } from "@mui/material";
import { useState, useTransition } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/app/types/movies";
import ConfirmDialog from "./ConfirmDialog";
import { deleteMovieByIdAction } from "@/app/lib/movieActions";
import { log, logError } from "@/app/utils/logger";

interface InteractiveMovieCardProps {
  movie: Movie;
  linkToDetail: boolean;
}

export default function InteractiveMovieCard({
  movie,
  linkToDetail,
}: InteractiveMovieCardProps) {
  const [targetId, setTargetId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setOpen(false);
    setIsDeleting(false);
  };

  const handleDelete = (movie: Movie) => {
    setTargetId(movie._id);
    setOpen(true);
  };

  const handleConfirm = (id: string) => {
    setIsDeleting(true);

    startTransition(async () => {
      try {
        await deleteMovieByIdAction(id);
        log("Deleted movie:", id);
        setOpen(false); // ✅ only close on success
      } catch (err) {
        logError("Failed to delete movie:", err);
      } finally {
        setIsDeleting(false);
      }
    });
  };

  const handleDecline = () => {
    log("decline");
    handleClose();
  };

  const deleteMsg = isDeleting ? "Deleting..." : `Are you sure to delete ${movie.title}?`

  return (
    <Box>
      <ConfirmDialog
        open={open}
        keepMounted={true}
        title={movie.title}
        message={deleteMsg}
        onClose={handleClose}
        onConfirm={() => targetId && handleConfirm(targetId)}
        onCancel={handleDecline}
        loading={isDeleting || isPending} // if ConfirmDialog supports `loading`
      />
      <MovieCard
        movie={movie}
        linkToDetail={linkToDetail}
        onDelete={() => handleDelete(movie)}
      />
    </Box>
  );
}
