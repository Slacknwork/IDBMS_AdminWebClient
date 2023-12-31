"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { getAvatarContent, getColorForAvatar } from "/utils/avatar"

export default function UserCard({
  sx,
  name = "",
  address,
  email = ".@mail.com",
  phone = "0123456789",
}) {

  return (
    <Typography variant="subtitle2">
      <Box sx={{ ...sx, display: "flex" }}>
        <Avatar sx={{ bgcolor: getColorForAvatar(name), my: "auto" }}>
          {getAvatarContent(name)}
        </Avatar>
        <Box sx={{ my: "auto", mx: 2 }}>
          <Typography variant="h6">{name}</Typography>
          {address && (
            <Box>
              <Typography variant="subtitle2">{address}</Typography>
            </Box>
          )}
          <Typography variant="p" noWrap>
            {email}
          </Typography>
          <br />
          <Typography variant="p">{phone}</Typography>
          <br />
        </Box>
      </Box>
    </Typography>
  );
}
