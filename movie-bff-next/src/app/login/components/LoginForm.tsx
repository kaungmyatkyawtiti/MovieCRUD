'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Link,
  Card,
} from '@mui/material';
import { Resolver, useForm } from "react-hook-form";
import { useActionState, useEffect } from 'react';
import { LoginFormValue, loginSchema } from '@/app/schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserAction } from '@/app/lib/authActions';

export default function SignIn() {
  const [state, submitAction, pending] = useActionState(loginUserAction, undefined);

  const {
    register,
    reset,
    handleSubmit,
  } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '60vh' }}>
        <Card sx={{ maxWidth: 400, width: '100%', p: 4 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Login Your Account
          </Typography>
          <Box
            component="form"
            noValidate
            action={submitAction}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              {...register("username")}
              label="Username"
              type="text"
              autoComplete="username" // ✅ add this
              variant="outlined"

              error={!!state?.errors?.username}
              helperText={state?.errors?.username}
              fullWidth
              margin="normal"
            />

            <TextField
              {...register("password")}
              label="Password"
              type="password"
              autoComplete="current-password" // ✅ add this
              variant="outlined"

              error={!!state?.errors?.password}
              helperText={state?.errors?.password}
              fullWidth
              margin="normal"
            />

            {/* <FormControlLabel */}
            {/*   control={<Checkbox value="remember" color="primary" />} */}
            {/*   label="I agree to the terms and conditions" */}
            {/* /> */}

            <Button type="submit" variant="contained" fullWidth sx={{ my: 1 }}>
              Sign in
            </Button>

            <Link href="#" variant="body2" sx={{ alignSelf: 'center' }}>
              {/* Already have an account? Sign in */}
              Don’t have an account? Create one
            </Link>
          </Box>
        </Card>
      </Stack>
    </>
  );
}
