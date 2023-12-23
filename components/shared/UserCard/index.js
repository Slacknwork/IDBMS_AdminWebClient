"use client";

import { Avatar, Box, Typography } from "@mui/material";
import { amber, deepOrange, orange, teal, indigo, red, blue, pink, green, lime, purple, brown, black } from '@mui/material/colors';

export default function UserCard({
  sx,
  name = "",
  address,
  email = ".@mail.com",
  phone = "0123456789",
}) {
  // SET AVATAR LETTER
  const getAvatarContent = (name) => {
    if (name === "Không tìm thấy")
      return "?";

    const words = name.split(" ");
    const lastWord = words.length > 0 ? words[words.length - 1].charAt(0).toUpperCase() : "";
    const secondLastWord = words.length > 1 ? words[words.length - 2].charAt(0).toUpperCase() : "";

    return secondLastWord + lastWord;
  };

  //SET AVATAR COLOR
  const getColorForAvatar = (name) => {

    const avatarContent = getAvatarContent(name)

    if (avatarContent === "?")
      return black;

    const colorSeed = avatarContent
      .split('')
      .map((char) => char.charCodeAt())
      .reduce((sum, code) => sum + code, 0);

    const colors = [orange, amber, deepOrange, teal, indigo, red, blue, pink, green, lime, purple, brown];
    const color = colors[colorSeed % colors.length][500];

    return color || black;
  };

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
