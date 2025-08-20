import { Box, Typography } from "@mui/material";
import {
  Movie as MovieIcon,
} from "@mui/icons-material";
import BackButton from "../components/BackButton";
import MovieFeed from "../components/MovieFeed";
import ReviewFeed from "../components/ReviewFeed";
import { Suspense } from "react";
import Loading from "@/app/loading";

interface MovieDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function MovieDetailPage({
  params
}: MovieDetailsPageProps) {

  const { id } = await params;
  console.log('Id ', id);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding={3}
      gap={2}
    >
      <Box position="relative" width="100%" maxWidth={600}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <BackButton />
          <MovieIcon fontSize="large" color="action" />
          <Typography variant="h5" fontWeight={600} color="text.secondary">
            Movie Details
          </Typography>
        </Box>

        <Box position="relative">
          <Suspense
            fallback={<Loading />}
          >
            <MovieFeed id={id} />
          </Suspense>
          <Suspense
            fallback={<p>Loading...</p>}
          >
            <ReviewFeed id={id} />
          </Suspense>
        </Box>
      </Box>
    </Box>
  )
}
