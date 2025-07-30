import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
} from "@mui/material";

import { HelpOutline as HelpOutlineIcon } from "@mui/icons-material";

export interface ConfirmDialogRawProps {
  keepMounted: boolean;
  message: string;
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean; // ✅ Add loading prop
}

export default function ConfirmDialog(props: ConfirmDialogRawProps) {
  const {
    title,
    message,
    open,
    onConfirm,
    onCancel,
    keepMounted,
    loading = false,
    ...other
  } = props;

  const handleOk = () => {
    if (!loading) {
      onConfirm(); // ✅ only confirm
    }
  };

  const handleCancel = () => {
    if (!loading) {
      onCancel(); // ✅ no onClose here either
    }
  };

  return (
    <Dialog
      keepMounted={keepMounted}
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <HelpOutlineIcon fontSize="medium" sx={{ color: '#1976d2' }} />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color="error"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          color="success"
          onClick={handleOk}
          disabled={loading}
          startIcon={
            loading
              ? <CircularProgress size={16} />
              : null
          }
        >
          {
            loading
              ? "Deleting..."
              : "Ok"
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}
