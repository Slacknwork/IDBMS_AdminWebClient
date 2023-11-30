"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  InputAdornment,
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
import { useEffect, useRef, useState } from "react";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";
import SiteModal from "./modal";

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
          <SiteModal>Tạo công trình</SiteModal>
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
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Địa chỉ
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên công ty
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites?.map((site) => (
              <StyledTableRow key={site.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {site.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {site.address}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {site.companyName}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/sites/${site.id}`}
                  >
                    Chi tiết
                  </Button>
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
