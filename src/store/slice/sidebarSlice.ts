import {
  createSlice,
  PayloadAction,
  Slice,
  SliceCaseReducers
} from '@reduxjs/toolkit';

type SidebarState = {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
};

const initialState: SidebarState = {
  isSidebarOpen: true,
  isMobileSidebarOpen: false
};

const sidebarSlice: Slice<
  SidebarState,
  SliceCaseReducers<SidebarState>
> = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileSidebarOpen = action.payload;
    }
  }
});

export const { setSidebarOpen, setMobileSidebarOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
