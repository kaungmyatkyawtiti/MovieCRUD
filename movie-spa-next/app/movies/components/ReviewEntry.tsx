'use client';

import {
  Box,
  Button,
  Typography
} from "@mui/material";

import {
  Add as AddIcon
} from "@mui/icons-material";

import { useState } from "react"
import ReviewDialog from "./ReviewDialog";


export default function ReviewEntry({ movieId }: { movieId: string }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        💬 Reviews
      </Typography>
      <Button
        variant="contained"
        color="success"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        New Review
      </Button>
      <ReviewDialog
        open={open}
        onClose={handleClose}
        movieId={movieId}
      />
    </Box>
  )
}
