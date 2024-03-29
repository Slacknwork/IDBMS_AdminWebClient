"use client";

import { styled } from "@mui/material/styles";
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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getRoomsByFloorId } from "/services/roomServices";

import { companyRoleConstants } from "/constants/enums/companyRole";
import { participationRoleIndex } from "/constants/enums/participationRole";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";
import CreateRoomModal from "/components/shared/Modals/Rooms/CreateModal";
import PageContainer from "/components/container/PageContainer";

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

export default function RoomListPage() {
  // CONSTANTS
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const participationRole = data?.projectRole;
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);

  const fetchRooms = async () => {
    try {
      const projectId = params.id;
      const floorId = params.floorId;
      const isHidden = false;
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      const data = await getRoomsByFloorId({
        projectId,
        floorId,
        search,
        isHidden,
        page,
        pageSize,
      });
      setValues(data.list);
      setCount(data.totalItem);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Phòng' từ hệ thống");
    }
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    await Promise.all([fetchRooms()]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participationRole?.role, user?.role]);

  return (
    <PageContainer title="Danh sách phòng">
      {/* Table */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Search placeholder="Tìm phòng..."></Search>
        {isManager && <CreateRoomModal>Tạo phòng</CreateRoomModal>}
      </Box>
      {loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : values && values.length > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Mục đích
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Diện tích (m<sup>2</sup>)
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tổng giá tiền (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại phòng
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}></StyledTableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {values.map((room) => (
              <StyledTableRow key={room.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {room.usePurpose}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {room.area}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {(room.pricePerArea * room.area).toLocaleString("en-US")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {room.roomType?.name ?? "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {room?.isHidden ? "Đã ẩn" : "Đang hoạt động"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/rooms/${room.id}`}
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
