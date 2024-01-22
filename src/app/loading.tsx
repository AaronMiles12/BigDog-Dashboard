import { LinearProgress, Typography } from "@mui/material/";
import Image from "next/image";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <Image
          src="/images/logos/logo.png"
          alt="logo"
          width={200}
          height={150}
          style={{
            marginBottom: "2rem",
          }}
        />
        <LinearProgress />
        <Typography
          variant="h3"
          fontWeight="600"
          style={{
            marginTop: "16px",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Loading...
        </Typography>
      </div>
    </div>
  );
};
export default Loading;
