import Loading from "@/app/loading";
import { useGetReviewByMovieIdQuery } from "@/lib/features/review/reviewsApiSlice";
import { Box, Typography } from "@mui/material";
import ReviewEntry from "./ReviewEntry";
import InteractiveReviewCard from "./InteractiveReviewCard";

export default function ReviewBox({ id }: { id: string }) {
  const { data: reviews, isError, isLoading, isSuccess, refetch, isFetching } = useGetReviewByMovieIdQuery(id);

  if (isLoading) return <Loading />;

  if (isError) return <Box>Error loading reviews</Box>;

  return (
    <Box mt={2}>
      <ReviewEntry movieId={id} />
      {
        isSuccess && reviews && reviews.length > 0
          ? (
            <Box display="flex" flexDirection="column" gap={2}>
              {
                reviews.map((review) =>
                  <InteractiveReviewCard
                    key={review._id}
                    review={review} />
                )
              }
            </Box>
          ) : (
            <Typography color="text.secondary">
              No reviews found for this movie.
            </Typography>
          )
      }
    </Box>
  );
}
