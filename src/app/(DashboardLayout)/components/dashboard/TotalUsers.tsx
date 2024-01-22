'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import DashboardCard from '../shared/DashboardCard';
import { Fab, Stack } from '@mui/material';
import { IconCurrencyDollar } from '@tabler/icons-react';

const TotalUsers = ({ userCount }: { userCount?: number }) => {
  return (
    <DashboardCard
      title={'TOTAL USERS'}
      action={
        <Fab color="primary" size="medium" sx={{ color: '#ffffff' }}>
          {userCount ? userCount : 0}
        </Fab>
      }
      footer={
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        ></Stack>
      }
    ></DashboardCard>
  );
};

export default TotalUsers;
