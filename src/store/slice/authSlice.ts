import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { getCookie } from "@/utils/getCookies";
type AuthState = {
  authToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  storeToken: boolean;
  lastLogin: string | null;
  lastChecked: string | null;
  isLoading: boolean; // Add isLoading state
  errorMessage: null | string; // Add error state
  appLoaded: boolean;
};

// const initialState: AuthState = {
//   token: null,
//   isAuthenticated: document.cookie.includes('token') ? true : false,
//   storeToken: true,
//   lastLogin: null,
//   lastChecked: null,
//   isLoading: false, // Initialize isLoading as false
//   errorMessage: null // Initialize error as null
// };

const InitialAuthStateFactory = () => {
  const authToken = getCookie("authToken");
  const refreshToken = getCookie("refreshToken");

  return {
    authToken: authToken,
    refreshToken: refreshToken,
    isAuthenticated: authToken && authToken !== "" ? true : false,
    storeToken: true,
    lastLogin: null,
    lastChecked: null,
    isLoading: false, // Initialize isLoading as false
    errorMessage: null, // Initialize error as null
    appLoaded: authToken === null ? false : true,
  } as AuthState;
};
interface ITokenPayload {
  authToken: string;
  refreshToken: string;
}

const authSlice: Slice<AuthState, SliceCaseReducers<AuthState>> = createSlice({
  name: "auth",
  initialState: InitialAuthStateFactory(),
  reducers: {
    setToken: (state, action: PayloadAction<ITokenPayload | null>) => {
      if (state.storeToken) {
        document.cookie = `authToken=${action.payload?.authToken}; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
        document.cookie = `refreshToken=${action.payload?.refreshToken}; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
        document.cookie = `deviceToken=deviceToken; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
        document.cookie = `userType=Admin; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
      } else {
        document.cookie = `authToken=${action.payload?.authToken}; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
        document.cookie = `refreshToken=${action.payload?.refreshToken}; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
        document.cookie = `deviceToken=deviceToken; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
        document.cookie = `userType=Admin; path=/; expires=${new Date(
          Date.now() + 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()};`;
      }
      if (action.payload !== null) {
        state.authToken = action.payload.authToken ?? null;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.isAuthenticated = true;
        state.lastChecked = new Date().toISOString();
        state.lastLogin = new Date().toISOString();
        document.cookie = `lastChecked=${state.lastChecked}; path=/;}`;
        document.cookie = `lastLogin=${state.lastLogin}; path=/;}`;
      }
      state.authToken = action.payload?.authToken ?? null;
      state.refreshToken = action.payload?.refreshToken ?? null;
    },
    setStoreToken: (state, action: PayloadAction<boolean>) => {
      state.storeToken = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) {
        document.cookie = `token=; path=/; expires=${new Date(
          Date.now() - 14 * 24 * 60 * 60 * 1000,
        ).toUTCString()}`;
      }
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<null | string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setToken, setAuthenticated, setStoreToken, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
