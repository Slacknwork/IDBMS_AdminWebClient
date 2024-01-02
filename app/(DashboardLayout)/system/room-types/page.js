"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import { getAllRoomTypes } from "/services/roomTypeServices";

import isHiddenOptions from "/constants/enums/isHidden";
import checkValidUrl from "components/validations/url";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterStatus from "/components/shared/FilterStatus";
import CreateRoomTypeModal from "/components/shared/Modals/RoomTypes/CreateModal";

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

export default function RoomTypeList() {
  const searchQuery = "search";

  const isHiddenQuery = "isHidden";
  const isHiddenAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchRoomTypes = async () => {
      const name = searchParams.get(searchQuery) || "";
      const isHidden =
        searchParams.get(isHiddenQuery) === "1"
          ? true
          : searchParams.get(isHiddenQuery) === null
          ? ""
          : false;
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getAllRoomTypes({
          isHidden,
          name,
          pageSize,
          pageNo,
        });
        console.log(response);
        setRoomTypes(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Loại Phòng' từ hệ thống");
      }
    };
    await Promise.all([fetchRoomTypes()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên.."></Search>

          <FilterStatus
            query={isHiddenQuery}
            options={isHiddenOptions}
            label="Trạng thái"
            allValue={isHiddenAllValue}
            allLabel="Tất cả"
          ></FilterStatus>
        </Box>
        <CreateRoomTypeModal success={handleModalResult}>
          Tạo
        </CreateRoomTypeModal>
      </Box>
      {(roomTypes && roomTypes.length) > 0 ? (
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ảnh
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Icon
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Giá mỗi diện tích (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"20%"}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomTypes.map((roomType) => (
              <StyledTableRow key={roomType.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {roomType.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Image
                    src={checkValidUrl(roomType?.imageUrl)}
                    alt=""
                    width={0}
                    height={0}
                    style={{
                      width: "8rem",
                      height: "8rem",
                      objectFit: "cover",
                    }}
                    unoptimized={true}
                    onError={(e) => {
                      e.target.src = "/images/results/no-image.png";
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Image
                    src={checkValidUrl(roomType.iconImageUrl)}
                    alt=""
                    width={0}
                    height={0}
                    style={{
                      width: "5rem",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    unoptimized={true}
                    onError={(e) => {
                      e.target.src = "/images/results/no-file.png";
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {roomType.pricePerArea.toLocaleString("en-US")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {roomType?.isHidden
                      ? isHiddenOptions[1]
                      : isHiddenOptions[0]}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/system/room-types/${roomType.id}`}
                  >
                    Chi tiết
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
  );
}
