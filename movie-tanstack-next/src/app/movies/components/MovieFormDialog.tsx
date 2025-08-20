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
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { useMemo, useState } from "react";
import { Movie, NewMovie } from "@/types/movie";
import { log } from "@/utils/logger";
import { useMutationSaveMovie, useMutationUpdateMovieById } from "@/app/hooks/movieHook";

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

  const { mutate: saveMovie } = useMutationSaveMovie();
  const { mutate: updateMovie } = useMutationUpdateMovieById();

  const [loading, setLoading] = useState(false);

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
    log(data);
    const newMovie: NewMovie = data;

    setLoading(true);
    if (!movieToEdit) {
      saveMovie(newMovie, {
        onSuccess: () => {
          onClose();
          reset();
          setLoading(false);
        },
      });
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
      updateMovie(updated, {
        onSuccess: () => {
          onClose();
          setLoading(false);
        },
      });
    }
  }

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (!loading) onClose();
      }}
      scroll="paper"
      disableEscapeKeyDown={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {
                loading
                  ? <CircularProgress size={20} />
                  : "Save"
              }
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
