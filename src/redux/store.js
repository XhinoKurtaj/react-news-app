import NewsReducer from "./reducer";
import FeedsReducer from "./feedsReducer";

import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: { NewsReducer, FeedsReducer },
});
