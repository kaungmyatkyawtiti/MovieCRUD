import { Movie } from "@/app/types/movies";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MovieForm from "./MovieForm";

interface MovieFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieToEdit?: Movie;
}

export default function MovieFormDialog({
  open,
  onClose,
  movieToEdit,
}: MovieFormDialogProps) {
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
        {/* 👇 This key forces remount and fresh state */}
        {
          open && <MovieForm key="form" onClose={onClose} movieToEdit={movieToEdit} />
        }
      </DialogContent>
    </Dialog>
  );
}
