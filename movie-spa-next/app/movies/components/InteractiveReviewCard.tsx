'use client';

import { Box } from "@mui/material";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import ReviewFormDialog from "./ReviewFormDialog";
import { useDeleteReviewByIdMutation } from "@/lib/features/review/reviewsApiSlice";
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

  const [deleteReview] = useDeleteReviewByIdMutation();

  const [targetReview, setTargetReview] = useState<Review | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // edit dialog 
  const handleEdit = () => {
    log("edit");
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // delete dialog 
  const handleDelete = (review: Review) => {
    log("delete");
    setTargetReview(review);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!targetReview) return;

    try {
      const result = await deleteReview(targetReview).unwrap();
      log("successfully deleted", result);
      dispatch(showSnackbar("Review deleted successfully!"));
    } catch (error) {
      logError("delete error", error);
      dispatch(showSnackbar("Failed to delete review."));
    } finally {
      handleDeleteClose();
    }
  };

  return (
    <Box>
      <ReviewFormDialog
        open={editOpen}
        onClose={handleEditClose}
        movieId={review.movie}
        reviewToEdit={review}
      />

      <ConfirmationDialog
        open={deleteOpen}
        keepMounted
        title="Delete this comment"
        message="Are you sure you want to delete this review?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteClose}
      />

      <ReviewCard
        review={review}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Box>
  );
}
