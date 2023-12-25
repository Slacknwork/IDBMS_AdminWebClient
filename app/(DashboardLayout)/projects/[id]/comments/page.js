"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";

import { getCommentsByProjectId } from "/api/commentServices";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";
import { toast } from "react-toastify";

// Component for displaying comments
export default function ProjectCommentsPage() {
  // CONSTANTS

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const projectId = params.id;
      const response = await getCommentsByProjectId({ projectId });
      setComments(response.list);
      setCount(response.totalItem);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Bình luận!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Box sx={{ zIndex: 1 }}>
      <Search placeholder="Tìm bình luận.."></Search>
      <List>
        {loading ? (
          <Stack sx={{ my: 5 }}>
            <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
          </Stack>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <Box key={comment.id}>
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
                  <Typography
                    variant="subtitle2"
                    textAlign="justify"
                    sx={{ pr: 3 }}
                  >
                    Chỉnh giúp anh cái vách màu trắng nhéChỉnh giúp anh cái vách
                    màu trắng nhéChỉnh giúp anh cái vách màu trắng nhéChỉnh giúp
                    anh cái vách màu trắng nhéChỉnh giúp anh cái vách màu trắng
                    nhéChỉnh giúp anh cái vách màu trắng nhé
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
            </Box>
          ))
        ) : (
          <Stack sx={{ my: 5 }}>
            <Typography variant="p" sx={{ textAlign: "center" }}>
              Không có dữ liệu.
            </Typography>
          </Stack>
        )}
      </List>
      <Pagination count={count}></Pagination>
    </Box>
  );
}
