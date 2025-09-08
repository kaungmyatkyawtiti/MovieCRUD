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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InferType } from "yup";
import { useState, useEffect } from "react";
import { Star as StarIcon } from "@mui/icons-material";
import { useSaveReviewMutation, useUpdateReviewByIdMutation } from "@/lib/features/review/reviewsApiSlice";
import { Review } from "../types/reviews";
import { log } from "@/app/utils/logger";
import { showSnackbar } from "@/lib/features/snackbar/snackbarSlice";
import { useDispatch } from "react-redux";

interface ReviewFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieId: string;
  reviewToEdit?: Review;
}

const reviewSchema = yup
  .object({
    review: yup.string().required("Review is required"),
  })
  .required();

type ReviewFormData = InferType<typeof reviewSchema>;

export default function ReviewFormDialog({
  open,
  onClose,
  movieId,
  reviewToEdit,
}: ReviewFormDialogProps) {
  const dispatch = useDispatch();

  const [saveReview] = useSaveReviewMutation();
  const [updateReview] = useUpdateReviewByIdMutation();

  // Rating  
  const [rating, setRating] = useState<number>(reviewToEdit?.rating ?? 0);

  const handleChangeRating = (_: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue ?? 0);
  }

  // hookform
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      review: reviewToEdit?.review ?? "",
    },
  });

  useEffect(() => {
    reset({
      review: reviewToEdit?.review ?? "",
    });
    setRating(reviewToEdit?.rating ?? 0);
  }, [reviewToEdit, reset, open]);

  const onSubmit = (data: ReviewFormData) => {
    if (reviewToEdit) {
      const updated = {
        _id: reviewToEdit._id,
        movie: reviewToEdit.movie,
        review: data.review,
        rating, // use local rating state
      }
      updateReview(updated)
        .then((data) => {
          log("successfully updated", data);
          dispatch(showSnackbar("Review updated successfully!"));
          reset();
        });
      onClose();
    } else {
      const newOne = {
        movie: movieId,
        review: data.review,
        rating, // use local rating state
      }
      saveReview(newOne)
        .then((data) => {
          log("new review successfully saved", data);
          dispatch(showSnackbar("New review saved successfully!"));
          reset();
        });
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      slotProps={{
        paper: {
          sx: { maxHeight: "90vh", width: "100%", maxWidth: 500 },
        },
      }}
    >
      <DialogTitle
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 500
        }}
      >
        {
          reviewToEdit ? "Edit Review" : "New Review"
        }
      </DialogTitle>
      <DialogContent
        sx={{ py: 1 }}
      >
        <DialogContentText>
          {
            reviewToEdit
              ? "Update the review's information."
              : "Add a new review by choosing a rating and entering your review."
          }
        </DialogContentText>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={12}>
              <Rating
                name="rating"
                value={rating}
                precision={0.5}
                onChange={handleChangeRating}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Review"
                margin="dense"
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
  );
}
