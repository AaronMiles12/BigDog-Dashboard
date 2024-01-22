import { Avatar, Chip, Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const shimmerColumns: GridColDef[] = [
  {
    field: "Image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => <Skeleton variant="circular" width={50} height={50} />,
    cellClassName: "",
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 100,
    cellClassName: "",
    renderCell: (params) => {
      return <Skeleton variant="rectangular" width={100} height={25} />;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    renderCell: (params) => {
      return <Skeleton variant="rectangular" width={100} height={25} />;
    },
    cellClassName: "",
  },
  {
    field: "userType",
    headerName: "User Type",
    width: 150,
    renderCell: (params) => {
      // chips for user type
      return <Skeleton variant="rectangular" width={50} height={25} />;
    },
    cellClassName: "",
  },
  {
    field: "userDisabled",
    headerName: "Disabled",
    width: 120,
    renderCell: (params) => {
      return <Skeleton variant="rectangular" width={50} height={25} />;
    },
    cellClassName: "",
  },
  {
    field: "notificationOnAndOff",
    headerName: "Notifications",
    width: 150,
    renderCell: (params) => {
      return <Skeleton variant="rectangular" width={50} height={25} />;
    },
    cellClassName: "",
  },
];
export const userColumns: GridColDef[] = [
  {
    field: "Image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <Avatar
        alt={params.row.fullName}
        src={
          params.row.Image ||
          `https://ui-avatars.com/api/?name=${params.row.firstName.replace(" ", "+")}`
        }
      />
    ),
    cellClassName: "",
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 150,
    cellClassName: "",
  },

  { field: "identifier", headerName: "Email/Mobile Number", width: 250, cellClassName: "" },
  {
    field: "city",
    headerName: "City",
    width: 150,
    cellClassName: "",
  },
];
