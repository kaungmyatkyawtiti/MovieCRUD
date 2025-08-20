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
import MovieFormDialog from "./MovieFormDialog";


export default function MovieEntry() {
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
        mb: 3,
      }}
    >
      <Typography variant="h6" fontWeight={500}>
        📽️ ReelBox
      </Typography>
      <Button
        variant="contained"
        color="success"
        size="small"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        New Movie
      </Button>
      <MovieFormDialog
        open={open}
        onClose={handleClose}
      />
    </Box>
  )
}
