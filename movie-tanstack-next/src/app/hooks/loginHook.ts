import { log } from "@/utils/logger";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { apiLoginUser } from "./api/authApi";
import { LoginResponse, LoginUser } from "@/types/auth";

export const useMutationLoginUser = () => {
  return useMutation({
    mutationFn: (user: LoginUser) => apiLoginUser(user),

    onSuccess: async (loginResp: LoginResponse) => {
      log("I'm onSuccess!", loginResp);

      // Save to localStorage
      localStorage.setItem("auth_token", loginResp.token); // or loginResp.accessToken etc.

      // Still cache in memory if needed
      queryClient.setQueryData(["auth"], loginResp);
    }
  });
}
