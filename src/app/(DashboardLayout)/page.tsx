"use client";
import React from "react";
import PageContainer from "./components/container/PageContainer";
import DashboardCard from "./components/shared/DashboardCard";
import UserListDataGrid from "./components/datagrid/userList";
import { useAppSelector } from "@/store/hooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { IUser } from "@/store/types/user";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { UserListHeader } from "./components/datagrid/headers/userListHeader";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import UserDetailDrawer from "./components/partials/UserDetail";
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
