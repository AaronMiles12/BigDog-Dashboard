import { useAppDispatch } from "@/store/hooks";
import { IUser } from "@/store/types/user";
import { Search } from "@mui/icons-material";
import {
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";

interface IState {
  searchText: string;
  isFiltering: boolean;
  searchBy: "fullName" | "email";
  isFocused: boolean;
}
interface IProps {
  heading?: string;
  userList: IUser[];
  setUserList: ActionCreatorWithPayload<IUser[], `${string}/${string}`>;
}
export function UserListHeader({ userList, setUserList, heading }: IProps) {
  const dispatch = useAppDispatch();
  const defaultList = userList;
  const [{ searchText, isFiltering, searchBy, isFocused }, setState] = useState<IState>({
    searchText: "",
    isFiltering: false,
    searchBy: "fullName",
    isFocused: false,
  });
  return (
    <div
      className="top-container"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Typography variant="h5">{heading ?? "Users"}</Typography>
      <div className="search-container">
        <TextField
          label="Search by..."
          variant="standard"
          value={searchText}
          autoComplete={"off"}
          onFocus={(e) => {
            e.stopPropagation();
            setState((prevState) => ({ ...prevState, isFocused: true }));
          }}
          onBlur={() => {
            setState((prevState) => ({
              ...prevState,
              isFocused: false,
              isFiltering: false,
            }));
          }}
          onChange={(e) => {
            const filteredUserList = userList;
            dispatch(setUserList(filteredUserList));
            setState((prevState) => ({
              ...prevState,
              searchText: e.target.value,
              isFiltering: true,
            }));
          }}
          onEmptied={() => {
            dispatch(setUserList(defaultList));
            setState((prevState) => ({
              ...prevState,
              searchText: "",
              isFiltering: false,
            }));
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isFiltering ? (
                  <CircularProgress size={20} />
                ) : (
                  <Search {...(isFocused ? { color: "primary" } : {})} />
                )}
              </InputAdornment>
            ),
            className: "search-input",
          }}
        />
        <Select
          variant="standard"
          className="search-select"
          onChange={(e) => {
            return setState((prevState) => ({
              ...prevState,
              searchBy: e.target.value as "fullName" | "email",
            }));
          }}
          value={searchBy}
        >
          <MenuItem value="fullName">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
        </Select>
      </div>
    </div>
  );
}
