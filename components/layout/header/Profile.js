import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { IconUser, IconLogout } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logout } from "/store/reducers/user";
import { signOut } from "next-auth/react";

import { companyRoleConstants } from "/constants/enums/companyRole";

import { getAvatarContent, getColorForAvatar } from "/utils/avatar";

export default function Profile({ name }) {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  let isGoogleLoggedIn = false;

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleClickProfile = () => {
    router.push(
      user?.role === companyRoleConstants.ADMIN
        ? "/profile/admin"
        : "/profile/user"
    );
  };
  const handleLogout = async () => {
    dispatch(logout());
    const callbackUrl =
      user?.role && user?.role === companyRoleConstants.ADMIN
        ? "/authentication/login"
        : "/authentication/engineer-login";

    await signOut({ callbackUrl });
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar sx={{ bgcolor: getColorForAvatar(name), my: "auto" }}>
          {getAvatarContent(name)}
        </Avatar>
      </IconButton>
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        <MenuItem onClick={handleClickProfile}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Thông tin cá nhân</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <IconLogout width={20} />
          </ListItemIcon>
          <ListItemText>Đăng xuất</ListItemText>
        </MenuItem>

        {isGoogleLoggedIn ? (
          <Box mt={1} py={1} px={2}>
            <Button
              href="/authentication/login"
              variant="outlined"
              color="primary"
              component={Link}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Menu>
    </Box>
  );
}
