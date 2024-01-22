import { socket } from "@/app/(DashboardLayout)/layout/DashboardLayout";
import { useAppDispatch } from "@/store/hooks";
import { removeEmergencyFromList } from "@/store/slice/emergencyRequest";
import { Avatar, Button, Skeleton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { Dispatch } from "react";

export const emergencyRequestShimmerColumns: GridColDef[] = [
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
    field: "identifier",
    headerName: "Identifier",
    width: 150,
    renderCell: (params) => {
      return <Skeleton variant="rectangular" width={100} height={25} />;
    },
    cellClassName: "",
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    renderCell: (params) => {
      // chips for user type
      return <Skeleton variant="rectangular" width={50} height={25} />;
    },
    cellClassName: "",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <Skeleton variant="rectangular" width={50} height={25} />{" "}
          <Skeleton variant="rectangular" width={50} height={25} />
        </div>
      );
    },
    cellClassName: "",
  },
];
export const acceptedRequestShimmerColumns: GridColDef[] = [
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
    field: "identifier",
    headerName: "Identifier",
    width: 150,
    renderCell: (params) => {
      return <Skeleton variant="rectangular" width={100} height={25} />;
    },
    cellClassName: "",
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
    renderCell: (params) => {
      // chips for user type
      return <Skeleton variant="rectangular" width={50} height={25} />;
    },
    cellClassName: "",
  },
];
export const emergencyRequestColumns: GridColDef[] = [
  {
    field: "Image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <Avatar
        alt={params.row.requestedBy.firstName}
        src={
          params.row.Image ||
          `https://ui-avatars.com/api/?name=${params.row.requestedBy.firstName.replace(" ", "+")}`
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
    field: "location",
    headerName: "Location",
    width: 100,
    renderCell: (params) => (
      <Button
        type="button"
        variant="contained"
        onClick={() =>
          openGoogleMap(params.row.location.coordinates[1], params.row.location.coordinates[0])
        }
      >
        Open Map
      </Button>
    ),
  },
  {
    field: "Actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params) => {
      const dispatch = useAppDispatch();
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAccept(params.row._id, params.row.requestedBy._id, dispatch);
            }}
          >
            Accept
          </Button>
          <Button
            variant={"outlined"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleReject(params.row._id, params.row.requestedBy._id, dispatch);
            }}
          >
            Reject
          </Button>
        </div>
      );
    },
  },
];
export const acceptedRequestColumns: GridColDef[] = [
  {
    field: "Image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => (
      <Avatar
        alt={params.row.requestedBy.firstName}
        src={
          params.row.Image ||
          `https://ui-avatars.com/api/?name=${params.row.requestedBy.firstName.replace(" ", "+")}`
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
    field: "location",
    headerName: "Location",
    width: 100,
    renderCell: (params) => (
      <Button
        type="button"
        variant="contained"
        onClick={() =>
          openGoogleMap(params.row.location.coordinates[1], params.row.location.coordinates[0])
        }
      >
        Open Map
      </Button>
    ),
  },
];

// Function to open Google Maps
function openGoogleMap(latitude: Number, longitude: Number) {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapUrl, "_blank");
}

// Function to handle "Accept" button click
function handleAccept(
  requestId: string,
  requestedBy: string,
  dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>,
) {
  // Add code to handle the "Accept" action
  socket?.emit("changeEmergencyRequestStatus", { requestId, requestedBy, status: true });
  dispatch(removeEmergencyFromList(requestId));
}

// Function to handle "Reject" button click
function handleReject(
  requestId: string,
  requestedBy: string,
  dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>,
) {
  // Add code to handle the "Reject" action
  socket?.emit("changeEmergencyRequestStatus", { requestId, requestedBy, status: false });
  dispatch(removeEmergencyFromList(requestId));
}
