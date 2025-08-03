"use client";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const pathname = usePathname();

  const navItems =
    [
      { label: "Home", href: "/" },
      { label: "Movies", href: "/movies" },
      // { label: "Logout", href: "/logout" },
      // { label: "Login", href: "/login" },
    ]

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        background: "linear-gradient(to right, #3f51b5, #2196f3)", // subtle gradient
        paddingX: 1,
        mx: "auto",
        width: "fill-content"
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ mr: 3, fontWeight: "bold" }}>
          MyApp
        </Typography>
        {
          navItems.map(({ label, href }) => (
            <Link key={href} href={href} passHref>
              <Button
                sx={{
                  color: pathname === href ? "#fff" : "#e0e0e0",
                  fontWeight: pathname === href ? "bold" : "normal",
                  backgroundColor: pathname === href ? "rgba(255,255,255,0.15)" : "transparent",
                  textTransform: "none",
                  marginX: 1,
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
      </Toolbar>
    </AppBar>
  );
};
