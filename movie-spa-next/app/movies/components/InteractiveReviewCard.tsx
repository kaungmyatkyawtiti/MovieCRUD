'use client';

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import { useDeleteReviewByIdMutation } from "@/lib/features/review/reviewsApiSlice";
import { useAppStore } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { log, logError } from "@/app/utils/logger";
import { showSnackbar } from "@/lib/features/snackbar/snackbarSlice";
import { Review } from "@/app/types/reviews";

interface InteractiveReviewCardProps {
  review: Review;
}

export default function InteractiveReviewCard({
  review,
}: InteractiveReviewCardProps) {
  const dispatch = useDispatch();

  const [deleteReview, deleteReviewResult] = useDeleteReviewByIdMutation();

  const [targetReview, setTargetReview] = useState<Review | null>(null);

  const [open, setOpen] = useState(false);

  // For ConfirmationDialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = async (review: Review) => {
    try {
      const result = await deleteReview(review).unwrap();
      log("successfully deleted", result);
      dispatch(showSnackbar("Review deleted successfully!"));
    } catch (error) {
      logError("delete error", error);
      dispatch(showSnackbar("Failed to delete review."));
    } finally {
      handleClose();
    }
  };

  const handleDeleteDecline = () => {
    console.log("decline");
    handleClose();
  }

  // For ReviewCard
  const handleDelete = (review: Review) => {
    setTargetReview(review);
    setOpen(true);
  };

  return (
    <Box>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={"Delete this comment"}
        message={"are you sure to delete?"}
        onConfirm={() => targetReview && handleDeleteConfirm(targetReview)}
        onCancel={handleDeleteDecline}
      />
      <ReviewCard
        review={review}
        onDelete={handleDelete}
      />
    </Box>
  )
}
