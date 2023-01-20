import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import { reviewApi } from "./api/reviewApi.js";

export const store = configureStore({
  reducer: {
    user: authReducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(reviewApi.middleware),
});
