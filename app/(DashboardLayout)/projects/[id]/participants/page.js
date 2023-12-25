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
  Stack,
  CircularProgress,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { IconTrash } from "@tabler/icons-react";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import participationRole from "/constants/enums/participationRole";
import { getParticipationsByProjectId } from "api/projectParticipationServices";
import moment from "moment-timezone";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterComponent from "/components/shared/FilterStatus";
import { toast } from "react-toastify";
import UserCard from "/components/shared/UserCard";
import CreateParticipationModal from "/components/shared/Modals/Participations/CreateModal";
import DeleteModal from "/components/shared/Modals/Participations/DeleteModal";
import UpdateProjectOwnerParticipationModal from "/components/shared/Modals/Participations/UpdateProjectOwnerModal";
import UpdateProjectManagerParticipationModal from "/components/shared/Modals/Participations/UpdateProjectManagerModal";
import CreateNotificationModalForProject from "/components/shared/Modals/Notifications/CreateModalForProject";
import UpdateParticipationRoleModal from "/components/shared/Modals/Participations/UpdateParticipationRoleModal";

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
  const searchQuery = "search";

  const roleQuery = "role";
  const roleAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  // PARTICIPATIONS
  const [participations, setParticipations] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchParticipations = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const role = searchParams.get(roleQuery) || "";
      const page = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getParticipationsByProjectId({
          projectId,
          search,
          role,
          page,
          pageSize,
        });
        console.log(response);

        setParticipations(response?.paginatedList?.list ?? []);
        setCount(response?.paginatedList?.totalItem ?? 0);

        setProjectOwner(response?.productOwner ?? []);
        setProjectManager(response?.projectManager ?? []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Tài Liệu' từ hệ thống");
      }
    };
    await Promise.all([fetchParticipations()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              border: 1,
              borderColor: "gray",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ my: "auto" }}>
                Chủ dự án
              </Typography>
              <Box sx={{ display: "flex", mt: 2 }}>
                <UserCard
                  name={projectOwner?.user?.name ?? "Không tìm thấy"}
                  email={projectOwner?.user?.email ?? "..."}
                  phone={projectOwner?.user?.phone ?? "..."}
                ></UserCard>
              </Box>
            </Box>
            <Box borderColor="primary.main" padding={2}>
              <Box display="flex" alignItems="center">
                <UpdateProjectOwnerParticipationModal
                  participationId={projectOwner?.id}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card
            variant="outlined"
            sx={{
              p: 3,
              border: 1,
              borderColor: "gray",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ my: "auto" }}>
                Quản lý dự án
              </Typography>
              <Box sx={{ display: "flex", mt: 2 }}>
                <UserCard
                  name={projectManager?.user?.name ?? "Không tìm thấy"}
                  email={projectManager?.user?.email ?? "..."}
                  phone={projectManager?.user?.phone ?? "..."}
                ></UserCard>
              </Box>
            </Box>
            <Box borderColor="primary.main" padding={2}>
              <Box display="flex" alignItems="center">
                <UpdateProjectManagerParticipationModal
                  participationId={projectManager?.id}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Người tham gia dự án
      </Typography>
      {/* Table */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 4, mb: 1 }}
      >
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên.."></Search>

          <FilterComponent
            query={roleQuery}
            options={participationRole}
            label="Vai trò"
            allValue={roleAllValue}
            allLabel="Tất cả"
          ></FilterComponent>
        </Box>
        <Box sx={{ display: "flex" }}>
          <CreateNotificationModalForProject success={handleModalResult}>
            Gửi thông báo
          </CreateNotificationModalForProject>
          <CreateParticipationModal sx={{ ml: 1 }} success={handleModalResult}>
            Tạo
          </CreateParticipationModal>
        </Box>
      </Box>
      {(participations && participations.length) > 0 ? (
        <Table aria-label="simple table">
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Thành viên
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
            {participations &&
              participations.map((participant) => (
                <StyledTableRow key={participant.id}>
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
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <UpdateParticipationRoleModal participant={participant}>
                        <IconTrash></IconTrash>
                      </UpdateParticipationRoleModal>
                      <DeleteModal id={participant.id}>
                        <IconTrash></IconTrash>
                      </DeleteModal>
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
