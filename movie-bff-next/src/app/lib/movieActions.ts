"use server";

import { deleteMovieById, NewMovie, saveMovie, updateMovieById } from "../api/movieApi";
import { revalidatePath } from "next/cache";
import { movieSchema } from "../schema/movieSchema";
import { log, logError } from "../utils/logger";

interface State {
  errors?: {
    title?: string[];
    directorName?: string[];
    directorPhoneNo?: string[];
    year?: string[];
  };
  values?: {
    title?: string;
    directorName?: string;
    directorPhoneNo?: string;
    year?: string;
  };
  message?: string | null;
}

type Handler = (movie: NewMovie, movieId?: string) => Promise<void>;
const get = (form: FormData, key: string): string => String(form.get(key) || "");
// const getNum = (form: FormData, key: string): number => Number(get(form, key)) || 0;

export async function handleMovieFormSubmission(
  form: FormData,
  handler: Handler
): Promise<State> {
  const raw = {
    title: get(form, "title"),
    directorName: get(form, "directorName"),
    directorPhoneNo: get(form, "directorPhoneNo"),
    year: get(form, "year"),
  };

  const parsed = movieSchema.safeParse(raw);

  if (!parsed.success) {
    const formFieldErrors = parsed.error.flatten().fieldErrors;
    return {
      errors: {
        title: formFieldErrors.title,
        directorName: formFieldErrors.directorName,
        directorPhoneNo: formFieldErrors.directorPhoneNo,
        year: formFieldErrors.year,
      },
      values: raw,
    };
  }

  const movieId = get(form, "movieId");
  const isUpdate = !!movieId;

  const movie: NewMovie = {
    title: raw.title,
    director: {
      name: raw.directorName,
      phoneNo: raw.directorPhoneNo,
    },
    year: +raw.year,
  };

  try {
    log("Submitting movie data", movie);
    await handler(movie, movieId);

    return {
      message: isUpdate
        ? "Movie updated successfully!"
        : "Movie saved successfully!",
    };
  } catch (err) {
    logError("Form submission failed", err);
    return {
      message: isUpdate
        ? "Failed to update movie."
        : "Failed to save movie.",
    };
  }
}

export async function saveMovieAction(
  _prev: State | undefined,
  form: FormData
): Promise<State> {
  return handleMovieFormSubmission(
    form,
    async (movie) => {
      await saveMovie(movie);
      revalidatePath("/movies");
    }
  );
}

export async function updateMovieByIdAction(
  _prev: State | undefined,
  form: FormData
): Promise<State> {
  return handleMovieFormSubmission(
    form,
    async (movie, id) => {
      if (!id) throw new Error("movieId is required for update");
      await updateMovieById(id, movie);
      revalidatePath(`/movies/${id}`);
    }
  );
}

export async function deleteMovieByIdAction(movieId: string): Promise<void> {
  console.log("deleteMovieByIdAction called with ID:", movieId);
  try {
    await deleteMovieById(movieId);
    revalidatePath("/movies");
  } catch (err) {
    logError("deleteMovieById failed", err);
  }
}
