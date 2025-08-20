'use client';

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  console.log("Dashboard");

  const handleGoToAdmin = () => {
    console.log("hello");
    router.push("/dashboard/admin");
  }

  return (
    <div>
      <h1>
        Dashboard Page
      </h1>
      <Button
        type="button"
        variant="contained"
        size="small"
        sx={{ ml: 1 }}
        onClick={handleGoToAdmin}>
        Go to Admin
      </Button>
    </div>
  )
}
