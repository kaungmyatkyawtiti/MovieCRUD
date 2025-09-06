"use client";

import { selectAuthToken } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import { log } from "../utils/logger";

function AuthCheckLoading() {
  return (
    <Box
      sx={{
        height: "60vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>
        Checking Auth
      </Typography>
    </Box>
  )
}

export default function IsAuth<T>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const router = useRouter();
    const authtoken = useAppSelector(selectAuthToken);
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    log('Path name ', pathname);

    useEffect(() => {
      const noRedirectQueryPages = ['/logout'];

      if (!authtoken) {
        if (noRedirectQueryPages.includes(pathname)) {
          router.replace('/login');
        } else {
          router.push('/login?redirectUrl=' + pathname);
        }
      } else {
        setIsChecking(false);
      }
    }, [authtoken, pathname, router]);

    return (
      <>
        {
          isChecking
            ? (
              <AuthCheckLoading />
            )
            : (
              <Component {...props!} />
            )
        }
      </>
    );
  };
}
