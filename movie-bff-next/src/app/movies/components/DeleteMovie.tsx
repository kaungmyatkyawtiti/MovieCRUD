'use client';

import { Button } from "@mui/material";

interface DeleteMovieProps {
  onDelete: () => void;
}

export default function DeleteMovie({
  onDelete,
}: DeleteMovieProps) {

  return (
    <Button
      type="submit"
      size="medium"
      color="error"
      aria-label="delete movie"
      title="Delete movie"
      onClick={onDelete}
    >
      Delete
    </Button>
  )
}
