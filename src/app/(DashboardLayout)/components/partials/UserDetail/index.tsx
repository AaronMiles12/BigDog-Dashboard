import React, { useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { IUser } from "@/store/types/user";
import { setUserDrawerOpen } from "@/store/slice/globalSlice";

const UserDetailDrawer = () => {
  const selectedUser = useAppSelector((state) => state.user.currentSelectedUser);
  const dispatch = useAppDispatch();
  const userDrawer = useAppSelector((state) => state.global.userDrawerOpen);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(true);
  }, [setOpen]);
  if (!selectedUser) {
    return null;
  }
  const onClose = () => {
    dispatch(setUserDrawerOpen(false));
  };
  return (
    <Drawer
      anchor="right"
      open={userDrawer}
      onClose={onClose}
      style={{
        overflow: "scroll",
      }}
      PaperProps={{
        style: {
          padding: "4rem 2rem",
          overflow: "auto",
        },
      }}
    ></Drawer>
  );
};

export default UserDetailDrawer;
