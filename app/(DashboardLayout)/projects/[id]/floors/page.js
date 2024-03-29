"use client";

import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
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
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { getFloorsByProjectId } from "/services/floorServices";

import { projectStatusIndex } from "/constants/enums/projectStatus";
import { participationRoleIndex } from "/constants/enums/participationRole";
import { companyRoleConstants } from "/constants/enums/companyRole";

import PageContainer from "/components/container/PageContainer";
import CreateFloorModal from "/components/shared/Modals/Floors/CreateModal";
import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";

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

export default function FloorsPage() {
  // CONSTANTS
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const project = data?.project;
  const participationRole = data?.projectRole;

  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);

  const fetchFloors = async () => {
    try {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      const data = await getFloorsByProjectId({
        projectId,
        search,
        page,
        pageSize,
      });
      setValues(data.list);
      setCount(data.totalItem);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Tầng' từ hệ thống");
    }
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    await Promise.all([fetchFloors()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    setIsManager(
      (user?.role && user?.role === companyRoleConstants.ADMIN) ||
        (participationRole?.role &&
          participationRole?.role === participationRoleIndex.ProjectManager)
    );
  }, [participationRole?.role, user?.role]);

  return (
    <PageContainer title="Tầng">
      {/* Table */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Search placeholder="Nhập số tầng / mục đích"></Search>
        </Box>
        {isManager &&
          project &&
          project?.status === projectStatusIndex.Negotiating && (
            <CreateFloorModal floorList={values}>Tạo</CreateFloorModal>
          )}
      </Box>
      <Box></Box>
      {loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : values && values.length > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <StyledTableCell width={"10%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tầng
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"25%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Mục đích
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"35%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Mô tả
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"} align="right">
                {/* <Typography variant="subtitle2" fontWeight={600}>
                Chi tiết
              </Typography> */}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {values.map((floor) => (
              <StyledTableRow key={floor.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={800}>
                    {floor.floorNo === 0
                      ? "Trệt"
                      : floor.floorNo < 0
                      ? `B${-floor.floorNo}`
                      : floor.floorNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {floor.usePurpose}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {floor.description || "Không có"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/floors/${floor.id}`}
                  >
                    Chi tiết
                  </Button>
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
    </PageContainer>
  );
}
