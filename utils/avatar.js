import {
  amber,
  deepOrange,
  orange,
  teal,
  indigo,
  red,
  blue,
  pink,
  green,
  lime,
  purple,
  brown,
  grey,
} from "@mui/material/colors";

function getAvatarContent(name) {
  if (
    name === "Không tìm thấy" ||
    name === null ||
    name === undefined ||
    typeof name !== "string"
  )
    return "?";

  const words = name.split(" ");
  const lastWord =
    words.length > 0 ? words[words.length - 1].charAt(0).toUpperCase() : "";
  const secondLastWord =
    words.length > 1 ? words[words.length - 2].charAt(0).toUpperCase() : "";

  return secondLastWord + lastWord;
}

function getColorForAvatar(name) {
  const avatarContent = getAvatarContent(name);

  if (avatarContent === "?") return grey[50];

  const colorSeed = avatarContent
    .split("")
    .map((char) => char.charCodeAt())
    .reduce((sum, code) => sum + code, 0);

  const colors = [
    orange,
    amber,
    deepOrange,
    teal,
    indigo,
    red,
    blue,
    pink,
    green,
    lime,
    purple,
    brown,
  ];
  const color = colors[colorSeed % colors.length][500];

  return color || grey[50];
}

export { getAvatarContent, getColorForAvatar };
