import { Movie } from "@/types/movie";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export async function apiGetAllMovies(): Promise<Movie[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Movie[]>>("api/movies");
  return data.data;
}

// export async function apiGetMovieById(id: string): Promise<Movie> {
//   const { data } = await axiosInstance.get<AxiosResponse<Movie>>(`api/movies/${id}`);
//   return data.data;
// } 

export async function apiDeleteMovieById(id: string): Promise<Movie> {
  const { data } = await axiosInstance.delete<AxiosResponse<Movie>>(`api/movies/${id}`);
  return data.data;
}
