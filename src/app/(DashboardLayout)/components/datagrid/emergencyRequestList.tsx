import { useLazyGetAllUsersQuery } from "@/store/apiSlice/user";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./styles/userList.scss";
import { IEmergencyRequest } from "@/store/types/emergencyRequest";
import { useLazyGetAllEmergencyRequestsQuery } from "@/store/apiSlice/emergencyRequest";
import {
  emergencyRequestColumns,
  emergencyRequestShimmerColumns,
} from "./columns/emergencyRequestColums";
import { setEmergencyList, setEmergencyLoading } from "@/store/slice/emergencyRequest";

interface IDefaultRows {
  _id: number;
}
const defaultRows: IDefaultRows[] = Array.from(Array(5).keys()).map((index) => ({
  _id: index,
}));

export default function EmergencyRequestListDataGrid() {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.emergencyRequest.list);

  const [getAllEmergencyRequests, { isLoading }] = useLazyGetAllEmergencyRequestsQuery();
  const placeHolderRows = defaultRows;
  useEffect(() => {
    // Dispatch the fetchAllUsers action to fetch user data
    try {
      const response = getAllEmergencyRequests({});
      response.then((res) => {
        const { data } = res as {
          isSuccess: boolean;
          data: IEmergencyRequest[] | undefined;
          error: any;
        };

        if (data) {
          dispatch(setEmergencyList(data));
          dispatch(setEmergencyLoading(false));
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, getAllEmergencyRequests]);
  return (
    <DataGrid
      rows={isLoading ? placeHolderRows : list}
      columns={isLoading ? emergencyRequestShimmerColumns : emergencyRequestColumns}
      getRowId={(row) => row._id} // Use _id as the unique id
      loading={isLoading}
    />
  );
}
