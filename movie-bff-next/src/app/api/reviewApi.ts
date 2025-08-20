import axiosInstance from "../axiosInstance";
import { log, logError } from "../utils/logger";
import { Review } from "../types/reviews";
import { AxiosResponse } from "axios";

export async function getReviewByMovieId(movieId: string): Promise<Review[]> {
  try {
    const { data } = await axiosInstance.get<AxiosResponse<Review[]>>(`api/reviews/movie/${movieId}`);
    log("getReviewByMovieId ➜", data);
    return data.data;
  } catch (error) {
    logError("getReviewByMovieId ERROR ➜", error);
    throw error;
  }
}
