import { Box, Card, CardContent, Divider, IconButton, Rating, Typography } from "@mui/material";
import { Review } from "../types/reviews";
import {
  Delete as DeleteIcon
} from "@mui/icons-material";

export interface ReviewCardProps {
  review: Review;
  onDelete: (review: Review) => void;
}

export default function ReviewCard({
  review,
  onDelete,
}: ReviewCardProps) {

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Left: Rating + Rating value */}
          <Box display="flex" alignItems="center" gap={1}>
            <Rating
              name="half-rating"
              defaultValue={review.rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="subtitle2" color="text.secondary">
              ({review.rating})
            </Typography>
          </Box>

          {/* Right: Delete Button */}
          <IconButton
            color="error"
            edge="start"
            onClick={() => onDelete(review)}
            aria-label="delete review"
            title="Delete review">
            <DeleteIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="body2" color="text.secondary">
          {review.review}
        </Typography>
      </CardContent>
    </Card>
  )
}
