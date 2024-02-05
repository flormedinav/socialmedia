import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { generalSlice } from "./slices/generalSlice";
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";
import { postsSlice } from "./slices/postsSlice";

const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  general: generalSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  posts: postsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
