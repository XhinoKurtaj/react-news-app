import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  NewsAPI: {},
  TheGuardian: {},
  NewYorkTimes: {},
};

export const newsSlice = createSlice({
  name: "newsStore",
  initialState: initialState,
  reducers: {
    addNewsApi: (state, action) => {
      state.NewsAPI = action.payload;
    },
    addTheGuardian: (state, action) => {
      state.TheGuardian = action.payload;
    },
    addNewYorkTimes: (state, action) => {
      state.NewYorkTimes = action.payload;
    },
  },
});

export const { addNewsApi, addTheGuardian, addNewYorkTimes } =
  newsSlice.actions;

export default newsSlice.reducer;
