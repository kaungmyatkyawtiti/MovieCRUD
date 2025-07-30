import axiosInstance from "../axiosInstance";
import { log, logError } from "../utils/logger";
import { LoginFormValue } from "../schema/loginSchema";

interface LoginResponse {
  token: string;
}

export async function loginUser(user: LoginFormValue): Promise<LoginResponse> {
  console.log("loginUser called");
  try {
    log("loginUser ➜ sending:", user);
    const { data } = await axiosInstance.post<LoginResponse>("api/users/login", user);
    log("loginUser ➜ response:", data);
    return data;
  } catch (error) {
    logError("loginUser ERROR ➜", error);
    throw error;
  }
}
