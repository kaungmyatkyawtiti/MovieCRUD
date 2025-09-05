"use client";
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Stack,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import useAuth from "../auth/useAuth";
import Link from "next/link";
import {
  LiveTv as LiveTvIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from "@mui/icons-material";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = useAuth()
    ? [
      { label: "Home", href: "/", Icon: HomeIcon },
      { label: "Movies", href: "/movies", Icon: LiveTvIcon },
      { label: "Logout", href: "/logout", Icon: LogoutIcon },
    ]
    : [{ label: "Login", href: "/login", Icon: LoginIcon }];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          background: "linear-gradient(to right, #3f51b5, #2196f3)",
          px: 1,
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

          {/* Desktop Nav */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: { xs: "none", md: "flex" }
            }}
          >
            {
              navItems.map(({ label, href, Icon }) => (
                <Link key={href} href={href} passHref>
                  <Button
                    startIcon=<Icon fontSize="small" />
                    sx={{
                      px: 1,
                      color: pathname === href ? "#fff" : "#e0e0e0",
                      fontWeight: pathname === href ? "bold" : "normal",
                      backgroundColor:
                        pathname === href
                          ? "rgba(255,255,255,0.15)"
                          : "transparent",
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
          </Stack>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" }
            }}
            color="inherit"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar >

      {/* Drawer for Mobile */}
      < Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(!open)
        }
      >
        <Box
          sx={{
            mb: 6,
            width: 300,
            height: 140,
            background: "linear-gradient(to left, #3f51b5, #2196f3)",
            position: "relative",
          }}>
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              left: 20,
              bottom: -30,
            }}>
            <Avatar
              sx={{
                width: 94,
                height: 94,
                color: "white",
                bgcolor: "lightslategrey"
              }}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                color: "white"
              }}
            >
              Alice
            </Typography>
          </Box>
        </Box>
        <List>
          {
            navItems.map(({ label, href, Icon }) => (
              <Link key={href} href={href} passHref>
                <ListItem sx={{ py: 1 }}>
                  <ListItemButton
                    selected={pathname === href}
                    onClick={() => setOpen(!open)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: pathname === href ? "primary.main" : "inherit",
                      }}
                    >
                      <Icon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      slotProps={{
                        primary: {
                          fontWeight: pathname === href ? "bold" : "normal",
                          color: pathname === href ? "primary" : "inherit",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          }
        </List>
      </Drawer >
    </>
  );
}
