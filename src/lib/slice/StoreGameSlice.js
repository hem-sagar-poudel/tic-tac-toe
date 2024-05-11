import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "idle",
  data: [],
};

export const storeGameAsync = createAsyncThunk(
  "storeGame",
  async ({ data }) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let d = await res.json();
    localStorage.setItem("scoresId", d.id);
    // console.log(await res.json());
    return await res.json();
    return data;
  },
);

export const storeGameSlice = createSlice({
  name: "storeGame",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(storeGameAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(storeGameAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.state = "fulfilled";
        state.data = action.payload;
      });
  },
});

export const {} = storeGameSlice.actions;

export default storeGameSlice.reducer;
