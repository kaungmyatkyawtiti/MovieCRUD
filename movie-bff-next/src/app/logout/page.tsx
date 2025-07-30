'use client';

import { Box, Button } from "@mui/material";
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import ConfirmDialog from "../movies/components/ConfirmDialog";
import { log, logError } from "../utils/logger";
import { logoutAction } from "../lib/authActions";

export default function LogoutPage() {
  const [open, setOpen] = useState(false);
  const [isLogout, setIsLogut] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    setOpen(false);
    setIsLogut(false);
  };

  const handleLogout = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    setIsLogut(true);

    startTransition(async () => {
      try {
        await logoutAction();
        log("logout success");
        setOpen(false); // ✅ only close on success
      } catch (err) {
        logError("Failed to logout", err);
      } finally {
        setIsLogut(false);
      }
    });
  };

  const handleDecline = () => {
    console.log("decline");
    handleClose();
  };

  const logoutMsg = isLogout ? "Logout..." : `Are you sure to logout?`

  return (
    <Box sx={{ m: 4 }}>
      <ConfirmDialog
        open={open}
        keepMounted={true}
        title={"Logout this account"}
        message={logoutMsg}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleDecline}
        loading={isLogout || isPending}
      />
      <Button
        variant="contained"
        onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  )
}
