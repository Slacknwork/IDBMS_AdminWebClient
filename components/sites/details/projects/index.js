"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
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
import { toast } from "react-toastify";
import { debounce } from "@mui/material/utils";

import projectType from "/constants/enums/projectType";
import projectStatus from "/constants/enums/projectStatus";

import SiteModal from "./modal";

const sites = [
  {
    id: "1",
    name: "Suburb house",
    address: "123 Whatever street",
    companyName: "ABC Company",
    area: 200,
  },
  {
    id: "2",
    name: "Suburb house",
    address: "123 Whatever street",
    companyName: "ABC Company",
    area: 200,
  },
  {
    id: "3",
    name: "Suburb house",
    address: "123 Whatever street",
    companyName: "ABC Company",
    area: 200,
  },
  {
    id: "4",
    name: "Suburb house",
    address: "123 Whatever street",
    companyName: "ABC Company",
    area: 200,
  },
];

const pageQuery = "page";
const projectTypeLabel = "Loại dự án";
const projectStatusLabel = "Trạng thái";

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

export default function Sites() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // SEARCH FORM
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // PROJECT TYPE FIELD
  const [type, setType] = useState(-1);
  const onTypeChange = (e) => {
    setType(parseInt(e.target.value));
  };

  // PROJECT STATUS FIELD
  const [status, setStatus] = useState(-1);
  const onStatusChange = (e) => {
    setStatus(parseInt(e.target.value));
  };

  // PAGINATION
  const [count, setCount] = useState(6);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(
    Math.max(searchParams.get(pageQuery) - 1, 0)
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push(`/sites/${params.id}/projects?page=${newPage + 1}`);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    router.push(`/sites/${params.id}/projects?page=1`);
  };

  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
      <Box sx={{ display: "flex" }}>
        <FormControl sx={{ minWidth: 300, mt: 3 }}>
          <TextField
            label="Tìm kiếm"
            size="small"
            variant="outlined"
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ mt: 3, ml: 2, minWidth: 120 }} size="small">
          <InputLabel id="project-type-label">{projectTypeLabel}</InputLabel>
          <Select
            labelId="project-type-label"
            id="project-type"
            value={type}
            label={projectTypeLabel}
            onChange={onTypeChange}
          >
            <MenuItem value={-1}>Tất cả</MenuItem>
            {projectType?.map((type, index) => (
              <MenuItem value={index} key={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 3, ml: 2, minWidth: 120 }} size="small">
          <InputLabel id="project-type-label">{projectStatusLabel}</InputLabel>
          <Select
            labelId="project-type-label"
            id="project-type"
            value={status}
            label={projectStatusLabel}
            onChange={onStatusChange}
          >
            <MenuItem value={-1}>Tất cả</MenuItem>
            {projectStatus?.map((status, index) => (
              <MenuItem value={index} key={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <SiteModal>Tạo công trình</SiteModal>
      </Box>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
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
      />
    </Box>
  );
}
