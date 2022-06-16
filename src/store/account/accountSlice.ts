import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    uid: "",
  },
  reducers: {
    editAccountState: (state, payload: any) => {
      state.uid = payload.uid;
    },
  },
});

export const { editAccountState } = accountSlice.actions;

export const selectAccount = (state: any) => state.account.value;

export default accountSlice.reducer;
