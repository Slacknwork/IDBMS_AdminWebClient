"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Stack,
  CircularProgress,
} from "@mui/material";
import { getAllAdmins } from "/services/adminServices";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PageContainer from "/components/container/PageContainer";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";
import FilterStatus from "/components/shared/FilterStatus";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import CreateAdminModal from "/components/shared/Modals/Admins/CreateModal";

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

export default function ProjectList() {
  const searchQuery = "search";

  const statusQuery = "status";
  const statusAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchAdmins = async () => {
      const search = searchParams.get(searchQuery) || "";
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getAllAdmins({
          search,
          pageSize,
          pageNo,
        });
        console.log(response);
        setAdmins(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Quản Lý' từ hệ thống");
      }
    };
    await Promise.all([fetchAdmins()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  };

  return (
    <PageContainer title={"PageContainer"} description={"PageContainer"}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên.."></Search>

        </Box>
        <CreateAdminModal success={handleModalResult}>Tạo</CreateAdminModal>
      </Box>
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        {admins && admins.length > 0 ? (
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
                    Tên người dùng
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Người tạo
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins?.map((admin) => (
                <StyledTableRow key={admin.id}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {admin.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {admin.username}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: "13px",
                          }}
                        ></Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {admin.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {admin?.creator?.name ?? "Không"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/admins/${admin.id}`}
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
        <Pagination count={count}></Pagination>
      </Box>
    </PageContainer>
  );
}
