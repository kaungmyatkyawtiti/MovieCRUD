import { Box, CircularProgress, } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        height: '50vh', // full viewport height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={65} />
    </Box>
  );
}
