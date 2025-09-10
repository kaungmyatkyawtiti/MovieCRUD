'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: { xs: "1rem auto", sm: "3rem auto" },
        px: { xs: 2, sm: 0 },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: 500,
          fontSize: { xs: "1.6rem", sm: "2rem" },
        }}
      >
        Register Your Account
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField

          label="Username"
          type="text"
          variant="outlined"

          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"

          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="I agree to the terms and conditions"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ my: 1 }}>
          Register
        </Button>

        <Link
          component="button"
          type='button'
          onClick={() => router.push("/login")}
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
}
