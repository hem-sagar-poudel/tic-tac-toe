import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "idle",
  data: [],
};

export const gameAsync = createAsyncThunk("game", async () => {
  const res = await fetch("http://localhost:3001/game", {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });
  let data = await res.json();
  console.log(data);
  return data;
});

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gameAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(gameAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.state = "pending";
        state.data = action.payload;
      });
  },
});

export const {} = gameSlice.actions;

export default gameSlice.reducer;
