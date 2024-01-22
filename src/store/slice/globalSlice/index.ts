import {
  PayloadAction,
  Slice,
  SliceCaseReducers,
  createSlice
} from '@reduxjs/toolkit';

interface IGlobalAppState {
  isAppLoaded: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  data: any;
  errorMessage: string;
  userDrawerOpen: boolean;
}

const initialState: IGlobalAppState = {
  isAppLoaded: false,
  isError: false,
  isSuccess: false,
  message: '',
  data: null,
  errorMessage: '',
  userDrawerOpen: false
};

const globalSlice: Slice<
  IGlobalAppState,
  SliceCaseReducers<IGlobalAppState>
> = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsAppLoaded: (state, action: PayloadAction<boolean>) => {
      state.isAppLoaded = action.payload;
    },
    setUserDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.userDrawerOpen = action.payload;
    }
  }
});

export const { setIsAppLoaded, setUserDrawerOpen } = globalSlice.actions;
export default globalSlice.reducer;
