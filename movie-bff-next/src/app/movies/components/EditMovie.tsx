'use client';

import { Box, Button } from "@mui/material";
import MovieFormDialog from "./MovieFormDialog";
import { useState } from "react";
import { Movie } from "@/app/types/movies";

export default function EditMovie({ movie }: { movie: Movie }) {

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

  return (
    <Box>
      <Button
        variant="contained"
        size="small"
        sx={{ my: 2 }}
        onClick={editHandler}
      >
        Edit
      </Button>

      <MovieFormDialog
        open={open}
        onClose={handleClose}
        movieToEdit={movie}
      />

    </Box>
  )
}
