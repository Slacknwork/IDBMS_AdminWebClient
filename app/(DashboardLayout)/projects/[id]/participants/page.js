"use client";

// Import necessary components and libraries
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { IconTrash } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment-timezone";

import participationRoleOptions, {
  participationRoleIndex,
} from "/constants/enums/participationRole";
import { companyRoleIndex } from "/constants/enums/companyRole";
import timezone from "/constants/timezone";
moment.tz.setDefault(timezone.momentDefault);

import { getParticipationsByProjectId } from "/services/projectParticipationServices";
import { getAvailableUsersForProject } from "/services/userServices";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterComponent from "/components/shared/FilterStatus";
import UserCard from "/components/shared/UserCard";
import CreateParticipationModal from "/components/shared/Modals/Participations/CreateModal";
import DeleteModal from "/components/shared/Modals/Participations/DeleteModal";
import UpdateParticipationModal from "/components/shared/Modals/Participations/UpdateParticipationModal";
import CreateNotificationModalForProject from "/components/shared/Modals/Notifications/CreateModalForProject";
import UpdateParticipationRoleModal from "/components/shared/Modals/Participations/UpdateParticipationRoleModal";
import { companyRoleConstants } from "/constants/enums/companyRole";

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
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const participationRole = data?.projectRole;

  // CONSTANTS
  const searchQuery = "search";

  const roleQuery = "role";
  const roleAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const project = data?.project;

  // PARTICIPATIONS
  const [participations, setParticipations] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH PARTICIPATIONS DATA
  const fetchParticipations = async () => {
    try {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const role = searchParams.get(roleQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      const participations = await getParticipationsByProjectId({
        projectId,
        search,
        role,
        page,
        pageSize,
      });

      setParticipations(participations?.paginatedList?.list ?? []);
      setCount(participations?.paginatedList?.totalItem ?? 0);

      setProjectOwner(participations?.productOwner ?? []);
      setProjectManager(participations?.projectManager ?? []);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Thành viên' từ hệ thống");
    }
  };

  // AVAILABLE USERS
  const [usersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState(companyRoleIndex.Customer);
  const [userCount, setUserCount] = useState(0);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(defaultPage);

  const [isAdminAuthorized, setIsAdminAuthorized] = useState(false);
  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    setIsAdminAuthorized(
      user?.role && user?.role === companyRoleConstants.ADMIN
    );
    setIsManager(
      (user?.role && user?.role === companyRoleConstants.ADMIN) ||
        (participationRole?.role &&
          participationRole?.role === participationRoleIndex.ProjectManager)
    );
  }, [participationRole?.role, user?.role]);

  // FETCH AVAILABLE USERS DATA
  const fetchAvailableUsers = async ({ setRole } = {}) => {
    if (!isAdminAuthorized) return;
    try {
      const projectId = params.id;
      const search = userSearch;
      const role = setRole ?? userRole;
      const page = userPage;

      const availableUsers = await getAvailableUsersForProject({
        projectId,
        search,
        role,
        page,
      });

      setUsers(availableUsers);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Danh sách người dùng' từ hệ thống");
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    await Promise.all([fetchParticipations()]);
    setLoading(false);
  };

  const fetchAvailableUsersData = async () => {
    setUsersLoading(true);
    await Promise.all([fetchAvailableUsers()]);
    setUsersLoading(false);
  };

  const onOpenModal = (role) => {
    setUserRole(role);
  };

  useEffect(() => {
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    fetchAvailableUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole, userSearch, userPage]);

  const handleModalResult = () => {
    fetchDataFromApi();
    fetchAvailableUsersData();
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
                  name={projectOwner?.user?.name || "Không tìm thấy"}
                  email={projectOwner?.user?.email || "..."}
                  phone={projectOwner?.user?.phone || "..."}
                ></UserCard>
              </Box>
            </Box>
            <Box borderColor="primary.main" padding={2}>
              <Box display="flex" alignItems="center">
                {isAdminAuthorized && (
                  <UpdateParticipationModal
                    participationId={projectOwner?.id}
                    participationRole={participationRoleIndex.ProductOwner}
                    currentUserId={projectOwner?.user?.id}
                    users={users}
                    loading={usersLoading}
                    search={userSearch}
                    setSearch={setUserSearch}
                    handleOpen={() => onOpenModal(companyRoleIndex.Customer)}
                    success={handleModalResult}
                  />
                )}
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
                  name={projectManager?.user?.name || "Không tìm thấy"}
                  email={projectManager?.user?.email || "..."}
                  phone={projectManager?.user?.phone || "..."}
                ></UserCard>
              </Box>
            </Box>
            <Box borderColor="primary.main" padding={2}>
              <Box display="flex" alignItems="center">
                {isAdminAuthorized && (
                  <UpdateParticipationModal
                    participationId={projectManager?.id}
                    participationRole={participationRoleIndex.ProjectManager}
                    currentUserId={projectManager?.user?.id}
                    users={users}
                    loading={usersLoading}
                    search={userSearch}
                    setSearch={setUserSearch}
                    handleOpen={() => onOpenModal((project?.type ?? 0) + 1)}
                    success={handleModalResult}
                  />
                )}
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
            options={participationRoleOptions}
            label="Vai trò"
            allValue={roleAllValue}
            allLabel="Tất cả"
          ></FilterComponent>
        </Box>
        <Box sx={{ display: "flex" }}>
          {/*isAdminAuthorized && (
            <CreateNotificationModalForProject success={handleModalResult}>
              Gửi thông báo
            </CreateNotificationModalForProject>
          )*/}
          {isManager && (
            <UpdateParticipationModal
              sx={{ mr: 1 }}
              buttonLabel="Thêm thành viên"
              title="Thêm thành viên"
              participationRole={(project?.type ?? 0) + 2}
              users={users.filter(
                (user) =>
                  user?.id &&
                  user?.id !== projectManager?.userId &&
                  user?.id !== projectOwner?.userId
              )}
              loading={usersLoading}
              search={userSearch}
              setSearch={setUserSearch}
              handleOpen={() => onOpenModal((project?.type ?? 0) + 1)}
              success={handleModalResult}
            />
          )}
          {isManager && (
            <UpdateParticipationModal
              buttonLabel="Thêm người xem"
              title="Thêm người xem"
              participationRole={participationRoleIndex.Viewer}
              users={users.filter(
                (user) =>
                  user?.id &&
                  user?.id !== projectManager?.userId &&
                  user?.id !== projectOwner?.userId
              )}
              loading={usersLoading}
              search={userSearch}
              setSearch={setUserSearch}
              handleOpen={() => onOpenModal()}
              success={handleModalResult}
            />
          )}
          {/* <CreateParticipationModal
            sx={{ ml: 1 }}
            success={handleModalResult}
            list={users}
          >
            Tạo
          </CreateParticipationModal> */}
        </Box>
      </Box>
      {loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : (participations && participations.length) > 0 ? (
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
                      <Chip
                        label={participationRoleOptions[participant.role]}
                      ></Chip>
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <UpdateParticipationRoleModal
                        participant={participant}
                        success={handleModalResult}
                      >
                        <IconTrash></IconTrash>
                      </UpdateParticipationRoleModal>
                      <DeleteModal
                        id={participant.id}
                        success={handleModalResult}
                      >
                        <IconTrash></IconTrash>
                      </DeleteModal>
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
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
