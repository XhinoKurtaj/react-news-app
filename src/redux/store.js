import NewsReducer from "./reducer";

import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: { NewsReducer },
});
