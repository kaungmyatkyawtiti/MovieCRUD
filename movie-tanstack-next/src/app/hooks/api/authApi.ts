import axiosInstance from "@/app/axiosInstance";
import { LoginResponse, LoginUser } from "@/types/auth";

export async function apiLoginUser(user: LoginUser): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>("api/users/login", user);
  console.log("LoginResponse", data);
  return data;
}
