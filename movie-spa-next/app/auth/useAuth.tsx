import { selectAuthToken } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";

export default function useAuth() {
  const authToken = useAppSelector(selectAuthToken);
  return authToken;
}
