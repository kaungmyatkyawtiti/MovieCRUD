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

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { InferType } from "yup"
import { useState } from "react";
import {
  Star as StarIcon
} from "@mui/icons-material";
import { useSaveReviewMutation } from "@/lib/features/review/reviewsApiSlice";

interface ReviewFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieId: string;
}

const reviewSchema = yup
  .object({
    review: yup.string().required("review is required"),
  })
  .required()

type ReviewFormData = InferType<typeof reviewSchema>

export default function ReviewDialog({
  open,
  onClose,
  movieId,
}: ReviewFormDialogProps) {

  const [saveReview, saveReviewResult] = useSaveReviewMutation();
  const [rating, setRating] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewSchema),
  })

  const clearForm = () => {
    setRating(0);
    reset();
  }

  const onSubmit = (data: ReviewFormData) => {
    const payload = {
      movie: movieId,
      ...data,
      rating,
    };
    console.log(payload);
    saveReview(payload);
    onClose();
    clearForm();
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("review")}
                helperText={errors.review?.message}
                error={!!errors.review}
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
