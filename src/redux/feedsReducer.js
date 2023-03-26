import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeds: [],
};

export const feedsReducer = createSlice({
  name: "feedsReducer",
  initialState: initialState,
  reducers: {
    updateFeed: (state, action) => {
      state.feeds = action.payload;
    },
  },
});

export const { updateFeed } = feedsReducer.actions;

export default feedsReducer.reducer;
