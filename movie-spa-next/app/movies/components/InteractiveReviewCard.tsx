'use client';

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import { Review } from "../types/reviews";
import { useDeleteReviewByIdMutation } from "@/lib/features/review/reviewsApiSlice";

interface InteractiveReviewCardProps {
  review: Review;
}

export default function InteractiveReviewCard({
  review,
}: InteractiveReviewCardProps) {

  const [deleteReview, deleteReviewResult] = useDeleteReviewByIdMutation();

  const [targetReview, setTargetReview] = useState<Review | null>(null);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleShowConfirmDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDetailClick = (movie: Movie) => {
  //   console.log("click");
  //   router.push(`/movies/${movie._id}`);
  // }

  const handleDelete = (review: Review) => {
    setTargetReview(review);
    setOpen(true);
  };

  const handleDeleteConfirm = (review: Review) => {
    deleteReview(review)
      .then(data => console.log("successfully deleted", data));
  };

  const handleDeleteDecline = () => {
    console.log("decline");
  }

  return (
    <Box>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={"Delete this comment"}
        message={"are you sure to delete?"}
        onClose={handleClose}
        onConfirm={() => targetReview && handleDeleteConfirm(targetReview)}
        onCancel={handleDeleteDecline}
      />
      <ReviewCard
        review={review}
        // onShowConfirmDialog={handleShowConfirmDialog}
        // onDetailClick={handleDetailClick}
        onDelete={handleDelete}
      />
    </Box>
  )
}
