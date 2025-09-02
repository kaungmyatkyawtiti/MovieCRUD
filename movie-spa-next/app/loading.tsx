'use client';

import { Box, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        height: "60vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>Changing page</Typography>
    </Box>
  );
}
