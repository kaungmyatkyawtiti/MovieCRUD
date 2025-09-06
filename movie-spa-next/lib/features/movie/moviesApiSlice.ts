import { Director, Movie } from "@/app/movies/types/movies";
import { log, logError } from "@/app/utils/logger";
import { BASE_URL } from "@/lib/config";
import { RootState } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type NewDirector = Omit<Director, "_id">;
export type NewMovie = Omit<Movie, "_id" | "director"> & {
  director: NewDirector
};

export const moviesApiSlice = createApi({
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

  reducerPath: "moviesApi",

  // refetchOnFocus: true,

  tagTypes: ["Movie"],

  endpoints: (build) => ({
    getAllMovies: build.query<Movie[], void>({
      query: () => `/movies`,
      // providesTags: ['Movie'],
      transformResponse: (response: { data: Movie[] }, meta, arg) => response.data,
    }),

    getMovieById: build.query<Movie, string>({
      query: (movieId) => `/movies/${movieId}`,
      transformResponse: (response: { data: Movie }, meta, arg) => response.data,
    }),

    saveMovie: build.mutation<Movie, NewMovie>({
      query: (saveMovie) => ({
        url: `/movies`,
        method: 'POST',
        body: saveMovie,
      }),
      // invalidatesTags: ['Movie'],

      async onQueryStarted(newMovie: NewMovie, { dispatch, queryFulfilled }) {
        log('movie to save', newMovie);

        try {
          const { data: savedMovie } = await queryFulfilled;
          dispatch(
            moviesApiSlice.util.updateQueryData(
              'getAllMovies',
              undefined,
              (draft) => {
                draft.push(savedMovie);
              }
            ),
          );
          log('successfully save movie', savedMovie);
        } catch (err) {
          logError('fail to save movie', err);
        }
      },
      transformResponse: (response: { data: Movie }, meta, arg) => response.data,
    }),

    updateMovieById: build.mutation<Movie, Movie>({
      query: (updateMovie) => ({
        url: `/movies/${updateMovie._id}`,
        method: 'PUT',
        body: updateMovie,
      }),

      // Optimistic Update
      async onQueryStarted(updateMovie: Movie, { dispatch, queryFulfilled }) {
        log('movie to update', updateMovie);

        const patchResult = dispatch(
          moviesApiSlice.util.updateQueryData(
            'getAllMovies',
            undefined,
            (draft) => {

              // partial and patch 
              // const target = draft.find(item => item._id === movie._id);
              // if (target) {
              //   Object.assign(target, movie);
              // }

              draft = draft.map(item => item._id == updateMovie._id ? updateMovie : item);
              return draft;
            }
          ),
        );
        try {
          const { data: updatedMovie } = await queryFulfilled
          log('successfully update movie', updatedMovie);
        } catch (err) {
          logError("fail to update movie", err);
          patchResult.undo();
        }
      },
      transformResponse: (response: { data: Movie }, meta, arg) => response.data,
    }),

    deleteMovieById: build.mutation<Movie, string>({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: 'DELETE',
      }),

      // Pessimistic Update
      //   async onQueryStarted(movieId: string, { dispatch, queryFulfilled }) {
      //     log('movieId to delete', movieId);
      //
      //     let patchResult;
      //
      //     try {
      //       const { data: deletedMovie } = await queryFulfilled;
      //       patchResult = dispatch(
      //         moviesApiSlice.util.updateQueryData('getAllMovies', undefined, (draft) => {
      //         
      //            draft = draft.filter(item => item._id != movieId);
      //            return draft;
      //         }),
      //       );
      //       log('Deleted Movie', deletedMovie);
      //     } catch (err) {
      //       log('error is', err);
      //     }
      //   },
      //   transformResponse: (response: {data: Movie}, meta, arg) => response.data,
      // })

      // Optimistic Update
      async onQueryStarted(movieId: string, { dispatch, queryFulfilled }) {
        log('movieId to delete', movieId);

        const patchResult = dispatch(
          moviesApiSlice.util.updateQueryData(
            'getAllMovies',
            undefined,
            (draft) => {
              const index = draft.findIndex(item => item._id === movieId);
              if (index !== -1) {
                draft.splice(index, 1);
              }

              // draft = draft.filter(item => item._id != movieId);
              // return draft;
            }
          ),
        );
        try {
          const { data: deletedMovie } = await queryFulfilled
          log('successfully delete movie', deletedMovie);
        } catch (err) {
          logError("fail to delete movie", err);
          patchResult.undo();
        }
      },
      transformResponse: (response: { data: Movie }, meta, arg) => response.data,
    }),

  })
})

export const {
  useGetAllMoviesQuery,
  useGetMovieByIdQuery,
  useSaveMovieMutation,
  useDeleteMovieByIdMutation,
  useUpdateMovieByIdMutation,
} = moviesApiSlice;
