"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
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

import projectTypeOptions, {
  projectTypeChipColors,
} from "/constants/enums/projectType";
import PageContainer from "/components/container/PageContainer";
import {
  getBookingRequests,
  updateBookingRequestStatus,
} from "/api/bookingRequestServices";
import bookingRequestStatusOptions from "/constants/enums/bookingRequestStatus";

const sites = [
  {
    id: "1",
    name: "Suburb house",
    address: "123 Whatever street",
    companyName: "ABC Company",
    area: 200,
  },
];

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
      const response = await updateBookingRequestStatus(request?.id, status);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };
  const handleUpdateRequestStatus = (request, status) => {
    putBookingRequest(request, status);
    const updatedRequestIndex = values.findIndex(
      (req) => req.id === request.id
    );
    const updatedValues = [...values];
    updatedValues[updatedRequestIndex] = {
      ...updatedValues[updatedRequestIndex],
      status: status,
    };
    setValues(updatedValues);
    handleMenuClose();
  };

  return (
    <Box>
      <Button
        sx={{ width: 150 }}
        disableElevation
        variant="contained"
        onClick={(event) => handleMenuOpen(event)}
        aria-controls={`simple-menu-${request.id}`}
        aria-haspopup="true"
      >
        {bookingRequestStatusOptions[request.status]}
      </Button>
      <Menu
        id={`simple-menu-${request.id}`}
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

  // SEARCH FORM
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // PAGINATION
  const pageQuery = "page";
  const labelRowsPerPage = "Số khu công trình hiển thị:";
  const [count, setCount] = useState(6);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(
    Math.max(searchParams.get(pageQuery) - 1, 0)
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push(`/sites?page=${newPage + 1}`);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    router.push(`/sites?page=1`);
  };

  const [values, setValues] = useState([]);
  function onSetValues(newValue) {
    setValues(newValue);
  }
  const [loading, setLoading] = useState(true);

  const fetchDataFromApi = async () => {
    try {
      const data = await getBookingRequests();
      setValues(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const [menuAnchor, setMenuAnchor] = useState([]);
  const handleMenuOpen = (e, index) => {
    const newMenu = [];
    newMenu[index] = e.currentTarget;
    setMenuAnchor(newMenu);
  };

  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      {/* MAIN SECTION */}
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ minWidth: 300 }}>
            <TextField
              label="Tìm kiếm"
              size="small"
              variant="outlined"
              value={search}
              onChange={onSearchChange}
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
            {values?.map((request, index) => (
              <StyledTableRow key={request.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    <Box sx={{ display: "flex" }}>
                      <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>
                        N
                      </Avatar>
                      <Box sx={{ my: "auto", mx: 2 }}>
                        <Typography variant="h6">
                          {request.contactName}
                        </Typography>
                        <Typography variant="p">
                          {request.contactEmail}
                        </Typography>
                        <br />
                        <Typography variant="p">
                          {request.contactPhone}
                        </Typography>
                        <br />
                      </Box>
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={projectTypeOptions[request.projectType]}
                    color={projectTypeChipColors[request.projectType]}
                  ></Chip>
                </TableCell>
                <TableCell>
                  <Typography variant="p">{request.contactLocation}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="p">{request.note}</Typography>
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
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={labelRowsPerPage}
        />
      </Box>
      {/* END OF MAIN SECTION */}
    </PageContainer>
  );
}
