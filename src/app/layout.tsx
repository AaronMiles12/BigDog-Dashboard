"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Providers } from "@/store/provider";
import { io } from "socket.io-client";
import { useEffect, useMemo, useState } from "react";
import { getCookie } from "@/utils/getCookies";
import { SnackbarProvider } from "notistack";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          <SnackbarProvider maxSnack={3} />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <ApiProviders> */}
          <Providers>{children}</Providers>
          {/* </ApiProviders> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
