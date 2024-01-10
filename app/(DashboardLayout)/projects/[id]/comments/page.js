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
import { toast } from "react-toastify";
import moment from "moment-timezone";
import "moment/locale/vi";

import { getCommentsByProjectId } from "/services/commentServices";

import timezone from "/constants/timezone";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";

import { getAvatarContent, getColorForAvatar } from "/utils/avatar";

moment.tz.setDefault(timezone.momentDefault);
moment.locale(timezone.momentLocale);

export default function ProjectCommentsPage() {
  // CONSTANTS
  const searchQuery = "search";
  const pageQuery = "page";
  const defaultPage = 1;
  const pageSizeQuery = "pageSize";
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);

  const fetchComments = async () => {
    try {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      const response = await getCommentsByProjectId({
        projectId,
        search,
        page,
        pageSize,
      });
      setComments(response.list);
      setCount(response.totalItem);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Bình luận!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchComments()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

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
                <ListItemAvatar
                  color={getColorForAvatar(comment?.user?.name)}
                  sx={{ my: "auto" }}
                >
                  <Avatar alt="Remy Sharp">
                    {getAvatarContent(comment?.user?.name)}
                  </Avatar>
                </ListItemAvatar>
                <Box sx={{ width: "50%", my: "auto" }}>
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
                      {comment?.user?.name ?? ""}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mx: 1 }}>
                      -
                    </Typography>
                    <Typography variant="p">
                      {comment?.createdTime &&
                        moment(comment?.createdTime).format("lll")}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle2"
                    textAlign="justify"
                    sx={{ pr: 3 }}
                  >
                    {comment?.content ?? "N/A"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "25%",
                    my: "auto",
                    display: "flex",
                    borderLeft: 1,
                    borderLeftColor: "gainsboro",
                    px: 2,
                  }}
                >
                  <Image
                    src="/"
                    alt=""
                    width={75}
                    height={75}
                    unoptimized={true}
                    onError={(e) => {
                      e.target.src = "/images/results/no-file.png";
                    }}
                  ></Image>
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
                    width: "25%",
                    my: "auto",
                    display: "flex",
                    borderLeft: 1,
                    borderLeftColor: "gainsboro",
                    px: 2,
                  }}
                >
                  <Image
                    src="/"
                    alt=""
                    width={75}
                    height={75}
                    unoptimized={true}
                    onError={(e) => {
                      e.target.src = "/images/results/no-file.png";
                    }}
                  ></Image>
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
