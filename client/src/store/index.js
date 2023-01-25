import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./authSlice.js";
import { reviewApi } from "./api/reviewApi.js";


const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  user: authReducer,
  [reviewApi.reducerPath]: reviewApi.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(reviewApi.middleware),
});

export const persistor = persistStore(store);
export default store;