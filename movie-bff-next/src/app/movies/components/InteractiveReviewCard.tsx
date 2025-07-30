'use client';

import { Box } from "@mui/material";
import { useState } from "react";
import { Review } from "@/app/types/reviews";
import ConfirmDialog from "./ConfirmDialog";
import ReviewCard from "./ReviewCard";

interface InteractiveReviewCardProps {
  review: Review;
}

export default function InteractiveReviewCard({
  review,
}: InteractiveReviewCardProps) {

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
    setOpen(true);
  };

  // const handleDeleteConfirm = (review: Review) => {
  //   deleteReview(review)
  //     .then(data => console.log("successfully deleted", data));
  // };

  const handleDeleteDecline = () => {
    console.log("decline");
  }

  return (
    <Box>
      <ConfirmDialog
        open={open}
        keepMounted={true}
        title={"Delete this comment"}
        message={"are you sure to delete?"}
        onClose={handleClose}
        onConfirm={() => console.log("deleted")}
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
