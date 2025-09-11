import {
  Button,
  CircularProgress,
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
import { log, logError } from "@/app/utils/logger";
import { showSnackbar } from "@/lib/features/snackbar/snackbarSlice";
import { useDispatch } from "react-redux";
import { Review } from "@/app/types/reviews";

interface ReviewFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieId: string;
  reviewToEdit?: Review;
}

const reviewSchema = yup.object({
  review: yup
    .string()
    .required("review is required")
    .min(4, "review must be 4"),
});

type ReviewFormData = InferType<typeof reviewSchema>;

export default function ReviewFormDialog({
  open,
  onClose,
  movieId,
  reviewToEdit,
}: ReviewFormDialogProps) {
  const dispatch = useDispatch();

  const [saveReview, saveReviewResult] = useSaveReviewMutation();
  const [updateReview, updateReviewResult] = useUpdateReviewByIdMutation();

  // Rating  
  const [rating, setRating] = useState<number>(reviewToEdit?.rating ?? 0);

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

  const isSubmitting = saveReviewResult.isLoading || updateReviewResult.isLoading;

  const onSubmit = async (data: ReviewFormData) => {
    try {
      if (reviewToEdit) {
        const updated = {
          _id: reviewToEdit._id,
          movie: reviewToEdit.movie,
          review: data.review,
          rating,
        };
        const response = await updateReview(updated).unwrap();
        log("successfully updated", response);
        dispatch(showSnackbar("Review updated successfully!"));
      } else {
        const newOne = {
          movie: movieId,
          review: data.review,
          rating,
        };
        const response = await saveReview(newOne).unwrap();
        log("new review successfully saved", response);
        dispatch(showSnackbar("New review saved successfully!"));
      }
    } catch (err) {
      logError("fail to save/update review", err);
      dispatch(showSnackbar("Failed to save/update review"));
    } finally {
      reset();
      onClose();
    }
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
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,

        }}
      >
        {
          reviewToEdit ? "Edit Review" : "New Review"
        }
        {isSubmitting && <CircularProgress size={20} />}
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
                onChange={(event, newValue) => {
                  setRating(newValue ?? 0);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                fullWidth
                variant="filled"
                label="Review"
                margin="dense"
                {...register("review")}
                helperText={errors.review?.message}
                error={!!errors.review}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                color: "red"
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}

            >
              {
                isSubmitting
                  ? (
                    <>
                      <CircularProgress size={20} />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )
              }
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
