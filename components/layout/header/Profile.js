import React, { useState } from "react";
import Link from "next/link";
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

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAvatarContent, getColorForAvatar } from "../../../utils/avatar";

const Profile = ({ name }) => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const router = useRouter();
  let isGoogleLoggedIn = false;

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const responseGoogle = () => {
    toast.success("Đăng xuất thành công!");
    router.push(`/authentication/engineer-login`);
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
      >
        <Avatar sx={{ bgcolor: getColorForAvatar(name), my: "auto" }}>
          {getAvatarContent(name)}
        </Avatar>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
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
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
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
          <Box>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default Profile;
