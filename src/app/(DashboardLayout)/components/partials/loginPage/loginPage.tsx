"use client";
import { Grid, Box, Card } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../../auth/AuthLogin";
import styles from "./styles.module.scss";

const LoginPage = () => {
  return (
    <PageContainer title="BIG DOG | Login" description="BIG DOG | Login">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            backgroundColor: "#0e0e0e",
            position: "absolute",
            zIndex: "-1",
            height: "100%",
            width: "100%",
          },
        }}
      >
        <div className={styles.background}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Grid container spacing={0} sx={{ height: "100vh", position: "relative" }}>
          <Grid item display="flex" justifyContent="center" alignItems="center" width="100%">
            <div className={styles.leftContainer}></div>
            <Card className={styles.rightContainer} elevation={9}>
              <Box className={styles.logoContainer}>
                <Logo h={150} w={200} />
              </Box>
              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default LoginPage;
