import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const pauseSlice = createSlice({
  name: "pause",
  initialState,
  reducers: {
    pauseMode: (state, action) => {
      console.log("action.payload", action.payload);
      state.value = action.payload;
    },
  },
});

export const { pauseMode } = pauseSlice.actions;

export default pauseSlice.reducer;
