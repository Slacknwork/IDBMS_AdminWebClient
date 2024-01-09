"use client";

import { useSearchParams } from "next/navigation";
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
import { toast } from "react-toastify";

import { getBookingRequests } from "/services/bookingRequestServices";

import projectTypeOptions, {
  projectTypeChipColors,
  projectTypeOptionsEnglish,
} from "/constants/enums/projectType";
import bookingRequestStatusOptions, {
  bookingRequestStatusHistoryOptions,
  bookingRequestStatusButtonColors,
} from "/constants/enums/bookingRequestStatus";

import FilterStatus from "/components/shared/FilterStatus";
import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import UserCard from "/components/shared/UserCard";

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

export default function RequestList() {
  // CONSTANTS
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 0;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const projectTypeQuery = "type";
  const projectTypeLabel = "Loại dự án";
  const projectTypeAllValue = -1;
  const projectTypeAllLabel = "Tất cả";

  const bookingRequestStatusQuery = "status";
  const bookingRequestStatusLabel = "Trạng thái";
  const bookingRequestStatusAllValue = 0;

  // INIT
  const searchParams = useSearchParams();

  // GET BOOKING REQUESTS
  const [count, setCount] = useState(0);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setLoading(true);
      setValues([]);
      try {
        const search = searchParams.get(searchQuery) ?? "";
        const type = searchParams.get(projectTypeQuery) ?? "";
        const status = searchParams.get(bookingRequestStatusQuery) ?? "";
        const page = searchParams.get(pageQuery) ?? defaultPage;
        const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

        const data = await getBookingRequests({
          search,
          type,
          status,
          page,
          pageSize,
        });
        setValues(data.list);
        setCount(data.totalItem);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Yêu cầu đặt' từ hệ thống");
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Box>
      {/* MAIN SECTION */}
      <Box sx={{ zIndex: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Nhập tên / email / điện thoại"></Search>
          <FilterStatus
            query={projectTypeQuery}
            options={projectTypeOptions}
            label={projectTypeLabel}
            allValue={projectTypeAllValue}
            allLabel={projectTypeAllLabel}
          ></FilterStatus>
          <FilterStatus
            query={bookingRequestStatusQuery}
            options={bookingRequestStatusHistoryOptions}
            label={bookingRequestStatusLabel}
            allValue={bookingRequestStatusAllValue}
          ></FilterStatus>
        </Box>
        <Box>
          {loading ? (
            <Stack sx={{ my: 5 }}>
              <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
            </Stack>
          ) : values && values.length > 0 ? (
            <Table aria-label="simple table" sx={{ mt: 1 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell width={"27.5%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Thông tin khách
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"15%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Loại dự án
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"15%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Địa chỉ
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"15%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Ghi chú
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"12.5%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Trạng thái
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"15%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Phản hồi
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values?.map((request) => (
                  <StyledTableRow key={request.id}>
                    <TableCell>
                      <UserCard
                        name={request?.contactName || "Không tìm thấy"}
                        email={request?.contactEmail || "..."}
                        phone={request?.contactPhone || "..."}
                      ></UserCard>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={projectTypeChipColors[request.projectType]}
                        label={projectTypeOptions[request.projectType]}
                      ></Chip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">
                        {request.contactLocation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">
                        {request.note || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={bookingRequestStatusButtonColors[request.status]}
                        label={bookingRequestStatusOptions[request.status]}
                      ></Chip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">
                        {request.adminReply || "N/A"}
                      </Typography>
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
        </Box>

        <Pagination query={pageQuery} sizeQuery={pageSizeQuery} count={count} />
      </Box>
      {/* END OF MAIN SECTION */}
    </Box>
  );
}
