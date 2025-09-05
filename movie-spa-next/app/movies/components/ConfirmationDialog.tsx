import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import {
  HelpOutline as HelpOutlineIcon
} from "@mui/icons-material";

export interface ConfirmationDialogRawProps {
  keepMounted: boolean;
  message: string;
  title: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog(props: ConfirmationDialogRawProps) {
  const {
    title,
    message,
    open,
    onConfirm,
    onCancel,
    keepMounted,
    ...other
  } = props;

  return (
    <Dialog
      keepMounted={keepMounted}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 500
            }}
          >
            {title}
          </Typography>
          <HelpOutlineIcon fontSize="medium" sx={{ color: '#1976d2' }} />
        </Box>
      </DialogTitle>
      <DialogContent>
        {message}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="error"
          onClick={onCancel}>
          Cancel
        </Button>
        <Button
          color="success"
          onClick={onConfirm}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
