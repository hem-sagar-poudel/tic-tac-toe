import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { gameAsync } from "./GameSlice";

const initialState = {
  state: "idle",
  data: [],
};

export const updateGameAsync = createAsyncThunk(
  "updateGame",
  async ({ data, id }) => {
    console.log(data);
    const res = await fetch(`http://localhost:3001/game/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status) {
      console.log(res.status);
      let d = await res.json();
      localStorage.setItem("scoresId", d.id);
      // console.log(await res.json());
      return await res.json();
    }
  },
);

export const updateGameSlice = createSlice({
  name: "updateGame",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateGameAsync.pending, (state) => {
        state.state = "pending";
      })
      .addCase(updateGameAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.state = "fulfilled";
        state.data = action.payload;
      });
  },
});

export const {} = updateGameSlice.actions;

export default updateGameSlice.reducer;
