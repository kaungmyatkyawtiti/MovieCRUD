import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Review } from "@/app/movies/types/reviews";
import { BASE_URL } from "@/lib/config";
import { RootState } from "@/lib/store";
import { log, logError } from "@/app/utils/logger";

export type NewReview = Omit<Review, "_id">;

export const reviewsApiSlice = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + "/api",
    prepareHeaders: (headers, { getState }) => {

      const state = (getState() as RootState);
      //log('prepareHeaders State ', state);
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
      transformResponse: (response: { data: Review[] }, meta, arg) => response.data,
    }),

    getReviewByMovieId: build.query<Review[], string>({
      query: (movieId) => `/reviews/movie/${movieId}`,
      transformResponse: (response: { data: Review[] }, meta, arg) => response.data,
    }),

    saveReview: build.mutation<Review, NewReview>({
      query: (saveReview) => ({
        url: `/reviews`,
        method: 'POST',
        body: saveReview,
      }),

      async onQueryStarted(newReview: NewReview, { dispatch, queryFulfilled }) {
        log("review to save", newReview);

        try {
          const { data: savedReview } = await queryFulfilled;
          dispatch(
            reviewsApiSlice.util.updateQueryData(
              "getReviewByMovieId",
              savedReview.movie,
              (draft) => {
                draft.push(savedReview);
              }
            ),
          );
          log('successfully save review', savedReview);
        } catch (err) {
          logError('fail to save review', err);
        }
      },
      transformResponse: (response: { data: Review }, meta, arg) => response.data,
    }),

    updateReviewById: build.mutation<Review, Review>({
      query: (updateReview) => ({
        url: `/reviews/${updateReview._id}`,
        method: "PUT",
        body: updateReview,
      }),

      // Pessimistic Update
      async onQueryStarted(updateReview: Review, { dispatch, queryFulfilled }) {
        log('review to update', updateReview);

        const patchResult = dispatch(
          reviewsApiSlice.util.updateQueryData(
            'getReviewByMovieId',
            updateReview.movie,
            (draft) => {
              draft = draft.map(item => item._id === updateReview._id ? updateReview : item);
              return draft;
            }
          ),
        )
        try {
          const { data: updatedReview } = await queryFulfilled
          log('successfully update review', updatedReview);
        } catch (err) {
          logError('fail to update review', err);
          patchResult.undo();
        }
      },
      transformResponse: (response: { data: Review }, meta, arg) => response.data,
    }),

    deleteReviewById: build.mutation<Review, Review>({
      query: (review) => ({
        url: `/reviews/${review._id}`,
        method: 'DELETE',
      }),

      async onQueryStarted(review: Review, { dispatch, queryFulfilled }) {
        log('review to delete', review._id);

        const patchResult = dispatch(
          reviewsApiSlice.util.updateQueryData(
            'getReviewByMovieId',
            review.movie,
            (draft) => {
              draft = draft.filter(item => item._id != review._id);
              return draft;
            }
          ),
        );
        try {
          const { data: deletedReview } = await queryFulfilled
          log('successfully delete review', deletedReview);
        } catch (err) {
          logError('fail to delete review', err);
          patchResult.undo();
        }
      },
      transformResponse: (response: { data: Review }, meta, arg) => response.data,
    }),

  })
})

export const {
  useGetAllReviewsQuery,
  useGetReviewByMovieIdQuery,
  useSaveReviewMutation,
  useUpdateReviewByIdMutation,
  useDeleteReviewByIdMutation,
} = reviewsApiSlice;
