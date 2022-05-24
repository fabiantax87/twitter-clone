import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    value: false,
  },
  reducers: {
    toggleTrue: (state) => {
      state.value = true;
    },

    toggleFalse: (state) => {
      state.value = false;
    },
  },
});

export const { toggleTrue, toggleFalse } = accountSlice.actions;

export const selectAccount = (state: any) => state.account.value;

export default accountSlice.reducer;
