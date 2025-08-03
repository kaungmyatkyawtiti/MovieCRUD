'use client';

import { Box } from "@mui/material";
import styles from "./page.module.css";
import WelcomePage from "./components/WelcomePage";


export default function Home() {
  return (
    <Box className={styles.page}>
      <WelcomePage />
    </Box>
  );
}
