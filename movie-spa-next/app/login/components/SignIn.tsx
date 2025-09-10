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
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { InferType } from 'yup';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { login, selectAuthToken } from '@/lib/features/auth/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { log, logError } from '@/app/utils/logger';

const userSchema = yup.object({
  username: yup
    .string()
    .required("username is required"),
  password: yup
    .string()
    // .min(6, "password must be at least 6 characters")
    .required("password is required"),
}).required();

type FormData = InferType<typeof userSchema>;

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectUrl");

  const dispatch = useAppDispatch();
  const authToken = useAppSelector(selectAuthToken);

  useEffect(() => {
    if (authToken) {
      router.push(redirectUrl || "/dashboard");
    }
  }, [authToken, redirectUrl, router]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    log('Sign in data:', data);

    dispatch(login(data))
      .then(
        success => {
          log("success", success);
          // router.push("/");
          if (redirectUrl) {
            router.push(redirectUrl);
          } else {
            router.push("/dashboard");
          }
        },
        error => {
          logError("error", error);

          // setError("username", {
          //   type: "server",
          //   message: "Invalid username or password",
          // });
          // setError("password", {
          //   type: "server",
          //   message: "Invalid username or password",
          // });

          const fields: (keyof FormData)[] = ["username", "password"];
          fields.forEach(field => {
            setError(field, {
              type: "server",
              message: "Invalid username or password",
            })
          })
          reset(
            { username: "", password: "" },
            { keepErrors: true }
          );
        }
      )
  };

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
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: 500,
          fontSize: { xs: "1.6rem", sm: "2rem" },
        }}
      >
        Login Your Account
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}
      >
        <TextField
          {...register("username")}
          label="Username"
          type="text"
          variant="outlined"

          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
          margin="normal"
        />

        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="outlined"

          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          // label="I agree to the terms and conditions"
          label="Remember Me"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ my: 1 }}>
          Sign in
        </Button>

        <Link
          component="button"
          type='button'
          onClick={() => router.push("/register")}
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Don’t have an account? Create one
        </Link>
      </Box>
    </Box>
  );
}
