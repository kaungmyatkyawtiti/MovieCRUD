"use client";

import { Box } from "@mui/material";
import { useState, useTransition } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/app/types/movies";
import ConfirmDialog from "./ConfirmDialog";
import { deleteMovieByIdAction } from "@/app/lib/movieActions";

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

  const handleDeleteConfirm = (id: string) => {
    setIsDeleting(true);

    startTransition(async () => {
      try {
        await deleteMovieByIdAction(id);
        console.log("Deleted movie:", id);
        setOpen(false); // ✅ only close on success
      } catch (err) {
        console.error("Failed to delete movie:", err);
      } finally {
        setIsDeleting(false);
      }
    });
  };

  const handleDeleteDecline = () => {
    console.log("decline");
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
        onConfirm={() => targetId && handleDeleteConfirm(targetId)}
        onCancel={handleDeleteDecline}
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
