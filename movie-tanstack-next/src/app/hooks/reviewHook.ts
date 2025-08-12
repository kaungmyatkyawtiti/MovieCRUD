import { useMutation, useQuery } from "@tanstack/react-query";
import { apiDeleteReviewById, apiGetReviewByMovieId, apiSaveReview } from "./api/reviewApi";
import { log, logError } from "@/utils/logger";
import { queryClient } from "./queryClient";
import { NewReview, Review } from "@/types/review";

export const useGetReviewByMovieId = (movieId: string) => {
  return useQuery({
    queryKey: ['reviews', movieId],
    queryFn: () => apiGetReviewByMovieId(movieId),
    refetchOnWindowFocus: false,
  });
};

export const useMutationSaveReview = () => {
  return useMutation({
    mutationFn: (review: NewReview) => apiSaveReview(review),

    onSuccess: async (savedReview: NewReview) => {
      log("I'm onSuccess!", savedReview);

      queryClient.setQueriesData(
        { queryKey: ["reviews", savedReview.movie] },
        (oldState: Review[]) => [savedReview, ...oldState]
      )
    },
    onSettled: async () => {
      log("I'm onSettled!")
    },
  });
}

export const useMutationDeleteReviewById = () => {
  return useMutation({
    mutationFn: (review: Review) => apiDeleteReviewById(review._id),

    onMutate: (review: Review) => {
      log("onMutate", review._id);

      const oldState = queryClient.getQueryData(["reviews", review.movie]);

      queryClient.setQueriesData(
        { queryKey: ["reviews", review.movie] },
        (oldState: Review[]) => oldState.filter(r => r._id != review._id)
      )

      return { oldState };
    },

    onSuccess: async (deletedReview: Review) => {
      log("I'm onSuccess!", deletedReview);
    },

    onSettled: async () => {
      log("I'm onSettled!")
    },

    onError: (error, review, context) => {
      logError(error);
      queryClient.setQueryData(["reviews"], context?.oldState);
    }
  });
}
