import type { Metadata } from "next";
import RequireAuth from "./components/RequireAuth";

export default function IndexPage() {
  return (
    <RequireAuth>
      <div>Welcome From Home</div>
    </RequireAuth>
  )
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
