"use client";

import Image from "next/image";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  Box,
  Chip,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import {
  getTaskAssignmentsByProjectId,
  deleteTaskAssignment,
} from "/services/taskAssignmentServices";

import participationRoleOptions from "/constants/enums/participationRole";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import CreateTaskAssignmentModal from "/components/shared/Modals/TaskAssignment/CreateModal";
import UserCard from "/components/shared/UserCard";
import MessageModal from "/components/shared/Modals/Message";

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

export default function TaskAssignments() {
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // FETCH DATA
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchDataFromApi = async () => {
    setLoading(true);
    try {
      const projectId = params.id;
      const projectTaskId = params.taskId;
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      const response = await getTaskAssignmentsByProjectId({
        projectTaskId,
        projectId,
        search,
        page,
        pageSize,
      });
      setAssignments(response?.list ?? []);
      setCount(response?.totalItem ?? 0);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi nạp dữ liệu 'Phân công' từ hệ thống");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const onDeleteTaskAssignment = async (id) => {
    try {
      const projectId = params.id;
      await deleteTaskAssignment(id, projectId);
      toast.success("Xóa thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi xóa phân công!");
    }
  };

  return (
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên.."></Search>
        </Box>
        <CreateTaskAssignmentModal
          selectedTasks={[params.taskId]}
          success={fetchDataFromApi}
        ></CreateTaskAssignmentModal>
      </Box>
      {(assignments && assignments.length) > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell width={"40%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên người dùng
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"40%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Vai trò
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}></Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments &&
              assignments.map((assignment) => (
                <StyledTableRow key={assignment?.id}>
                  <TableCell>
                    <UserCard
                      name={assignment?.projectParticipation?.user?.name}
                      email={assignment?.projectParticipation?.user?.email}
                      phone={assignment?.projectParticipation?.user?.phone}
                    ></UserCard>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        participationRoleOptions[
                          assignment?.projectParticipation?.role
                        ]
                      }
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <MessageModal
                        color="error"
                        buttonLabel="Xóa"
                        submitLabel="Xóa"
                        onSubmit={() => onDeleteTaskAssignment(assignment.id)}
                      >
                        Xóa phân công?
                      </MessageModal>
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      ) : loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : (
        <Stack sx={{ my: 5 }}>
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Không có dữ liệu.
          </Typography>
        </Stack>
      )}
      <Pagination count={count}></Pagination>
    </Box>
  );
}
