import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import sidebarReducer from "./slice/sidebarSlice";
import userReducer from "./slice/userSlice";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import api from "./apiSlice/baseQuery";
import globalReducer from "./slice/globalSlice";
import emergencyRequestReducer from "./slice/emergencyRequest";
export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    sideBar: sidebarReducer,
    user: userReducer,
    emergencyRequest: emergencyRequestReducer,
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
