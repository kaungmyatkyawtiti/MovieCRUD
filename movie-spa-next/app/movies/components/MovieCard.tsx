import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Movie } from "../types/movies";

interface MovieCardProps {
  movie: Movie,
  onDetailClick?: () => void;
  onDelete?: () => void;
}

export default function MovieCard({
  movie,
  onDetailClick,
  onDelete,
}: MovieCardProps) {

  return (
    <Box>
      <Card
        sx={{
          width: onDetailClick ? 240 : '100%',
        }}
      >
        {/* Make CardActionArea clickable for entire card except buttons */}
        <CardActionArea
          onClick={
            onDetailClick
              ? onDetailClick
              : undefined
          }
          sx={{
            cursor: onDetailClick
              ? 'pointer'
              : 'default'
          }}
        >
          <CardMedia
            component="img"
            image="https://www.vintagemovieposters.co.uk/wp-content/uploads/2019/06/IMG_9698.jpeg"
            alt={movie.title}
            sx={{
              height: 'auto',
              objectFit: 'cover',
            }}
          />
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              noWrap={!!onDetailClick}
              sx={{ mb: 1 }}
            >
              {movie.title}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.primary"
              noWrap={!!onDetailClick}
              sx={{ mb: 0.5 }}>
              Director: {movie.director.name}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mb: 1 }}>
              Contact: {movie.director.phoneNo}
            </Typography>

            <Typography variant="body2">
              Year: {movie.year}
            </Typography>
          </CardContent>
        </CardActionArea>
        {
          onDelete &&
          <CardActions >
            <Button
              size="medium"
              color="error"
              onClick={onDelete}
              aria-label="delete movie"
              title="Delete movie">
              Delete
            </Button>
          </CardActions>
        }
      </Card>
    </Box >
  )
}
