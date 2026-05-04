import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import watchlistSlice from "./watchlistSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    watchlist: watchlistSlice,
    auth: authSlice,
  },
});
