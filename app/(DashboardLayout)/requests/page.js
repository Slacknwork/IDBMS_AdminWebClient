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

import {
  countBookingRequestsFilter,
  getBookingRequestsFilter,
  updateBookingRequest,
} from "/api/bookingRequestServices";

import projectTypeOptions, {
  projectTypeChipColors,
  projectTypeOptionsEnglish,
} from "/constants/enums/projectType";
import { bookingRequestStatusIndex } from "/constants/enums/bookingRequestStatus";

import FilterStatus from "/components/shared/FilterStatus";
import FormText from "/components/shared/Forms/Text";
import MessageModal from "/components/shared/Modals/Message";
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

  const defaultStatus = [0];

  const projectTypeQuery = "type";
  const projectTypeLabel = "Loại dự án";
  const projectTypeAllValue = -1;
  const projectTypeAllLabel = "Tất cả";

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
        const search = searchParams.get(searchQuery) || "";
        const type =
          projectTypeOptionsEnglish[
            parseInt(searchParams.get(projectTypeQuery))
          ];
        const page = parseInt(searchParams.get(pageQuery)) - 1 || defaultPage;
        const pageSize =
          parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

        const data = await getBookingRequestsFilter(
          search,
          type,
          defaultStatus,
          page,
          pageSize
        );
        const count = await countBookingRequestsFilter(
          search,
          type,
          defaultStatus
        );
        setValues(data);
        setCount(count);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // UPDATE BOOKING STATUS
  const onUpdateSubmit = (request, status) => {};

  return (
    <Box>
      {/* MAIN SECTION */}
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ mt: 3, display: "flex" }}>
          <Search query={searchQuery}></Search>
          <FilterStatus
            query={projectTypeQuery}
            options={projectTypeOptions}
            label={projectTypeLabel}
            allValue={projectTypeAllValue}
            allLabel={projectTypeAllLabel}
          ></FilterStatus>
        </Box>
        <Box>
          {values && values.length > 0 ? (
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                my: 2,
              }}
            >
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
                  <StyledTableCell
                    width={"27.5%"}
                    align="right"
                  ></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values?.map((request) => (
                  <StyledTableRow key={request.id}>
                    <TableCell>
                      <UserCard
                        name={request.contactName}
                        email={request.contactEmail}
                        phone={request.contactPhone}
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
                    <TableCell align="right">
                      <Box
                        sx={{
                          mr: 2,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <MessageModal
                          sx={{ mr: 4 }}
                          buttonLabel="Tiếp nhận"
                          title="Tiếp nhận yêu cầu này?"
                          color="primary"
                          submitLabel="Tiếp nhận"
                          onSubmit={() =>
                            onUpdateSubmit(
                              request,
                              bookingRequestStatusIndex.Accepted
                            )
                          }
                        >
                          <UserCard
                            name={request.contactName}
                            address={request.contactLocation}
                            email={request.contactEmail}
                            phone={request.contactPhone}
                          ></UserCard>
                          <Typography sx={{ mt: 2 }} variant="subtitle2">
                            Nhập ghi chú (nếu có)
                          </Typography>
                          <FormText multiline rows={4}></FormText>
                        </MessageModal>
                        <MessageModal
                          color="error"
                          buttonLabel="Từ chối"
                          title="Từ chối yêu cầu này?"
                          submitLabel="Từ chối"
                          onSubmit={() =>
                            onUpdateSubmit(
                              request,
                              bookingRequestStatusIndex.Rejected
                            )
                          }
                        >
                          <UserCard
                            name={request.contactName}
                            address={request.contactLocation}
                            email={request.contactEmail}
                            phone={request.contactPhone}
                          ></UserCard>
                          <Typography sx={{ mt: 2 }} variant="p">
                            Nhập lý do từ chối yêu cầu
                          </Typography>
                          <FormText multiline rows={4}></FormText>
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
                Không có yêu cầu.
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