import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const boxFillSlice = createSlice({
  name: "boxFill",
  initialState,
  reducers: {
    checkFill: (state, action) => {
      let fill = [];
      action.payload.map((arr, index) => {
        console.log("arr", index, action.payload[index]);
        fill = [...fill, action.payload[index]];
      });
      console.log("fill", fill);
      state.value = fill.length === 9;
    },
  },
});

export const { checkFill } = boxFillSlice.actions;

export default boxFillSlice.reducer;
