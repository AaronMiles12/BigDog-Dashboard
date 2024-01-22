import { useLazyGetAllUsersQuery } from "@/store/apiSlice/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IUserExpanded, setCurrentSelectedUser, setUsers } from "@/store/slice/userSlice";
import { IUser } from "@/store/types/user";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import "./styles/userList.scss";
import { shimmerColumns, userColumns } from "./columns/userColumns";
import { setUserDrawerOpen } from "@/store/slice/globalSlice";

interface IDefaultRows {
  _id: number;
}
const defaultRows: IDefaultRows[] = Array.from(Array(5).keys()).map((index) => ({
  _id: index,
}));
interface IProps {
  filteredList: IUserExpanded[];
}
export default function UserListDataGrid({ filteredList }: IProps) {
  const dispatch = useAppDispatch();
  const [getAllUsers, { isLoading }] = useLazyGetAllUsersQuery();
  const placeHolderRows = defaultRows;
  useEffect(() => {
    // Dispatch the fetchAllUsers action to fetch user data
    try {
      const response = getAllUsers({});
      response.then((res) => {
        const { data } = res as {
          isSuccess: boolean;
          data: IUserExpanded[] | undefined;
          error: any;
        };
        if (data) {
          dispatch(setUsers(data));
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, getAllUsers]);
  return (
    <DataGrid
      rows={isLoading ? placeHolderRows : filteredList}
      columns={isLoading ? shimmerColumns : userColumns}
      onRowSelectionModelChange={(newSelection, details) => {
        if (!newSelection.length) {
          dispatch(setCurrentSelectedUser(null));
        }
        if (newSelection.length === 1) {
          const selectedUser = filteredList.find((user) => user._id === newSelection[0]);
          // dispatch the action to set the selected user as the current user
          dispatch(setCurrentSelectedUser(selectedUser as IUser));
          dispatch(setUserDrawerOpen(true));
        }
      }}
      checkboxSelection
      getRowId={(row) => row._id} // Use _id as the unique id
      loading={isLoading}
    />
  );
}
