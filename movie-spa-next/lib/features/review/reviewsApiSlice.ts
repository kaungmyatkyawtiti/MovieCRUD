import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
      transformResponse: (response: { data: Review[] }, meta, arg) => response.data,
    }),

    getReviewByMovieId: build.query<Review[], string>({
      query: (movieId: string) => `/reviews/movie/${movieId}`,
      transformResponse: (response: { data: Review[] }, meta, arg) => response.data,
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
              draft.unshift(savedReview);
            }),
          );
          console.log("saved Review", savedReview);
        } catch (err) {
          console.log("error is", err);
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

      async onQueryStarted(review: Review, { dispatch, queryFulfilled }) {
        console.log('review to update', review);

        const patchResult = dispatch(
          reviewsApiSlice.util.updateQueryData('getReviewByMovieId', review.movie, (draft) => {
            draft = draft.map(item => item._id == review._id ? review : item);
            return draft;
          }),
        )
        try {
          const { data: updateReview } = await queryFulfilled
          console.log('successfully update review', updateReview);
        } catch (err) {
          patchResult.undo();
        }
      },
      transformResponse: (response: { data: Review }, meta, arg) => response.data,
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

            draft = draft.filter(item => item._id != review._id);
            return draft;
          }),
        );
        try {
          const { data: deletedReview } = await queryFulfilled
          console.log('successfully delete review', deletedReview);
        } catch (err) {
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
