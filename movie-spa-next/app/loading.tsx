'use client';

import { Box } from "@mui/material";
import { Audio } from "react-loader-spinner";

export default function Loading() {
  return (
    <Box
      sx={{
        height: '100vh', // full viewport height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Audio
        height="100"
        width="100"
        color="green"
        ariaLabel="loading"
      />
    </Box>
  );
}
