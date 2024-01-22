import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserDrawerOpen } from "@/store/slice/globalSlice";
import { AccountCircle, AutoGraph, Circle, Close } from "@mui/icons-material";
import { Avatar, Button, Card, CardContent, Chip, Divider, Grid, Typography } from "@mui/material";
import "./style.scss";
import { IUser } from "@/store/types/user";

const label = (
  <span>
    <Circle className="child-chip user-type-chip" />
    User Type: Child
  </span>
);
export default function UserDetail() {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.user.currentSelectedUser) as IUser;

  const { firstName, lastName, auth } = selectedUser;
  const { identifier: email, mobileNumber: phoneNumber } = auth;
  const fullName = `${firstName} ${lastName}`;
  const onClose = () => {
    dispatch(setUserDrawerOpen(false));
  };
  return (
    <div className="drawer-container">
      <div className="drawer-header">
        <Typography variant="subtitle1" className="title-chip">
          <Chip label={label} title="User Type" />
        </Typography>
        <Button variant="text" onClick={onClose}>
          <Close fontSize="small" />
        </Button>
      </div>
      <div className="drawer-user-profile-container">
        {/* <Avatar alt={fullName} src={img} className="user-profile-image" /> */}
        <Typography variant="h6" className="user-name">
          {fullName}
        </Typography>
        <Typography variant="h6" className="user-email">
          {email}
        </Typography>
        <div className="action-container">
          <Button
            variant="contained"
            style={{
              color: "white",
            }}
          >
            <AccountCircle
              fontSize="small"
              style={{
                marginRight: "0.25rem",
              }}
            />{" "}
            Some Button
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
            }}
          >
            <AccountCircle
              fontSize="small"
              style={{
                marginRight: "0.25rem",
              }}
            />{" "}
            Some Button
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
            }}
          >
            <AccountCircle
              fontSize="small"
              style={{
                marginRight: "0.25rem",
              }}
            />{" "}
            Some Button
          </Button>
        </div>
      </div>
      <Card elevation={3} className="drawer-card">
        <CardContent className="drawer-card-content">
          <div className="user-detail-entry-container">
            <Typography variant="h6" gutterBottom>
              Mobile Number:
            </Typography>
            <Typography variant="body1" display="inline-block" alignItems={"center"}>
              + {phoneNumber ?? "N/A"}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
