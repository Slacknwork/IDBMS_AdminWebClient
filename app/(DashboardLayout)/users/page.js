"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
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
import { toast } from "react-toastify";

import { getAllUsers } from "/services/userServices";

import userStatusOptions from "/constants/enums/userStatus";
import companyRoleOptions from "/constants/enums/companyRole";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";
import FilterStatus from "/components/shared/FilterStatus";
import PageContainer from "/components/container/PageContainer";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import CreateUserModal from "/components/shared/Modals/Users/CreateModal";
import CreateNotificationModalForAllCustomers from "/components/shared/Modals/Notifications/CreateModalForAllCustomers";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserList() {
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const defaultStatus = [0, 1, 2, 3];

  const statusQuery = "status";
  const statusLabel = "Trạng thái";
  const statusAllValue = -1;
  const statusAllLabel = "Tất cả";

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchUsers = async () => {
      const nameOrEmail = searchParams.get(searchQuery) || "";
      const status = searchParams.get(statusQuery) || "";
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getAllUsers({
          nameOrEmail,
          status,
          pageSize,
          pageNo,
        });
        console.log(response);
        setUsers(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Người Dùng' từ hệ thống");
      }
    };
    await Promise.all([fetchUsers()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  };

  return (
    <PageContainer
      title={"Danh sách người dùng"}
      description={"Danh sách người dùng"}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Search placeholder="Nhập tên / email / số điện thoại.."></Search>
            <FilterStatus
              query={statusQuery}
              options={userStatusOptions}
              label={statusLabel}
              allValue={statusAllValue}
              allLabel={statusAllLabel}
            ></FilterStatus>
          </Box>
          <CreateNotificationModalForAllCustomers success={handleModalResult}>
            Gửi thông báo
          </CreateNotificationModalForAllCustomers>
          <CreateUserModal success={handleModalResult}>Tạo</CreateUserModal>
        </Box>
        {users && users.length > 0 ? (
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tên
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Điện thoại
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Vai trò
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Trạng thái
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.id}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {user.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: "success",
                      }}
                      size="small"
                      label={companyRoleOptions[user.role]}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: "primary.main",
                        color: "#fff",
                      }}
                      size="small"
                      label={userStatusOptions[user.status]}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/users/${user.id}`}
                    >
                      Thông tin
                    </Button>
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
        <Pagination count={count} />
      </Box>
    </PageContainer>
  );
}
