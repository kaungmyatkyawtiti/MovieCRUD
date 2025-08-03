'use client';

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/types/movie";

interface InteractiveMovieCardProps {
  movie: Movie;
}

export default function InteractiveMovieCard({ movie }: InteractiveMovieCardProps) {


  const [targetId, setTargetId] = useState<string | null>(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (movie: Movie) => {
    setTargetId(movie._id);
    setOpen(true);
  };

  const handleDeleteConfirm = (id: string) => {
    console.log("deleteConfirm")
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
      {/* <ConfirmationDialog */}
      {/*   open={open} */}
      {/*   keepMounted={true} */}
      {/*   title={movie.title} */}
      {/*   message={"are you sure to delete?"} */}
      {/*   onClose={handleClose} */}
      {/*   onConfirm={() => targetId && handleDeleteConfirm(targetId)} */}
      {/*   onCancel={handleDeleteDecline} */}
      {/* /> */}
      <MovieCard
        movie={movie}
        // onShowConfirmDialog={handleShowConfirmDialog}
        onDetailClick={() => handleDetailClick(movie)}
        onDelete={() => handleDelete(movie)}
      />
    </Box>
  )
}
