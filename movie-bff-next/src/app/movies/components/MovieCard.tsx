import Link from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import { Movie } from "@/app/types/movies";
import DeleteMovie from "./DeleteMovie";

interface MovieCardProps {
  movie: Movie;
  linkToDetail?: boolean;
  onDelete?: () => void;
}

export default function MovieCard({
  movie,
  linkToDetail,
  onDelete,
}: MovieCardProps) {
  const isLinked = !!linkToDetail;

  const cardContent = (
    <CardActionArea
      component="div"
      sx={{
        cursor:
          isLinked
            ? "pointer"
            : "default",
      }}
    >
      <CardMedia
        component="img"
        image="https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9698.jpeg"
        alt={movie.title}
        sx={{ height: "auto", objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          noWrap={isLinked}
          sx={{ mb: 1 }}>
          {movie.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.primary"
          noWrap={isLinked}
          sx={{ mb: 0.5 }}>
          Director: {movie.director.name}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          noWrap={isLinked}
          sx={{ mb: 1 }}>
          Contact: {movie.director.phoneNo}
        </Typography>
        <Typography
          variant="body2"
          noWrap={isLinked}>
          Year: {movie.year}
        </Typography>
      </CardContent>
    </CardActionArea>
  );

  return (
    <Box>
      <Card
        sx={{
          width:
            isLinked
              ? 240
              : "100%"
        }}>
        {
          isLinked
            ? (
              <Link
                href={`/movies/${movie._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit"
                }}>
                {cardContent}
              </Link>
            )
            : (
              cardContent
            )}

        {
          onDelete && (
            <CardActions>
              <DeleteMovie onDelete={onDelete} />
            </CardActions>
          )
        }
      </Card>
    </Box>
  );
}
