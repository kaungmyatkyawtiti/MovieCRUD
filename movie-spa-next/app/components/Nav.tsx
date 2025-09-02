"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import useAuth from "../auth/useAuth";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const navItems =
    useAuth()
      ? [
        { label: "Home", href: "/" },
        { label: "Movies", href: "/movies" },
        // { label: "Dashboard", href: "/dashboard" },
        // { label: "Blog", href: "/blog" },
        { label: "Logout", href: "/logout" },
      ]
      : [
        { label: "Login", href: "/login" },
      ];

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        background: "linear-gradient(to center, #3f51b5, #2196f3)",
        paddingX: 1,
        width: "fill-content"
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
        >
          MyApp
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2
          }}
        >
          {
            navItems.map(({ label, href }) => (
              <Link key={href} href={href} passHref>
                <Button
                  sx={{
                    color: pathname === href ? "#fff" : "#e0e0e0",
                    fontWeight: pathname === href ? "bold" : "normal",
                    backgroundColor: pathname === href ? "rgba(255,255,255,0.15)" : "transparent",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  {label}
                </Button>
              </Link>
            ))
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
};
