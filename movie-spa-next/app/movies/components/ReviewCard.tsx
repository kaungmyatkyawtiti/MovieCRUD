import { Box, Card, CardContent, Divider, IconButton, Rating, Typography } from "@mui/material";
import { Review } from "../types/reviews";
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@mui/icons-material";
import { useState } from 'react';
import ReviewFormDialog from './ReviewFormDialog';

export interface ReviewCardProps {
  review: Review;
  onDelete: (review: Review) => void;
}

export default function ReviewCard({
  review,
  onDelete,
}: ReviewCardProps) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    console.log("edit");
    handleClickOpen();
  }

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
          cursor: "pointer",
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Left: Rating + Rating value */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            <Rating
              name="half-rating"
              value={review.rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="subtitle2" color="text.secondary">
              ({review.rating})
            </Typography>
          </Box>

          {/* Right: Delete Button */}
          <Box
            sx={{ display: "flex", gap: 2 }}
          >
            <IconButton
              color="error"
              edge="start"
              onClick={() => onDelete(review)}
              aria-label="click to delete review"
              title="Delete review">
              <DeleteIcon />
            </IconButton>

            <IconButton
              color="primary"
              edge="start"
              onClick={handleEdit}
              aria-label="click to edit review"
              title="Edit review">
              <EditIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {review.review}
        </Typography>
      </CardContent>

      <ReviewFormDialog
        open={open}
        onClose={handleClose}
        movieId={review.movie}
        reviewToEdit={review}
      />

    </Card>
  )
}
