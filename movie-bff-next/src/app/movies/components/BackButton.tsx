import {
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";

export default function BackButton() {

  return (
    <Link href="/movies" passHref>
      <IconButton color="error" edge="start" aria-label="Back to movies">
        <ArrowBackIcon />
      </IconButton>
    </Link>
  )
}
