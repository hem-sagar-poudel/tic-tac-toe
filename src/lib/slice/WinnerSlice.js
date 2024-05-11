import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const winnerSlice = createSlice({
  name: "winner",
  initialState,
  reducers: {
    setWinner: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { setWinner } = winnerSlice.actions;

export default winnerSlice.reducer;
