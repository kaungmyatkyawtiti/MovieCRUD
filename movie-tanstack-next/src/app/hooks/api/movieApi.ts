import axiosInstance from "@/app/axiosInstance";
import { Director, Movie } from "@/types/movie";
import { AxiosResponse } from "axios";

type NewDirector = Omit<Director, "_id">;
export type NewMovie = Omit<Movie, "_id" | "director"> & {
  director: NewDirector
};

export async function apiGetAllMovies(): Promise<Movie[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Movie[]>>("api/movies");
  return data.data;
}

// export async function apiGetMovieById(id: string): Promise<Movie> {
//   const { data } = await axiosInstance.get<AxiosResponse<Movie>>(`api/movies/${id}`);
//   return data.data;
// }

export async function apiSaveMovie(movie: NewMovie): Promise<Movie> {
  const { data } = await axiosInstance.post<AxiosResponse<Movie>>(`api/movies`, movie);
  return data.data;
}

export async function apiUpdateMovieById(movie: Movie): Promise<Movie> {
  const { data } = await axiosInstance.put<AxiosResponse<Movie>>(`api/movies/${movie._id}`, movie);
  return data.data;
}

export async function apiDeleteMovieById(id: string): Promise<Movie> {
  const { data } = await axiosInstance.delete<AxiosResponse<Movie>>(`api/movies/${id}`);
  return data.data;
}
