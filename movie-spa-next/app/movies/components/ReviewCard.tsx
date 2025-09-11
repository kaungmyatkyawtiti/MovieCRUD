import { Box, Card, CardContent, Divider, IconButton, Rating, Typography } from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@mui/icons-material";
import { useState } from 'react';
import ReviewFormDialog from './ReviewFormDialog';
import { Review } from "@/app/types/reviews";
import { log } from "@/app/utils/logger";

export interface ReviewCardProps {
  review: Review;
  onDelete?: (review: Review) => void;
  onEdit?: () => void;
}

export default function ReviewCard({
  review,
  onDelete,
  onEdit,
}: ReviewCardProps) {
  // log("review from ReviewCard", review);
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
          {/* Left */}
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

          {/* Right but optional */}
          {
            onDelete && onEdit &&
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
                onClick={onEdit}
                aria-label="click to edit review"
                title="Edit review">
                <EditIcon />
              </IconButton>
            </Box>
          }
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography
          variant="body2"
          color="text.secondary"
        >
          {review.review}
        </Typography>
      </CardContent>

    </Card>
  )
}
