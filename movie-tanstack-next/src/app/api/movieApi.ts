import { Movie } from "@/types/movie";
import axiosInstance from "../axiosInstance";
import { AxiosResponse } from "axios";

export async function getAllMovies(): Promise<Movie[]> {
  const { data } = await axiosInstance.get<AxiosResponse<Movie[]>>("api/movies");
  return data.data;
}
