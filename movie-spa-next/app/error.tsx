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
    <Box sx={{ mx: "auto", py: 5 }}>
      <Typography variant='h3'>
        Something went wrong!
      </Typography>
      <Button
        type='button'
        variant='contained'
        size='medium'
        onClick={
          () => reset()
        }
      >
        Try again
      </Button>
    </Box>
  )
}
