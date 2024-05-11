import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const turnSlice = createSlice({
  name: "turn",
  initialState,
  reducers: {
    setTurn: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { setTurn } = turnSlice.actions;

export default turnSlice.reducer;
