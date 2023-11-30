"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
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

import projectType, {
  projectTypeChipColors,
} from "/constants/enums/projectType";
import projectStatus from "/constants/enums/projectStatus";

import PageContainer from "/components/container/PageContainer";
import SiteModal from "./modal";

const projects = [
  {
    id: "1",
    name: "Design",
    type: 0,
    status: 2,
  },
  {
    id: "2",
    name: "Construction",
    type: 1,
    status: 2,
  },
];

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

const pageTitle = "Danh sách dự án";
const pageDescription = "Danh sách các dự án trong công trình";

const nameHeaderLabel = "Tên";
const projectTypeHeaderLabel = "Kiểu dự án";
const projectStatusHeaderLabel = "Trạng thái";

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
  const pageQuery = "page";
  const labelRowsPerPage = "Số dự án hiển thị:";
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

  // CREATE PROJECT
  const createProjectLabel = "Tạo dự án";

  // PROJECT DETAILS
  const projectDetailsLabel = "Chi tiết";

  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Box sx={{ display: "flex" }}>
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
            <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
              <InputLabel id="project-type-label">
                {projectTypeLabel}
              </InputLabel>
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
            <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
              <InputLabel id="project-type-label">
                {projectStatusLabel}
              </InputLabel>
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
          </Box>
          <Box sx={{ display: "flex" }}>
            <SiteModal>
              <span>{createProjectLabel}</span>
            </SiteModal>
          </Box>
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
                  {nameHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {projectTypeHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {projectStatusHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects?.map((project) => (
              <StyledTableRow key={project.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {project.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={projectType[project.type]}
                    color={projectTypeChipColors[project.type]}
                    fontWeight={400}
                  ></Chip>
                </TableCell>
                <TableCell>
                  <Chip
                    label={projectStatus[project.status]}
                    fontWeight={400}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${project.id}`}
                  >
                    {projectDetailsLabel}
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
    </PageContainer>
  );
}
