"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { deepOrange } from "@mui/material/colors";
import { toast } from "react-toastify";

import PageContainer from "/components/container/PageContainer";
import {
  countBookingRequests,
  getBookingRequestsFilter,
  updateBookingRequestStatus,
} from "/api/bookingRequestServices";

import projectTypeOptions, {
  projectTypeChipColors,
  projectTypeIndex,
} from "/constants/enums/projectType";
import bookingRequestStatusOptions, {
  bookingRequestStatusButtonColors,
  bookingRequestStatusIndex,
  bookingRequestStatusOptionsEnglish,
} from "/constants/enums/bookingRequestStatus";

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

const pageTitle = "Khu công trình";
const pageDescription = "Danh sách các khu công trình";

function MenuButton({ request, values, setValues }) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const putBookingRequest = async (request, status) => {
    try {
      const response = await updateBookingRequestStatus(request?.Id, status);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };
  const handleUpdateRequestStatus = (request, status) => {
    putBookingRequest(request, status);
    const updatedRequestIndex = values.findIndex(
      (req) => req.Id === request.Id
    );
    const updatedValues = [...values];
    updatedValues[updatedRequestIndex] = {
      ...updatedValues[updatedRequestIndex],
      Status: bookingRequestStatusOptionsEnglish[status],
    };
    setValues(updatedValues);
    handleMenuClose();
  };

  return (
    <Box>
      <Button
        color={
          bookingRequestStatusButtonColors[
            bookingRequestStatusIndex[request.Status]
          ]
        }
        sx={{ width: 150 }}
        disableElevation
        variant="contained"
        onClick={(event) => handleMenuOpen(event)}
        aria-controls={`simple-menu-${request.Id}`}
        aria-haspopup="true"
      >
        {bookingRequestStatusOptions[bookingRequestStatusIndex[request.Status]]}
      </Button>
      <Menu
        id={`simple-menu-${request.Id}`}
        anchorEl={menuAnchor}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {bookingRequestStatusOptions.map((item, index) => (
          <MenuItem
            sx={{ width: 150 }}
            key={item}
            onClick={() => handleUpdateRequestStatus(request, index)}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default function Sites() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // SET AVATAR LETTER
  const getAvatarContent = (name) => {
    const words = name.split(" ");
    const lastWord = words.length > 0 ? words[words.length - 1] : "";
    const firstCharacter = lastWord.charAt(0).toUpperCase();

    return firstCharacter;
  };

  // GET BOOKING REQUESTS
  const [values, setValues] = useState([]);
  function onSetValues(newValue) {
    setValues(newValue);
  }
  const [loading, setLoading] = useState(true);

  const fetchDataFromApi = async () => {
    try {
      const data = await getBookingRequestsFilter(search, page, rowsPerPage);
      const dataCount = await countBookingRequests(search);
      setValues(data.value);
      setCount(dataCount);
      setLoading(false);
      router.push(
        `/requests?search=${search}&page=${page + 1}&size=${rowsPerPage}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };

  // PAGINATION
  const pageQuery = "page";
  const pageSizeQuery = "size";
  const labelRowsPerPage = "Số khu công trình hiển thị:";
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get(pageSizeQuery)) || 5
  );
  const [page, setPage] = useState(
    Math.max(searchParams.get(pageQuery) - 1, 0)
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  // SEARCH FORM
  const searchQuery = "search";
  const [search, setSearch] = useState(searchParams.get(searchQuery) || "");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const onSearchSubmit = (e) => {
    setPage(0);
    fetchDataFromApi();
  };

  // ON MOUNTED
  useEffect(() => {
    fetchDataFromApi();
  }, [page, rowsPerPage]);

  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      {/* MAIN SECTION */}
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ minWidth: 300 }}>
            <TextField
              label="Tìm kiếm"
              size="small"
              variant="outlined"
              value={search}
              onChange={onSearchChange}
              onBlur={onSearchSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearchSubmit(e);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        {values && values.length > 0 ? (
          <Box>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                my: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Thông tin khách
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Loại dự án
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Địa chỉ
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Ghi chú
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values?.map((request) => (
                  <StyledTableRow key={request.Id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        <Box sx={{ display: "flex" }}>
                          <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>
                            {getAvatarContent(request.ContactName)}
                          </Avatar>
                          <Box sx={{ my: "auto", mx: 2 }}>
                            <Typography variant="h6">
                              {request.ContactName}
                            </Typography>
                            <Typography variant="p">
                              {request.ContactEmail}
                            </Typography>
                            <br />
                            <Typography variant="p">
                              {request.ContactPhone}
                            </Typography>
                            <br />
                          </Box>
                        </Box>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          projectTypeChipColors[
                            projectTypeIndex[request.ProjectType]
                          ]
                        }
                        label={
                          projectTypeOptions[
                            projectTypeIndex[request.ProjectType]
                          ]
                        }
                      ></Chip>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">
                        {request.ContactLocation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p">
                        {request.Note || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <MenuButton
                        request={request}
                        values={values}
                        setValues={onSetValues}
                      ></MenuButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[2, 5, 10, 25, 50]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
            />
          </Box>
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
      {/* END OF MAIN SECTION */}
    </PageContainer>
  );
}
