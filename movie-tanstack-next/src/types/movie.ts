export interface Director {
  name: string;
  phoneNo: string;
  _id: string;
}

export interface Movie {
  _id: string;
  title: string;
  director: Director;
  year: number;
}

type NewDirector = Omit<Director, "_id">;
export type NewMovie = Omit<Movie, "_id" | "director"> & {
  director: NewDirector
};

