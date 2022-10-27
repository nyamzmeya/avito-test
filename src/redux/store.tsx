import { configureStore } from "@reduxjs/toolkit";
import newsReducer, { updateNewsMiddleware } from "./newsSlice";

const store = configureStore({
  reducer: {
    newsStore: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(updateNewsMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export default store;
