'use client';

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import { useMutationDeleteReviewById } from "@/app/hooks/reviewHook";
import { Review } from "@/types/review";

interface InteractiveReviewCardProps {
  review: Review;
}

export default function InteractiveReviewCard({
  review,
}: InteractiveReviewCardProps) {

  const { mutate: deleteReviewById } = useMutationDeleteReviewById();

  const [targetReview, setTargetReview] = useState<Review | null>(null);

  // const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDetailClick = (movie: Movie) => {
  //   log("click");
  //   router.push(`/movies/${movie._id}`);
  // }

  const handleDelete = (review: Review) => {
    setTargetReview(review);
    setOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (targetReview) {
      deleteReviewById(targetReview);
    }
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
        onConfirm={handleDeleteConfirm}
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
