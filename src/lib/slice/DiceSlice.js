import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    one: null,
    two: null,
  },
};

export const diceSlice = createSlice({
  name: "dice",
  initialState,
  reducers: {
    selectDice: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { selectDice } = diceSlice.actions;

export default diceSlice.reducer;
