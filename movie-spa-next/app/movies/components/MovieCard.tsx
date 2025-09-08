import { Box, Card, CardActions, CardContent, CardMedia, Divider, IconButton, Typography } from "@mui/material";
import { Movie } from "../types/movies";
import {
  InfoOutline as InfoOutlineIcon,
  DeleteOutline as DeleteOutlineIcon
} from "@mui/icons-material";

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
          width: { xs: "90vw", sm: onDetailClick ? 250 : "100%" },
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          ...(onDetailClick && {
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 3,
              cursor: "pointer",
            },
          }),
        }}
      >
        {/* Make CardActionArea clickable for entire card except buttons */}
        <Box>
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
        </Box>
        {
          onDelete && onDetailClick &&
          <>
            <Divider />
            <CardActions>
              <IconButton
                size="medium"
                color="info"
                onClick={onDetailClick}
                aria-label="click for detail info"
                title="detail info">
                <InfoOutlineIcon />
              </IconButton>

              <IconButton
                size="medium"
                color="error"
                onClick={onDelete}
                aria-label="delete movie"
                title="Delete movie">
                <DeleteOutlineIcon />
              </IconButton>
            </CardActions>
          </>
        }
      </Card>
    </Box >
  )
}
