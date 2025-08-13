"use server";

import { cookies } from "next/headers";
import { loginUser } from "../api/authApi";
import { loginSchema } from "../schema/loginSchema";
import { redirect } from "next/navigation";
import { log, logError } from "../utils/logger";

interface State {
  errors?: {
    username?: string[];
    password?: string[];
  };
  values?: {
    username?: string,
    password?: string,
  };
  message?: string | null;
}

const getFormValue = (form: FormData, key: string): string =>
  String(form.get(key) || "");

export async function loginUserAction(
  state: State | undefined,
  formData: FormData
): Promise<State> {

  const userCredentials = {
    username: getFormValue(formData, "username"),
    password: getFormValue(formData, "password"),
  }

  const parsed = loginSchema.safeParse(userCredentials);

  if (!parsed.success) {
    const formFieldErrors = parsed.error.flatten().fieldErrors;
    return {
      errors: {
        username: formFieldErrors?.username,
        password: formFieldErrors?.password,
      },
      values: userCredentials,
    };
  }

  let redirectUrl = "";
  try {
    const result = await loginUser(userCredentials);
    log("result => ", result);
    if (result.token) {
      const cookieStore = await cookies();

      cookieStore.set("auth-token", result.token, { httpOnly: true });

      redirectUrl =
        cookieStore.get("redirectUrl")?.value || "/";

      cookieStore.delete("redirectUrl"); // Optional: clear it after use
    }
  } catch (error) {
    logError("Login failed:", error);

    return {
      errors: {
        username: ["Invalid username or password"],
        password: ["Invalid username or password"]
      },
      values: userCredentials,
    };
  }

  redirect(redirectUrl);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
  redirect('/login');
}
