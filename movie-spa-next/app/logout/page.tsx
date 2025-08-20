'use client';

import { Box, Button } from "@mui/material";
import ConfirmationDialog from "../movies/components/ConfirmationDialog";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import { redirect } from "next/navigation";
import IsAuth from "../auth/IsAuth";

function LogoutPage() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const showConfirmDialog = () => {
    setOpen(true);
  }

  const handleDecline = () => {
    console.log("decline");
  }

  const handleConfirm = () => {
    console.log("confirm");
    dispatch(logout());
    redirect("/login");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ m: 4 }}>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={"Logout this account"}
        message={"are you sure to Logout?"}
        onClose={handleClose}
        onConfirm={handleConfirm}
        onCancel={handleDecline}
      />
      <Button
        variant="contained"
        onClick={showConfirmDialog}>
        Logout
      </Button>
    </Box>
  )
}

export default IsAuth(LogoutPage);
