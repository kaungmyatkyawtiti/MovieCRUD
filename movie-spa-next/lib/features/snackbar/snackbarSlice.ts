import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type SnackbarState = {
  message: string | null;
}

const initialState: SnackbarState = {
  message: null,
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: (create) => ({
    showSnackbar: create.reducer((state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }),
    hideSnackbar: create.reducer((state) => {
      state.message = null;
    }),
  }),
  selectors: {
    selectMsg: state => state.message,
  }
})

export const {
  showSnackbar,
  hideSnackbar
} = snackbarSlice.actions;

export const {
  selectMsg
} = snackbarSlice.selectors;
