"use client";
import { Typography } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import EmergencyRequestListDataGrid from "../components/datagrid/emergencyRequestList";

export default function EmergencyRequest() {
  return (
    <PageContainer description="Emergency request">
      <DashboardCard>
        <>
          <Typography variant="h1">Emergency Request</Typography>
          <EmergencyRequestListDataGrid />
        </>
      </DashboardCard>
    </PageContainer>
  );
}
