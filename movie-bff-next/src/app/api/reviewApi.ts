import axiosInstance from "../axiosInstance";
import { log, logError } from "../utils/logger";
import { Review } from "../types/reviews";

interface ApiResponse<T> {
  message: string;
  data: T;
}

export async function getReviewByMovieId(movieId: string): Promise<Review[]> {
  try {
    const { data } = await axiosInstance.get<ApiResponse<Review[]>>(`api/reviews/movie/${movieId}`);
    log("getReviewByMovieId ➜", data);
    return data.data;
  } catch (error) {
    logError("getReviewByMovieId ERROR ➜", error);
    throw error;
  }
}
