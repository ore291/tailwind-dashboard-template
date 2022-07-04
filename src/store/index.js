import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { categoriesApi } from "./services/categories";
import { authApi } from "./services/auth";
import { dashboardApi } from "./services/dashboard";
import userReducer from "./features/userSlice";
import { usersApi } from "./services/users";
import { itemsApi } from "./services/items";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    user: userReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      authApi.middleware,
      usersApi.middleware,
      dashboardApi.middleware,
      itemsApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
