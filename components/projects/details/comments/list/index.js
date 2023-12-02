"use client";

// Import necessary components and libraries
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import commentStatusOptions from "/constants/enums/commentStatus";

// Sample comments data
const comments = [
  {
    id: 1,
    projectTask: { name: "Task 1" },
    content: "This is the first comment.",
    user: { name: "User A" },
    createdTime: new Date("2023-01-15T10:30:00"),
    status: 0,
  },
  {
    id: 2,
    projectTask: { name: "Task 2" },
    content: "Another comment here.",
    user: { name: "User B" },
    createdTime: new Date("2023-02-05T14:45:00"),
    status: 1,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Component for displaying comments
export default function Comments() {
  const params = useParams();
  // Set state for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      {/* Table */}
      <Table aria-label="simple table">
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Công việc
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Nội dung
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Người dùng
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Thời gian tạo
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Trạng thái
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right">
            </StyledTableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {comments &&
            comments.map((comment) => (
              <StyledTableRow key={comment.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {comment.projectTask.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {comment.content}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {comment.user.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {comment.createdTime.toLocaleString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={commentStatusOptions[comment.status]}
                    color={comment.status === 0 ? "default" : "primary"}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/comments/${comment.id}`}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {/* Table Pagination */}
      <TablePagination
        component="div"
        count={comments.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
