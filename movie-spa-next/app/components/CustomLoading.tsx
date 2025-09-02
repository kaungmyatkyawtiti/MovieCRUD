import { Box } from '@mui/material';
import { Audio } from 'react-loader-spinner';

interface CustomLoadingProps {
  height?: string | number;
}

export default function CustomLoading({ height = "100%" }: CustomLoadingProps) {
  return (
    <Box
      sx={{
        height,
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
