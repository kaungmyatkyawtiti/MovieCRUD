import { saveMovieAction, updateMovieByIdAction } from "@/app/lib/movieActions";
import { Resolver, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Movie } from "@/app/types/movies";
import {
  Button,
  CircularProgress,
  DialogActions,
  Grid,
  TextField,
} from "@mui/material";
import { useActionState, useEffect } from "react";
import { MovieFormValue, movieSchema } from "@/app/schema/movieSchema";

interface MovieFormProps {
  onClose: () => void;
  movieToEdit?: Movie;
}

export default function MovieForm({
  onClose,
  movieToEdit,
}: MovieFormProps) {

  const {
    register,
    reset,
    handleSubmit,
  } = useForm<MovieFormValue>({
    resolver: zodResolver(movieSchema) as Resolver<MovieFormValue>,
    defaultValues: {
      title: movieToEdit?.title ?? "",
      directorName: movieToEdit?.director?.name ?? "",
      directorPhoneNo: movieToEdit?.director?.phoneNo ?? "",
      year: movieToEdit?.year ?? undefined,
    },
  });

  // useActionState returns [state, submitAction, pending]
  const [state, submitAction, pending] = useActionState(
    movieToEdit ? updateMovieByIdAction : saveMovieAction,
    undefined
  );

  useEffect(() => {
    if (!pending && state && !state.errors) {
      onClose(); // Close dialog only if submission succeeded and not loading
    }
  }, [state, pending, onClose]);

  useEffect(() => {
    if (state?.values) {
      reset({
        ...state.values,
        year: state.values.year ? +state.values.year : undefined,
      });
    }
  }, [state, reset]);

  const buttonText = pending
    ? (movieToEdit ? "Editing..." : "Saving...")
    : (movieToEdit ? "Edit" : "Save");

  return (
    <form action={submitAction}>
      {movieToEdit && (
        <input type="hidden" name="movieId" value={movieToEdit._id} />
      )}
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            {...register("title")}
            margin="dense"
            disabled={pending}
            fullWidth
            variant="standard"
            label="Title"
            error={!!state?.errors?.title}
            helperText={state?.errors?.title?.[0]}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("directorName")}
            margin="dense"
            disabled={pending}
            fullWidth
            variant="standard"
            label="Director name"
            error={!!state?.errors?.directorName}
            helperText={state?.errors?.directorName?.[0]}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("directorPhoneNo")}
            margin="dense"
            disabled={pending}
            fullWidth
            variant="standard"
            label="Director phoneNo"
            error={!!state?.errors?.directorPhoneNo}
            helperText={state?.errors?.directorPhoneNo?.[0]}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            {...register("year")}
            type="number"
            margin="dense"
            disabled={pending}
            fullWidth
            variant="standard"
            label="Year"
            error={!!state?.errors?.year}
            helperText={state?.errors?.year?.[0]}
          />
        </Grid>
      </Grid>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={pending} // Disable cancel during loading for consistency
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          disabled={pending} // Disable submit during loading
          startIcon={pending ? <CircularProgress size={16} /> : null}
        >
          {buttonText}
        </Button>
      </DialogActions>
    </form>
  );
}
