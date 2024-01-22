"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DashboardLayout from "./layout/DashboardLayout";
import LoginLayout from "./layout/LoginLayout";
import { setIsAppLoaded } from "@/store/slice/globalSlice";
import Loading from "./loading";
import { getCookie } from "@/utils/getCookies";
import { setAuthenticated, setError } from "@/store/slice/authSlice";
import LoginPage from "./components/partials/loginPage/loginPage";
import auth from "@/store/apiSlice/auth";

// RootLayout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  let isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // const [isValid, { data, error, isLoading }] = useLazyTokenValidateQuery(
  //   {} as any
  // );
  const dispatch = useAppDispatch();
  const isAppLoaded = useAppSelector((state) => state.global.isAppLoaded);

  useEffect(() => {
    const authToken = getCookie("authToken")?.replace("=", "");
    const refreshToken = getCookie("refreshToken");
    const lastChecked = new Date(getCookie("lastChecked")?.replace("=", "") as string);
    if (authToken && refreshToken) {
      if (lastChecked) {
        // const res = isValid({}, false)
        //   .then((res) => {
        //     dispatch(setAuthenticated(true));
        //     if (res.error) {
        //       throw new Error(res.error.message);
        //     }
        //   })
        //   .catch((err) => {
        //     dispatch(setAuthenticated(false));
        //   })
        //   .finally(() => {
        //     dispatch(setIsAppLoaded(true));
        //   });
        fetch("https://bigdog.thecloudlearner.com/token_valid", {
          headers: {
            Authorization: `${authToken}`,
            refreshToken,
            devicetoken: "deviceToken",
            userType: "Admin",
          },
        })
          .then((res) => {
            if (res.ok) {
              dispatch(setAuthenticated(true));
            } else {
              dispatch(setError("Session Expired"));
              throw new Error("Session Expired");
            }
          })
          .catch((err) => {
            dispatch(setAuthenticated(false));
          })
          .finally(() => {
            dispatch(setIsAppLoaded(true));
          });
      }
    } else {
      dispatch(setAuthenticated(false));
      dispatch(setIsAppLoaded(true));
    }
  }, [dispatch]);
  return !isAppLoaded ? (
    <Loading />
  ) : isAuthenticated ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <LoginLayout>
      <LoginPage />
    </LoginLayout>
  );
}
