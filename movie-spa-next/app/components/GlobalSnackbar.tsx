import { hideSnackbar, selectMsg } from "@/lib/features/snackbar/snackbarSlice";
import { useAppSelector } from "@/lib/hooks";
import { Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";

export default function GlobalSnackbar() {
  const dispatch = useDispatch();
  const message = useAppSelector(selectMsg);

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom"
      }}
      open={!!message}
      autoHideDuration={4000}
      onClose={() => dispatch(hideSnackbar())}
      message={message}
    />
  )
}
