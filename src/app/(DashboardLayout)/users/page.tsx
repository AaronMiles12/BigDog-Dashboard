"use client";
// import React, { useEffect } from 'react';
// import PageContainer from '../components/container/PageContainer';
// import DashboardCard from '../components/shared/DashboardCard';
// import { setUsers } from '@/store/slice/userSlice';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { useLazyGetAllUsersQuery } from '@/store/apiSlice/user';
// import { IUser } from '@/store/types/user';

// export default function Page() {
//   const dispatch = useAppDispatch();
//   const [getAllUsers, { error, isLoading, data }] = useLazyGetAllUsersQuery({});
//   const userList = useAppSelector((state) => state.user.list);
//   useEffect(() => {
//     // Dispatch the fetchAllUsers action to fetch user data
//     try {
//       const response = getAllUsers({}).then((res) => {
//         const { isSuccess, data, error } = res as {
//           isSuccess: boolean;
//           data: IUser[] | undefined;
//           error: any;
//         };
//         if (data) {
//           dispatch(setUsers(data));
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }, [dispatch]);
//   return (
//     <PageContainer title="BIG DOG | Users" description="this is Sample page">
//       <DashboardCard title="USERS">
//         {userList.map((el: IUser) => {
//           return el.fullName;
//         })}
//       </DashboardCard>
//     </PageContainer>
//   );
// }

// import React, { useEffect } from 'react';
// import PageContainer from '../components/container/PageContainer';
// import DashboardCard from '../components/shared/DashboardCard';
// import { setUsers } from '@/store/slice/userSlice';
// import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { useLazyGetAllUsersQuery } from '@/store/apiSlice/user';
// import { IUser } from '@/store/types/user';
// import { DataGrid, GridColDef } from '@mui/x-data-grid'; // Import MUI DataGrid components
// import { Avatar, Tooltip } from '@mui/material'; // Import Avatar and Tooltip components

// export default function Page() {
//   const dispatch = useAppDispatch();
//   const [getAllUsers, { error, isLoading, data }] = useLazyGetAllUsersQuery();
//   const userList = useAppSelector((state) => state.user.list);

//   useEffect(() => {
//     // Dispatch the fetchAllUsers action to fetch user data
//     try {
//       const response = getAllUsers({});
//       response.then((res) => {
//         const { isSuccess, data, error } = res as {
//           isSuccess: boolean;
//           data: IUser[] | undefined;
//           error: any;
//         };
//         if (data) {
//           dispatch(setUsers(data));
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }, [dispatch]);
//   const userListWithIds = userList.map((user, index) => ({
//     ...user,
//     id: user._id || index // Use _id as the id if available, otherwise use the index
//   }));
//   // Define the columns for the DataGrid
//   const columns: GridColDef[] = [
//     {
//       field: 'Image',
//       headerName: 'Image',
//       width: 100,
//       renderCell: (params: any) => (
//         <Avatar
//           alt={params.row.fullName}
//           src={params.row.Image || '/fallback-image.png'}
//         />
//       )
//     },
//     { field: 'fullName', headerName: 'Full Name', width: 200 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'userType', headerName: 'User Type', width: 150 },
//     { field: 'isActive', headerName: 'Status', width: 120 },
//     { field: 'userDisabled', headerName: 'Disabled', width: 120 },
//     { field: 'notificationOnAndOff', headerName: 'Notifications', width: 150 }
//   ];

//   return (
//     <PageContainer title="BIG DOG | Users" description="this is Sample page">
//       <DashboardCard title="USERS">
//         <div style={{ height: 'auto', width: '100%' }}>
//           <DataGrid
//             rows={userListWithIds}
//             columns={columns}
//             filterMode="client"
//           />
//         </div>
//       </DashboardCard>
//     </PageContainer>
//   );
// }

import React from "react";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import UserListDataGrid from "../components/datagrid/userList";
import { useAppSelector } from "@/store/hooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IUser } from "@/store/types/user";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { UserListHeader } from "../components/datagrid/headers/userListHeader";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import UserDetailDrawer from "../components/partials/UserDetail";
import { setFilteredList } from "@/store/slice/userSlice";

export default function Page() {
  // Define the columns for the DataGrid

  const userList = useAppSelector((state) => state.user.list);
  const filteredList = useAppSelector((state) => state.user.filteredList);
  return (
    <PageContainer title="BIG DOG | Users" description="List Of current app users">
      <DashboardCard>
        <>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
              <UserListHeader
                heading={"Users"}
                userList={userList}
                setUserList={
                  setFilteredList as ActionCreatorWithPayload<IUser[], `${string}/${string}`>
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <UserListDataGrid filteredList={filteredList} />
            </AccordionDetails>
          </Accordion>
          <UserDetailDrawer />
        </>
      </DashboardCard>
    </PageContainer>
  );
}
