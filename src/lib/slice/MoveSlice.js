import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: [],
};

export const moveSlice = createSlice({
  name: "move",
  initialState,
  reducers: {
    indexValue: (state, action) => {
      console.log(action.payload);
      state.index[action.payload.index] = action.payload.value;
    },
    setClear: (state) => {
      state.index = [];
    },
  },
});

export const { indexValue, setClear } = moveSlice.actions;

export default moveSlice.reducer;
