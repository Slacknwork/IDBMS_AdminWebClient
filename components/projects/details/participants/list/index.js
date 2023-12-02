"use client";

// Import necessary components and libraries
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import participationRole from "/constants/enums/participationRole";
import ParticipantModal from "./modal";

const participants = [
  {
    id: 1,
    project: { id: 1, name: "Project A" },
    user: { id: 1, name: "User A" },
    role: 0,
  },
  {
    id: 2,
    project: { id: 2, name: "Project B" },
    user: { id: 2, name: "User B" },
    role: 1,
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
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Card
            variant="outlined"
            sx={{ p: 3, border: 1, borderColor: "gray" }}
          >
            <Typography variant="h5" sx={{ my: "auto" }}>
              Chủ đầu tư
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>N</Avatar>
              <Box sx={{ my: "auto", mx: 2 }}>
                <Typography variant="h6">Anthony N</Typography>
                <Typography variant="p">anthony@mail.com</Typography>
                <br />
                <Typography variant="p">0123456789</Typography>
                <br />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card
            variant="outlined"
            sx={{ p: 3, border: 1, borderColor: "gray" }}
          >
            <Typography variant="h5" sx={{ my: "auto" }}>
              Quản lý dự án
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>N</Avatar>
              <Box sx={{ my: "auto", mx: 2 }}>
                <Typography variant="h6">Anthony N</Typography>
                <Typography variant="p">anthony@mail.com</Typography>
                <br />
                <Typography variant="p">0123456789</Typography>
                <br />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      {/* Table */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 4, mb: 1 }}
      >
        <Typography variant="h5">Các thành viên</Typography>
        <ParticipantModal>Thêm</ParticipantModal>
      </Box>
      <Table aria-label="simple table">
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Dự án
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Người dùng
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Vai trò
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {participants &&
            participants.map((participant) => (
              <StyledTableRow key={participant.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {participant.project?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {participant.user?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    <Chip label={participationRole[participant.role]}></Chip>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/participants/${participant.id}`}
                  >
                    Details
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {/* Table Pagination */}
      <TablePagination
        component="div"
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
