"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";

import moment from "moment-timezone";
import "moment/locale/vi";

import {
  getCommentsByProjectId,
  deleteComment,
} from "/services/commentServices";

import timezone from "/constants/timezone";
import { companyRoleConstants } from "/constants/enums/companyRole";
import commentStatusOptions, {
  commentStatusIndex,
} from "/constants/enums/commentStatus";

import Search from "/components/shared/Search";
import MessageModal from "/components/shared/Modals/Message";
import ReplyCommentModal from "/components/shared/Modals/Comment/ReplyModal";

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

  const user = useSelector((state) => state.user);

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(null);
  const onChangeCommentMenuOpen = (comment) => {
    isCommentMenuOpen === comment?.id
      ? setIsCommentMenuOpen(null)
      : setIsCommentMenuOpen(comment.id);
  };

  // FETCH DATA FROM API
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);

  const fetchComments = async () => {
    try {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;

      const response = await getCommentsByProjectId({
        projectId,
        search,
        page,
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

  const onDeleteReplyComment = async (comment) => {
    try {
      await deleteComment(comment?.id, params.id);
      toast.success("Đã xóa phản hồi!");
      fetchData();
    } catch (error) {
      toast.error("Lỗi xóa phản hồi!");
    }
  };

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
                  <Avatar
                    sx={{ bgcolor: getColorForAvatar(comment?.user?.name) }}
                    alt="Remy Sharp"
                  >
                    {getAvatarContent(comment?.user?.name)}
                  </Avatar>
                </ListItemAvatar>
                <Box
                  sx={{
                    width: "75%",
                    pr: 3,
                    my: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
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
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {user?.role &&
                        user?.role !== companyRoleConstants.ADMIN && (
                          <ReplyCommentModal
                            sx={{ my: "auto" }}
                            comment={comment}
                            success={fetchData}
                          ></ReplyCommentModal>
                        )}
                    </Box>
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
                  <Box
                    sx={{
                      width: "100%",
                      my: "auto",
                      mx: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">
                        {comment?.projectTask?.code}
                      </Typography>
                      <Typography variant="p">
                        {comment?.projectTask?.name}
                      </Typography>
                    </Box>
                    <Box sx={{ my: "auto" }}>
                      <IconButton
                        component={Link}
                        href={`/projects/${params.id}/tasks/${comment?.projectTaskId}`}
                      >
                        <VisibilityIcon></VisibilityIcon>
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
              {comment?.commentReplies &&
                comment?.commentReplies.length > 0 &&
                comment?.commentReplies.map((commentReply) => (
                  <Box key={commentReply.id}>
                    <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                      <Box sx={{ width: "5%" }}></Box>
                      <ListItemAvatar sx={{ my: "auto" }}>
                        <Avatar
                          sx={{
                            bgcolor: getColorForAvatar(comment?.user?.name),
                          }}
                          alt="Remy Sharp"
                        >
                          {getAvatarContent(commentReply?.user?.name)}
                        </Avatar>
                      </ListItemAvatar>
                      <Box
                        sx={{
                          width: "65%",
                          my: "auto",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Box sx={{ display: "flex" }}>
                            <Typography
                              variant="h6"
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              {commentReply?.user?.name ?? ""}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ mx: 1 }}>
                              -
                            </Typography>
                            <Typography variant="p">
                              {commentReply?.createdTime &&
                                moment(commentReply?.createdTime).format("lll")}
                            </Typography>
                            <Typography variant="p" sx={{ ml: 1 }}>
                              {commentStatusIndex.Edited ===
                                commentReply?.status &&
                                `(${
                                  commentStatusOptions[commentReply.status]
                                })`}
                            </Typography>
                          </Box>
                          <Typography
                            variant="subtitle2"
                            textAlign="justify"
                            sx={{ pr: 3 }}
                          >
                            {commentReply?.content ?? "N/A"}
                          </Typography>
                        </Box>
                        {user?.role &&
                          user?.role !== companyRoleConstants.ADMIN && (
                            <Box sx={{ my: "auto", mr: 1, display: "flex" }}>
                              {isCommentMenuOpen === commentReply.id && (
                                <Box
                                  sx={{ my: "auto", mr: 1, display: "flex" }}
                                >
                                  <ReplyCommentModal
                                    sx={{ mr: "3px" }}
                                    comment={comment}
                                    success={fetchData}
                                    isEdit
                                    commentReply={commentReply}
                                  ></ReplyCommentModal>
                                  <MessageModal
                                    buttonLabel="Xóa"
                                    color="error"
                                    submitLabel="Xóa"
                                    onSubmit={() =>
                                      onDeleteReplyComment(commentReply)
                                    }
                                  >
                                    Xóa phản hồi này?
                                  </MessageModal>
                                </Box>
                              )}
                              <IconButton
                                onClick={() =>
                                  onChangeCommentMenuOpen(commentReply)
                                }
                              >
                                <MoreHorizIcon></MoreHorizIcon>
                              </IconButton>
                            </Box>
                          )}
                      </Box>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Box>
                ))}
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
      {/* <Pagination count={count}></Pagination> */}
    </Box>
  );
}
