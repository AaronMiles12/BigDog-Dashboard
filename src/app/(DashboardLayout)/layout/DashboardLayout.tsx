import { Box, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Sidebar from "./sidebar/Sidebar";
import { setMobileSidebarOpen, setSidebarOpen } from "@/store/slice/sidebarSlice";
import Header from "./header/Header";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { getCookie } from "@/utils/getCookies";
import { Socket, io } from "socket.io-client";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import NotificationCard from "../components/cards/notificationCard";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { removeEmergencyFromList } from "@/store/slice/emergencyRequest";
import { da } from "@faker-js/faker";
import { IEmergencyRequest } from "@/store/types/emergencyRequest";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export let socket: Socket | null = null;
let initialized = false;
function DashboardLayout({
  children,
}: // dispatch
{
  children: React.ReactNode;
  // dispatch: Dispatch<any>;
}) {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);
  const isMobileSidebarOpen = useAppSelector((state) => state.sideBar.isMobileSidebarOpen);
  const [isLoaded, setIsLoaded] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const extraHeaders = useMemo(() => {
    return {
      Authorization: authToken,
      refreshToken: refreshToken,
      devicetoken: "deviceToken",
      userType: "Admin",
    };
  }, [initialized]);
  socket = useMemo(() => {
    if (authToken && refreshToken) {
      return io("wss://bigdog.thecloudlearner.com/", {
        upgrade: false,
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: Infinity,
        agent: true,
        extraHeaders,
      });
    }
    return null;
  }, [initialized]);

  useEffect(() => {
    if (!isLoaded) {
      setAuthToken(getCookie("authToken")?.replace("=", "") ?? "");
      setRefreshToken(getCookie("refreshToken")?.replace("=", "") ?? "");
      setIsLoaded(true);
      initialized = true;
      return;
    }
    if (!socket) {
      if (authToken && refreshToken) {
        socket = io("wss://bigdog.thecloudlearner.com/", {
          upgrade: false,
          reconnection: true,
          reconnectionDelay: 500,
          reconnectionAttempts: Infinity,
          agent: true,
          extraHeaders: {
            Authorization: authToken,
            refreshToken: refreshToken,
            devicetoken: "deviceToken",
            userType: "Admin",
          },
        });
        socket.connect();
      }
    }
    if (socket) {
      socket.on("connect", () => {
        enqueueSnackbar("Connected to server", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          preventDuplicate: true,
          action: (key) => (
            <Button
              style={{ color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeSnackbar(key);
              }}
            >
              Close
            </Button>
          ),
        });
      });
      socket.on("newEmergencyRequest", (data) => {
        enqueueSnackbar(NotificationCard(data.request), {
          variant: "default",
          hideIconVariant: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 500000,
          action: (key) => {
            const { _id, requestedBy, location }: IEmergencyRequest = data.request;
            return (
              <div
                style={{
                  marginTop: "1.2rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "1rem",
                }}
              >
                <Button
                  type="button"
                  variant="contained"
                  onClick={() => openGoogleMap(location.coordinates[1], location.coordinates[0])}
                >
                  Open Map
                </Button>
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAccept(_id, requestedBy._id, dispatch);
                    closeSnackbar(key);
                  }}
                >
                  Accept
                </Button>
                <Button
                  variant={"outlined"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleReject(_id, requestedBy._id, dispatch);
                    closeSnackbar(key);
                  }}
                >
                  Reject
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeSnackbar(key);
                  }}
                >
                  Close
                </Button>
              </div>
            );
          },
        });
      });
      socket.on("acceptEmergencyRequestResponse", (data) => {
        if (data.error) {
          enqueueSnackbar(data.error, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      });
      socket.on("unauthorized", (data, ...args) => {
        enqueueSnackbar("Invalid Session", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      });
      socket.on("disconnect", () => {
        // enqueueSnackbar("Disconnected from server", {
        //   variant: "error",
        //   anchorOrigin: {
        //     vertical: "bottom",
        //     horizontal: "right",
        //   },
        // });
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket, isLoaded]);
  return (
    <MainWrapper className="mainwrapper">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => dispatch(setSidebarOpen(false))}
      />
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => dispatch(setMobileSidebarOpen(!isMobileSidebarOpen))} />
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
function openGoogleMap(latitude: Number, longitude: Number) {
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(mapUrl, "_blank");
}

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
  // console.log(`Rejected request with ID: ${requestId}`);
  socket?.emit("changeEmergencyRequestStatus", { requestId, requestedBy, status: false });
  dispatch(removeEmergencyFromList(requestId));
}

export default DashboardLayout;
