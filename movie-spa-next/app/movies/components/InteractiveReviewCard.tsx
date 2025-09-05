'use client';

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import { Review } from "../types/reviews";
import { useDeleteReviewByIdMutation } from "@/lib/features/review/reviewsApiSlice";
import { useAppStore } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { log } from "@/app/utils/logger";
import { showSnackbar } from "@/lib/features/snackbar/snackbarSlice";

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

  const handleDeleteConfirm = (review: Review) => {
    deleteReview(review)
      .then(data => {
        console.log("successfully deleted", data);
        dispatch(showSnackbar("Review deleted successfully!"));
      })
      .catch((error) => {
        log("delete error", error);
        dispatch(showSnackbar("Failed to delete review."));
      });
    handleClose();
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
