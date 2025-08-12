export interface Review {
  _id: string;
  movie: string;
  rating: number;
  review: string;
}

export type NewReview = Omit<Review, "_id">;
