"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  getBookingRequests,
  updateBookingRequestStatus,
} from "/api/bookingRequestServices";

import projectTypeOptions, {
  projectTypeChipColors,
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
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const defaultStatus = [0];

  const projectTypeQuery = "type";
  const projectTypeLabel = "Loại dự án";
  const projectTypeAllValue = -1;
  const projectTypeAllLabel = "Tất cả";

  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  // GET BOOKING REQUESTS
  const [count, setCount] = useState(0);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDataFromApi = async () => {
    setLoading(true);
    setValues([]);
    try {
      const search = searchParams.get(searchQuery) ?? "";
      const type = searchParams.get(projectTypeQuery) ?? "";
      const status = defaultStatus;
      const pageNo = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      const data = await getBookingRequests({
        search,
        type,
        status,
        pageNo,
        pageSize,
      });
      setValues(data.list);
      setCount(data.totalItem);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    } finally {
      setLoading(false);
    }
  };

  // UPDATE BOOKING STATUS
  const [note, setNote] = useState("");
  const onNoteChange = (e) => {
    setNote(e.target.value);
  };
  const onUpdateSubmit = async (request, status) => {
    try {
      await updateBookingRequestStatus(request.id, status, note);
      toast.success("Cập nhật thàng công!");
      if (status === bookingRequestStatusIndex.Accepted) {
        router.push(
          `/sites?createSite=true&contactName=${request.contactName}&contactPhone=${request.contactPhone}&contactEmail=${request.contactEmail}&contactLocation=${request.contactLocation}`
        );
      } else {
        fetchDataFromApi();
      }
    } catch (error) {
      toast.error("Lỗi cập nhật yêu cầu!");
      console.log(error);
    }
  };

  useEffect(() => {
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
                            name={request?.contactName || "Không tìm thấy"}
                            email={request?.contactEmail || "..."}
                            phone={request?.contactPhone || "..."}
                            address={request.contactLocation || "..."}
                          ></UserCard>
                          <Typography sx={{ mt: 2 }} variant="subtitle2">
                            Nhập ghi chú (nếu có)
                          </Typography>
                          <FormText
                            multiline
                            rows={4}
                            value={note}
                            onChange={onNoteChange}
                          ></FormText>
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
                            name={request?.contactName || "Không tìm thấy"}
                            email={request?.contactEmail || "..."}
                            phone={request?.contactPhone || "..."}
                            address={request.contactLocation || "..."}
                          ></UserCard>
                          <Typography sx={{ mt: 2 }} variant="p">
                            Nhập lý do từ chối yêu cầu
                          </Typography>
                          <FormText
                            multiline
                            rows={4}
                            value={note}
                            onChange={onNoteChange}
                          ></FormText>
                        </MessageModal>
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
        </Box>

        <Pagination query={pageQuery} sizeQuery={pageSizeQuery} count={count} />
      </Box>
      {/* END OF MAIN SECTION */}
    </Box>
  );
}
