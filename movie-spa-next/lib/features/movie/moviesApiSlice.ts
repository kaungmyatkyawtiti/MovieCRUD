import { Director, Movie } from "@/app/movies/types/movies";
import { BASE_URL } from "@/lib/config";
import { RootState } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ApiResponse<T> {
  message: string;
  data: T;
}

type NewDirector = Omit<Director, "_id">;
export type NewMovie = Omit<Movie, "_id" | "director"> & {
  director: NewDirector
};

export const moviesApiSlice = createApi({
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

  reducerPath: "moviesApi",

  // refetchOnFocus: true,

  tagTypes: ["Movie"],

  endpoints: (build) => ({
    getAllMovies: build.query<Movie[], void>({
      query: () => `/movies`,
      // providesTags: ['Movie'],
      transformResponse: (response: ApiResponse<Movie[]>, meta, arg) => response.data,
    }),

    getMovieById: build.query<Movie, string>({
      query: (movieId: string) => `/movies/${movieId}`,
      transformResponse: (response: ApiResponse<Movie>, meta, arg) => response.data,
    }),

    saveMovie: build.mutation<Movie, NewMovie>({
      query: (saveMovie: NewMovie) => ({
        url: `/movies`,
        method: 'POST',
        body: saveMovie,
      }),
      // invalidatesTags: ['Movie'],
      // transformResponse: (response: ApiResponse<Movie>, meta, arg) => response.data,

      async onQueryStarted(movie: Movie, { dispatch, queryFulfilled }) {
        console.log('movie to save', movie);

        try {
          const { data: savedMovie } = await queryFulfilled;
          dispatch(
            moviesApiSlice.util.updateQueryData('getAllMovies', undefined, (draft) => {
              draft.push(savedMovie);
            }),
          );
          console.log('Saved Movie', savedMovie);
        } catch (err) {
          console.log('error is', err);
        }
      },
      transformResponse: (response: ApiResponse<Movie>, meta, arg) => response.data,
    }),

    updateMovieById: build.mutation<Movie, Movie>({
      query: (updateMovie: Movie) => ({
        url: `/movies/${updateMovie._id}`,
        method: 'PUT',
        body: updateMovie,
      }),

      // Optimistic Update
      async onQueryStarted(movie: Movie, { dispatch, queryFulfilled }) {
        console.log('movie to update', movie);

        const patchResult = dispatch(
          moviesApiSlice.util.updateQueryData('getAllMovies', undefined, (draft) => {

            const index = draft.findIndex(item => item._id === movie._id);
            if (index !== -1) {
              draft[index] = movie;
            }

            // draft = draft.map(item => item._id == movie._id ? movie : item);
            // return draft;
          }),
        );
        try {
          const { data: updatedMovie } = await queryFulfilled
          console.log('successfully update movie', updatedMovie);
        } catch (err) {
          patchResult.undo();
        }
      },
      transformResponse: (response: ApiResponse<Movie>, meta, arg) => response.data,
    }),

    deleteMovieById: build.mutation<Movie, string>({
      query: (movieId: string) => ({
        url: `/movies/${movieId}`,
        method: 'DELETE',
      }),

      // Pessimistic Update
      //   async onQueryStarted(movieId: string, { dispatch, queryFulfilled }) {
      //     console.log('movieId to delete', movieId);
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
      //       console.log('Deleted Movie', deletedMovie);
      //     } catch (err) {
      //       console.log('error is', err);
      //     }
      //   },
      //   transformResponse: (response: ApiResponse<Movie>, meta, arg) => response.data,
      // })

      // Optimistic Update
      async onQueryStarted(movieId: string, { dispatch, queryFulfilled }) {
        console.log('movieId to delete', movieId);

        const patchResult = dispatch(
          moviesApiSlice.util.updateQueryData('getAllMovies', undefined, (draft) => {

            const index = draft.findIndex(item => item._id === movieId);
            if (index !== -1) {
              draft.splice(index, 1);
            }

            // draft = draft.filter(item => item._id != movieId);
            // return draft;
          }),
        );
        try {
          const { data: deletedMovie } = await queryFulfilled
          console.log('successfully delete movie', deletedMovie);
        } catch (err) {
          patchResult.undo();
        }
      },
      transformResponse: (response: ApiResponse<Movie>, meta, arg) => response.data,
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
