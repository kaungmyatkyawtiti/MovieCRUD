import axiosInstance from "../axiosInstance";
import { log, logError } from "../utils/logger";
import { Director, Movie } from "../types/movies";
import { AxiosResponse } from "axios";

// interface ApiResponse<T> {
//   message: string;
//   data: T;
// }

export type NewDirector = Omit<Director, "_id">;
export type NewMovie = Omit<Movie, "_id" | "director"> & {
  director: NewDirector
};

log("MovieApi.ts loaded!");

export async function getAllMovies(): Promise<Movie[]> {
  try {
    const { data } = await axiosInstance.get<AxiosResponse<Movie[]>>("api/movies");
    log("getAllMovies ➜", data);
    return data.data;
  } catch (error) {
    logError("getAllMovies ERROR ➜", error);
    throw error;
  }
}

export async function getMovieById(movieId: string): Promise<Movie> {
  try {
    const { data } = await axiosInstance.get<AxiosResponse<Movie>>(`api/movies/${movieId}`);
    log("getMovieById ➜", data);
    return data.data;
  } catch (error) {
    logError("getMovieById ERROR ➜", error);
    throw error;
  }
}

export async function saveMovie(movie: NewMovie): Promise<Movie> {
  console.log("saveMovie called");
  try {
    log("saveMovie ➜ sending:", movie);
    const { data } = await axiosInstance.post<AxiosResponse<Movie>>("api/movies", movie);
    log("saveMovie ➜ response:", data);
    return data.data;
  } catch (error) {
    logError("saveMovie ERROR ➜", error);
    throw error;
  }
}

export async function updateMovieById(movieId: string, movie: NewMovie): Promise<Movie> {
  console.log("updateMovieById called");
  try {
    log("updateMovieById ➜ sending:", movieId, movie);
    const { data } = await axiosInstance.put<AxiosResponse<Movie>>(`api/movies/${movieId}`, movie);
    log("updateMovieById ➜ response:", data);
    return data.data;
  } catch (error) {
    logError("updateMovieById ERROR ➜", error);
    throw error;
  }
}

export async function deleteMovieById(movieId: string): Promise<Movie> {
  console.log("deleteMovieById called");
  try {
    log("deleteMovieById ➜ deleting:", movieId);
    const { data } = await axiosInstance.delete<AxiosResponse<Movie>>(`api/movies/${movieId}`);
    log("deleteMovieById ➜ response:", data);
    return data.data;
  } catch (error) {
    logError("deleteMovieById ERROR ➜", error);
    throw error;
  }
}
