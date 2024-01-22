// userSlice.ts
import { createSlice, createAsyncThunk, Slice, SliceCaseReducers } from "@reduxjs/toolkit";
import { useGetAllUsersQuery, useLazyGetAllUsersQuery } from "../../apiSlice/user";
import { IUser } from "@/store/types/user";

// Define an async thunk to fetch users using the lazy query
export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers", async () => {
  try {
    // console.log('fetching all users');
    const queryResult = useGetAllUsersQuery({});
    // console.log('query result', queryResult);
    return queryResult.data || [];
  } catch (error) {
    // console.log('error', error);
    throw error;
  }
});
export interface IUserExpanded extends IUser {
  identifier: string;
  fullName: string;
}
interface IUserState {
  list: IUserExpanded[];
  filteredList: IUserExpanded[];
  currentSelectedUser: null | IUserExpanded;
  selectedUsers: IUserExpanded[];
  loading: boolean;
  error: string | null;
}
const initialState: IUserState = {
  list: [] as IUserExpanded[],
  filteredList: [] as IUserExpanded[],
  currentSelectedUser: null as IUserExpanded | null,
  selectedUsers: [] as IUserExpanded[],
  loading: false,
  error: null as string | null,
};
const userSlice: Slice<IUserState, SliceCaseReducers<IUserState>> = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(
      state,
      action: {
        payload: IUser[];
      },
    ) {
      const users = action.payload.map((user) => {
        const { identifier: email, mobileNumber } = user.auth;
        const identifier = email || mobileNumber;
        return {
          ...user,
          fullName: `${user.firstName} ${user.lastName}`,
          identifier,
        } as IUserExpanded;
      });

      state.list = users;
      state.filteredList = users;
    },
    setFilteredList(
      state,
      action: {
        payload: IUserExpanded[];
      },
    ) {
      state.filteredList = action.payload;
    },
    setCurrentSelectedUser(
      state,
      action: {
        payload: IUserExpanded;
      },
    ) {
      state.currentSelectedUser = action.payload;
    },
    addUser(state, action) {
      state.list.push(action.payload);
    },
    removeUser(state, action) {
      state.list = state.list.filter((user) => user._id !== action.payload);
    },
    updateUser(state, action) {
      const { _id } = action.payload;
      const userIndex = state.list.findIndex((user) => user._id === _id);
      if (userIndex !== -1 && state.list[userIndex]) {
        state.list[userIndex] = action.payload;
      }
    },
  },
});

export const {
  setUsers,
  setFilteredList,
  addUser,
  removeUser,
  updateUser,
  setCurrentSelectedUser,
} = userSlice.actions;

export default userSlice.reducer;
