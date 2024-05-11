import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    selectMode: (state, action) => {
      console.log("action.payload", action.payload);
      state.value = action.payload;
    },
  },
});

export const { selectMode } = modeSlice.actions;

export default modeSlice.reducer;
