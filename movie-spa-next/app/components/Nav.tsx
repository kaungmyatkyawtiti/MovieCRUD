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
import Link from "next/link";
import {
  LiveTv as LiveTvIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  SpaceDashboard as DashboardIcon
} from "@mui/icons-material";
import { useAppSelector } from "@/lib/hooks";
import { selectAuthToken } from "@/lib/features/auth/authSlice";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const authToken = useAppSelector(selectAuthToken);
  const authNavItems =
    authToken
      ? [
        { label: "Dashboard", href: "/dashboard", Icon: DashboardIcon },
        { label: "Movies", href: "/movies", Icon: LiveTvIcon },
        { label: "Logout", href: "/logout", Icon: LogoutIcon },
      ]
      : [
        { label: "Login", href: "/login", Icon: LoginIcon },
        { label: "Register", href: "/register", Icon: RegisterIcon },
      ];

  const navItems = [
    { label: "Home", href: "/", Icon: HomeIcon },
    ...authNavItems,
  ];

  const handleBlur = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

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
                <Button
                  key={href}
                  LinkComponent={Link}
                  href={href}
                  startIcon=<Icon fontSize="small" />
                  onClick={handleBlur}
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
              ))
            }
          </Stack>

          {/* Mobile Hamburger */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" }
            }}
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar >

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            mb: 6,
            width: 280,
            height: 140,
            background: "linear-gradient(to left, #3f51b5, #2196f3)",
            position: "relative",
          }}
        >
          <Box
            sx={{
              gap: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              left: 20,
              bottom: -30,
            }}
          >
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
              <ListItem key={href} disablePadding>
                <ListItemButton
                  LinkComponent={Link}
                  href={href}
                  selected={pathname === href}
                  onClick={() => {
                    handleBlur();
                    setOpen(false);
                  }}
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
            ))
          }
        </List>
      </Drawer >
    </>
  );
}
