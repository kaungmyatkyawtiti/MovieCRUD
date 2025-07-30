import {
  Button,
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
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { NewMovie, useSaveMovieMutation, useUpdateMovieByIdMutation } from "@/lib/features/movie/moviesApiSlice";
import { Movie } from "../types/movies";
import { useMemo } from "react";

interface MovieFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieToEdit?: Movie;
}

const movieSchema = yup
  .object({
    title: yup.string().required("movie title is required"),
    director: yup.object({
      name: yup.string().required("director name is required"),
      phoneNo: yup.string().required("director phoneNo is required")
    }),
    year: yup
      .number()
      .typeError("year must be number")
      .positive("year must be positive number")
      .integer("year must be integer")
      .required("movie release year is required"),
  })
  .required()

type MovieFormData = InferType<typeof movieSchema>

export default function MovieFormDialog({
  open,
  onClose,
  movieToEdit,
}: MovieFormDialogProps) {
  const [saveMovie, saveMovieResult] = useSaveMovieMutation();

  const [updateMovie, updateMovieResult] = useUpdateMovieByIdMutation();

  // let defaultValues: any = {};
  // if (movieToEdit) {
  //   defaultValues = { ...movieToEdit };
  // }

  const defaultValues = useMemo(() => {
    return movieToEdit ? { ...movieToEdit } : {};
  }, [movieToEdit]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    defaultValues,
    resolver: yupResolver(movieSchema),
  })

  const onSubmit = (data: MovieFormData) => {
    console.log(data);
    const newMovie: NewMovie = data;
    if (!movieToEdit) {
      saveMovie(newMovie);
      reset();
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
      }
      updateMovie(updated);
    }
    onClose();
  }

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
      <DialogTitle>
        {
          movieToEdit
            ? "Edit Movie"
            : "New Movie"
        }
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
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
                margin="dense"
                fullWidth
                variant="standard"
                label="Title"
                {...register("title")}
                helperText={errors.title?.message}
                error={!!errors.title}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                margin="dense"
                fullWidth
                variant="standard"
                label="Director name"
                {...register("director.name")}
                helperText={errors.director?.name?.message}
                error={!!errors.director?.name}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                margin="dense"
                fullWidth
                variant="standard"
                label="Director phoneNo"
                {...register("director.phoneNo")}
                helperText={errors.director?.phoneNo?.message}
                error={!!errors.director?.phoneNo}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                margin="dense"
                fullWidth
                variant="standard"
                label="Year"
                {...register("year")}
                helperText={errors.year?.message}
                error={!!errors.year}
              />
            </Grid>
          </Grid>
          {/* <p>{errors.firstName?.message}</p> */}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
