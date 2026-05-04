import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../utils/firebase";

// Async thunk to fetch user data
export const fetchUserLists = createAsyncThunk(
  "watchlist/fetchUserLists",
  async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        watchlist: data.watchlist || [],
        favorites: data.favorites || [],
      };
    }
    return { watchlist: [], favorites: [] };
  }
);

export const toggleWatchlist = createAsyncThunk(
  "watchlist/toggleWatchlist",
  async ({ item, uid, isAdding }, { getState, rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      if (isAdding) {
        // Use setDoc with merge: true to ensure the document exists
        await setDoc(userRef, { watchlist: arrayUnion(item) }, { merge: true });
        return { item, isAdding };
      } else {
        const state = getState().watchlist;
        const exactItem = state.watchlist.find((w) => Number(w.id) === Number(item.id));
        if (exactItem) {
          await updateDoc(userRef, { watchlist: arrayRemove(exactItem) });
        }
        return { item, isAdding };
      }
    } catch (error) {
      console.error("Error in toggleWatchlist:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  "watchlist/toggleFavorite",
  async ({ item, uid, isAdding }, { getState, rejectWithValue }) => {
    try {
      const userRef = doc(db, "users", uid);
      if (isAdding) {
        await setDoc(userRef, { favorites: arrayUnion(item) }, { merge: true });
        return { item, isAdding };
      } else {
        const state = getState().watchlist;
        const exactItem = state.favorites.find((f) => Number(f.id) === Number(item.id));
        if (exactItem) {
          await updateDoc(userRef, { favorites: arrayRemove(exactItem) });
        }
        return { item, isAdding };
      }
    } catch (error) {
      console.error("Error in toggleFavorite:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlist: [],
    favorites: [],
    loading: false,
  },
  reducers: {
    clearLists: (state) => {
      state.watchlist = [];
      state.favorites = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserLists.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload.watchlist;
        state.favorites = action.payload.favorites;
      })
      .addCase(fetchUserLists.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleWatchlist.fulfilled, (state, action) => {
        const { item, isAdding } = action.payload;
        if (isAdding) {
          state.watchlist.push(item);
        } else {
          state.watchlist = state.watchlist.filter((w) => Number(w.id) !== Number(item.id));
        }
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { item, isAdding } = action.payload;
        if (isAdding) {
          state.favorites.push(item);
        } else {
          state.favorites = state.favorites.filter((f) => Number(f.id) !== Number(item.id));
        }
      });
  },
});

export const { clearLists } = watchlistSlice.actions;

export default watchlistSlice.reducer;
