import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver, useForm } from "react-hook-form";
import { InferType } from "yup";
import { NewMovie, useSaveMovieMutation, useUpdateMovieByIdMutation } from "@/lib/features/movie/moviesApiSlice";
import { useEffect, useMemo } from "react";
import z from 'zod';
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/lib/features/snackbar/snackbarSlice";
import { log, logError } from "@/app/utils/logger";
import { Movie } from "@/app/types/movies";

interface MovieFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieToEdit?: Movie;
}

// with yup
// const movieSchema = yup
//   .object({
//     title: yup.string().required("movie title is required"),
//     director: yup.object({
//       name: yup.string().required("director name is required"),
//       phoneNo: yup.string().required("director phoneNo is required")
//     }),
//     year: yup
//       .number()
//       .typeError("year must be number")
//       .positive("year must be positive number")
//       .integer("year must be integer")
//       .required("movie release year is required"),
//   })
//   .required()
//
// type MovieFormData = InferType<typeof movieSchema>

const movieSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "movie title is required" })
    .min(3, { message: "movie title min must be 2" }),
  director: z
    .object({
      name: z
        .string()
        .nonempty({ message: "director name is required" })
        .min(3, { message: "director name min must be 2" }),
      phoneNo: z
        .string()
        .nonempty({ message: "director phoneNo is required" })
        .min(3, { message: "director phoneNo min must be 2" }),
    }),
  year: z
    .coerce
    .number<number>()
    .refine((val) => val !== 0, {
      message: "year is required",
    })
    .positive({ message: "year must be positive number" })
    .int({ message: "year must be an integer" })
    .min(1800, { message: "year must be at least 1800" })
  // .max(new Date().getFullYear() + 5, { message: "year is too far in the future" }),
});

type MovieFormData = z.infer<typeof movieSchema>;

export default function MovieFormDialog({
  open,
  onClose,
  movieToEdit,
}: MovieFormDialogProps) {
  const dispatch = useDispatch();

  const [saveMovie, saveMovieResult] = useSaveMovieMutation();

  const [updateMovie, updateMovieResult] = useUpdateMovieByIdMutation();

  const defaultValues = {
    title: "",
    director: {
      name: "",
      phoneNo: ""
    },
    year: undefined,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues
  })

  useEffect(() => {
    reset(movieToEdit ?? defaultValues);
  }, [movieToEdit, reset]);

  const isSubmitting = saveMovieResult.isLoading || updateMovieResult.isLoading;

  const onSubmit = async (data: MovieFormData) => {
    try {
      // log(data);
      if (!movieToEdit) {
        const newMovie = data;
        const response = await saveMovie(newMovie).unwrap();

        log("new movie successfully saved", response);
        dispatch(showSnackbar("New movie saved successfully!"));
      } else {
        const updated: Movie = {
          _id: movieToEdit._id,
          title: data.title,
          year: data.year,
          director: {
            _id: movieToEdit.director._id,
            name: data.director.name,
            phoneNo: data.director.phoneNo,
          },
        };

        const response = await updateMovie(updated).unwrap();

        log("successfully updated", response);
        dispatch(showSnackbar("Movie updated successfully!"));
      }
    } catch (err) {
      logError("fail to save/update movie", err);
      dispatch(showSnackbar("Failed to save/update movie"));
    } finally {
      reset();
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxHeight: '90vh',
            width: '100%',
            maxWidth: 500,
          },
        },
      }}
    >
      <DialogTitle
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {
          movieToEdit
            ? "Edit Movie"
            : "New Movie"
        }
        {isSubmitting && <CircularProgress size={20} />}
      </DialogTitle>
      <DialogContent
        sx={{
          py: 1
        }}
      >
        <DialogContentText>
          {
            movieToEdit
              ? "Update the movie's information."
              : "Add a new movie by entering its title, director, and release year."
          }
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Title"
                {...register("title")}
                helperText={errors.title?.message}
                error={!!errors.title}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Director name"
                {...register("director.name")}
                helperText={errors.director?.name?.message}
                error={!!errors.director?.name}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="number"
                margin="dense"
                fullWidth
                variant="filled"
                label="Director phoneNo"
                {...register("director.phoneNo")}
                helperText={errors.director?.phoneNo?.message}
                error={!!errors.director?.phoneNo}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                type="number"
                margin="dense"
                fullWidth
                variant="filled"
                label="Year"
                {...register("year")}
                helperText={errors.year?.message}
                error={!!errors.year}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                color: "red"
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              {
                isSubmitting
                  ? (
                    <>
                      <CircularProgress size={20} />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )
              }
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
