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
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form";
import { InferType } from 'yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useMutationLoginUser } from '@/app/hooks/loginHook';
import { log } from '@/utils/logger';

const userSchema = yup.object({
  username: yup.string()
    .required("username is required"),
  password: yup
    .string()
    // .min(6, "password must be at least 6 characters")
    .required("password is required"),
})
  .required();

type FormData = InferType<typeof userSchema>;

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectUrl");

  const { mutate: login } = useMutationLoginUser();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token) {
      router.push(redirectUrl || "/");
    }
  }, [redirectUrl, router]);

  const {
    control,
    // register,
    handleSubmit,
    reset,
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
    login(data, {
      onSuccess: (success) => {
        log("success", success);
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push("/");
        }
      },
      onError: (error) => {
        log("error", error);
        reset();
      }
    });
  };

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '70vh' }}>
        <Card
          sx={{
            maxWidth: 400,
            width: '100%',
            p: 4
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Login Your Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  type="text"
                  variant="outlined"

                  error={!!errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"

                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  margin="normal"
                />
              )}
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
