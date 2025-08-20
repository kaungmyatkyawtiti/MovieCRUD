import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "../movie/moviesApiSlice";
import { Review } from "@/app/movies/types/reviews";
import { BASE_URL } from "@/lib/config";
import { RootState } from "@/lib/store";

export type NewReview = Omit<Review, "_id">;

export const reviewsApiSlice = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + "/api",
    prepareHeaders: (headers, { getState }) => {

      const state = (getState() as RootState);
      //console.log('prepareHeaders State ', state);
      if (state.auth.token) {
        headers.set('Authorization', 'Bearer ' + state.auth.token);
      }
      return headers;
    }
  }),

  reducerPath: "reviewsApi",

  tagTypes: ["Review"],

  endpoints: (build) => ({
    getAllReviews: build.query<Review[], void>({
      query: () => `/reviews`,
      transformResponse: (response: ApiResponse<Review[]>, meta, arg) => response.data,
    }),

    getReviewByMovieId: build.query<Review[], string>({
      query: (movieId: string) => `/reviews/movie/${movieId}`,
      transformResponse: (response: ApiResponse<Review[]>, meta, arg) => response.data,
    }),

    saveReview: build.mutation<Review, NewReview>({
      query: (saveReview: NewReview) => ({
        url: `/reviews`,
        method: 'POST',
        body: saveReview,
      }),

      async onQueryStarted(review: Review, { dispatch, queryFulfilled }) {
        console.log("review to save", review);

        try {
          const { data: savedReview } = await queryFulfilled;
          dispatch(
            reviewsApiSlice.util.updateQueryData("getReviewByMovieId", savedReview.movie, (draft) => {
              draft.push(savedReview);
            }),
          );
          console.log("saved Review", savedReview);
        } catch (err) {
          console.log("error is", err);
        }
      },
      transformResponse: (response: ApiResponse<Review>, meta, arg) => response.data,
    }),

    deleteReviewById: build.mutation<Review, Review>({
      query: (review: Review) => ({
        url: `/reviews/${review._id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(review: Review, { dispatch, queryFulfilled }) {
        console.log('review to delete', review._id);

        const patchResult = dispatch(
          reviewsApiSlice.util.updateQueryData('getReviewByMovieId', review.movie, (draft) => {

            const index = draft.findIndex((item) => item._id === review._id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
            // draft = draft.filter(item => item._id != reviewId);
            // return draft;
          }),
        );
        try {
          const { data: deletedReview } = await queryFulfilled
          console.log('successfully delete review', deletedReview);
        } catch (err) {
          patchResult.undo();
        }
      },
      transformResponse: (response: ApiResponse<Review>, meta, arg) => response.data,
    }),

  })
})

export const {
  useGetAllReviewsQuery,
  useGetReviewByMovieIdQuery,
  useSaveReviewMutation,
  useDeleteReviewByIdMutation,
} = reviewsApiSlice;
