import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    one: null,
    two: null,
  },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { setPlayer } = playerSlice.actions;

export default playerSlice.reducer;
