import { Box, Typography } from "@mui/material";
import ReviewEntry from "./ReviewEntry";
import InteractiveReviewCard from "./InteractiveReviewCard";
import { getReviewByMovieId } from "@/app/api/reviewApi";

export default async function ReviewFeed({ id }: { id: string }) {
  const reviews = await getReviewByMovieId(id);
  return (
    <Box mt={2}>
      <ReviewEntry movieId={id} />

      {
        !reviews || reviews.length === 0
          ? (
            <Typography color="text.secondary">
              No reviews found for this movie.
            </Typography>
          )
          : (
            <Box display="flex" flexDirection="column" gap={2}>
              {
                reviews.map((review) =>
                  <InteractiveReviewCard
                    key={review._id}
                    review={review} />
                )
              }
            </Box>
          )
      }
    </Box>
  );
}
