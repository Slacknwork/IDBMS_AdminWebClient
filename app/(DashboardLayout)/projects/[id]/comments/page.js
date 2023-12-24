"use client";

import Image from "next/image";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";

// Component for displaying comments
export default function ProjectCommentsPage() {
  return (
    <Box sx={{ zIndex: 1 }}>
      <Search></Search>
      <List sx={{ mt: 1 }}>
        <ListItem alignItems="flex-start" sx={{ py: 2 }}>
          <ListItemAvatar sx={{ my: "auto" }}>
            <Avatar alt="Remy Sharp">N</Avatar>
          </ListItemAvatar>
          <Box sx={{ width: "40%", my: "auto" }}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                Thủy Ngọc Toàn
              </Typography>
              <Typography variant="subtitle2" sx={{ mx: 1 }}>
                -
              </Typography>
              <Typography variant="p">17/02/2023</Typography>
            </Box>
            <Typography variant="subtitle2" textAlign="justify" sx={{ pr: 3 }}>
              Chỉnh giúp anh cái vách màu trắng nhéChỉnh giúp anh cái vách màu
              trắng nhéChỉnh giúp anh cái vách màu trắng nhéChỉnh giúp anh cái
              vách màu trắng nhéChỉnh giúp anh cái vách màu trắng nhéChỉnh giúp
              anh cái vách màu trắng nhé
            </Typography>
          </Box>
          <Box
            sx={{
              width: "30%",
              my: "auto",
              display: "flex",
              borderLeft: 1,
              borderLeftColor: "gainsboro",
              px: 2,
            }}
          >
            <Image src="/" alt="" width={75} height={75}></Image>
            <Box sx={{ my: "auto", mx: 2 }}>
              <Typography
                variant="subtitle2"
                color="blue"
                sx={{ textDecoration: "underline" }}
              >
                Tên Item
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "30%",
              my: "auto",
              display: "flex",
              borderLeft: 1,
              borderLeftColor: "gainsboro",
              px: 2,
            }}
          >
            <Image src="/" alt="" width={75} height={75}></Image>
            <Box sx={{ my: "auto", mx: 2 }}>
              <Typography
                variant="subtitle2"
                color="blue"
                sx={{ textDecoration: "underline" }}
              >
                Tên task
              </Typography>
            </Box>
          </Box>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <Pagination count={0}></Pagination>
    </Box>
  );
}
