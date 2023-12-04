"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export default function UserCard({
  name = "",
  address,
  email = ".@mail.com",
  phone = "0123456789",
}) {
  // SET AVATAR LETTER
  const getAvatarContent = (name) => {
    const words = name.split(" ");
    const lastWord = words.length > 0 ? words[words.length - 1] : "";
    const firstCharacter = lastWord.charAt(0).toUpperCase();
    return firstCharacter;
  };

  return (
    <Typography variant="subtitle2">
      <Box sx={{ display: "flex" }}>
        <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>
          {getAvatarContent(name)}
        </Avatar>
        <Box sx={{ my: "auto", mx: 2 }}>
          <Typography variant="h6">{name}</Typography>
          {address && (
            <Box>
              <Typography variant="subtitle2">{address}</Typography>
            </Box>
          )}
          <Typography variant="p" noWrap>{email}</Typography>
          <br />
          <Typography variant="p">{phone}</Typography>
          <br />
        </Box>
      </Box>
    </Typography>
  );
}
