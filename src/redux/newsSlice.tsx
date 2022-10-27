import { NewsType, StateType } from "./types";

import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { updateNews } from "../api";

let initialState: StateType = {
  news: [],
  currentNews: null,
};

const serialiseTime = (time: number): string => {
  return new Date(time * 1000).toISOString().slice(0, 19).replace("T", " ");
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<Array<NewsType>>) => {
      action.payload = action.payload.map((item) => {
        return { ...item, time_serialised: serialiseTime(item.time) };
      });
      state.news = action.payload;
    },
    setCurrentNews: (state, action: PayloadAction<NewsType | null>) => {
      if (action.payload) {
        action.payload.time_serialised = serialiseTime(action.payload.time);
      }
      state.currentNews = action.payload;
    },
  },
});

export const updateNewsMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) => {
    const getUpdatedNews = async () => {
      let currentNews = getState().newsStore.news;
      if (currentNews.length !== 0) {
        let news = await updateNews(currentNews);
        dispatch(setNews(news));
      }
      setTimeout(getUpdatedNews, 60000);
    };

    getUpdatedNews();

    return (action) => next(action);
  };

export const { setNews, setCurrentNews } = newsSlice.actions;
export const selectNews = (state: RootState) => state.newsStore.news;
export const selectCurrentNews = (state: RootState) =>
  state.newsStore.currentNews;
export const selectComments = (state: RootState) =>
  state.newsStore.currentNews?.children;

export default newsSlice.reducer;
