import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
  TextField,
} from "@mui/material";

import { useState } from "react";
import {
  Star as StarIcon
} from "@mui/icons-material";

interface ReviewFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieId: string;
}

export default function ReviewDialog({
  open,
  onClose,
  movieId,
}: ReviewFormDialogProps) {

  const [rating, setRating] = useState<number>(0);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxHeight: '90vh',
            width: '100%',
            maxWidth: 500,
          },
        },
      }}
    >
      <DialogTitle>
        New Review
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          Add a new review by choosing rating and entering review.
        </DialogContentText>
        <form>
          <Grid
            container
            spacing={2}
            sx={{ mt: 3 }}>
            <Grid size={12}>
              <Rating
                name="hover-feedback"
                value={rating}
                precision={0.5}
                // getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setRating(newValue ?? 0);
                }}
                // onChangeActive={(event, newHover) => {
                // setHover(newHover);
                // }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />

            </Grid>
            <Grid size={12}>
              <TextField
                margin="dense"
                fullWidth
                variant="standard"
                label="Review"
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
