'use client';

import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react'

interface ErrorProp {
  error: Error & { digest?: string },
  reset: () => void,
}

export default function Error({
  error,
  reset,
}: ErrorProp
) {

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        width: "600px",
        m: "20px auto",
        textAlign: "center",
        py: 5,
      }}
    >
      <Typography
        variant='h3'
        sx={{
          my: "20px",
          color: "cadetblue"
        }}
      >
        Something went wrong!
      </Typography>
      <Button
        type='button'
        variant='contained'
        size='medium'
        sx={{
          my: "20px"
        }}
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </Box>
  )
}
