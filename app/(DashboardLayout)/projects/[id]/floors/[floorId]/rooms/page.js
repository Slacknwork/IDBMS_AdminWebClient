"use client";

import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { getRoomsByFloorId } from "/api/roomServices";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";
import CreateRoomModal from "./(CreateRoomModal)";

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

export default function RoomsPage() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      initialized.current = true;
      try {
        const data = await getRoomsByFloorId(params.floorId ?? "");
        setValues(data.list);
        setCount(data.totalItem);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };

  useEffect(() => {
    // localStorage.setItem('floorId', params.floorId.toString());
    fetchDataFromApi();
  }, []);

  return (
    <Box sx={{ zIndex: 1 }}>
      {/* Table */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Search></Search>
        <CreateRoomModal floorNo={params.floorId}>Tạo phòng</CreateRoomModal>
      </Box>
      <Table aria-label="simple table" sx={{ mt: 1 }}>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Mục đích
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Mô tả
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Diện tích
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tổng giá tiền (VND)
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Loại phòng
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Trạng thái
              </Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {values &&
            values.map((room) => (
              <StyledTableRow key={room.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {room.usePurpose}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {room.description}
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
      <Pagination count={count}></Pagination>
    </Box>
  );
}
