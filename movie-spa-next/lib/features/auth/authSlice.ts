import { createAppSlice } from "@/lib/createAppSlice";
import { BASE_URL } from "@/lib/config";

export interface AuthSliceState {
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const initialState: AuthSliceState = {
  token: "",
}

export const authSlice = createAppSlice({
  name: "auth",

  initialState,

  reducers: (create) => ({
    login: create.asyncThunk<LoginResponse, LoginRequest>(
      async (loginRequest, thunkApi) => {
        try {
          const response = await fetch(BASE_URL + `/api/users/login`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(loginRequest),
          });
          const json = await response.json();
          console.log("Login response", json.token, "response.ok", response.ok);

          if (!response.ok || !json.token) {
            return thunkApi.rejectWithValue(json || "Login failed");
          }

          return json;

        } catch (error) {
          return thunkApi.rejectWithValue(
            error instanceof Error
              // ? (console.log(error.message), error.message)
              ? error.message
              : "Network error"
          );
        }
      },
      {
        //pending
        pending: (state) => {
        },
        // fulfilled
        fulfilled: (state, action) => {
          console.log('fulfilled case');
          state.token = action.payload.token;
        },
        //rejected
        rejected: (state) => {
          console.log('reject case');
          state.token = '';
          throw new Error('Invalid login')
        },
      },

    ),

    logout: create.reducer((state) => {
      state.token = "";
    }),

  }),

  selectors: {
    selectAuthToken: (state) => state.token,
  }
})

export const {
  login,
  logout,
} = authSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectAuthToken } = authSlice.selectors;
