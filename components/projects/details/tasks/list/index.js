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
  LinearProgress,
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

import taskStatuses from "/constants/enums/projectTaskStatus";

import PageContainer from "/components/container/PageContainer";
import TaskModal from "./modal";

const tasks = [
  {
    id: 1,
    code: "TASK001",
    name: "Task 1",
    percentage: 20,
    pricePerUnit: 5000000,
    unitInContract: 100,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-02-01"),
    projectCategoryID: 1,
    status: 2,
  },
  {
    id: 2,
    code: "TASK002",
    name: "Task 2",
    percentage: 15,
    pricePerUnit: 6000000,
    unitInContract: 80,
    startDate: new Date("2023-02-01"),
    endDate: new Date("2023-03-01"),
    projectCategoryID: 2,
    status: 3,
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

// TABLE LABELS
const pageTitle = "Danh sách công việc";
const pageDescription = "Danh sách các công việc trong dự án";

const createTaskLabel = "Tạo công việc";

const codeHeaderLabel = "Mã";
const nameHeaderLabel = "Tên";
const percentageHeaderLabel = "Tiến độ";
const pricePerUnitHeaderLabel = "Tổng tiền ước tính (VND)";
const startDateHeaderLabel = "Ngày bắt đầu";
const endDateHeaderLabel = "Ngày kết thúc";

export default function Sites() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // SEARCH FORM
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // TASK CATEGORY FIELD
  const taskCategoryLabel = "Danh mục";
  const taskCategories = [
    { id: 1, name: "Category A" },
    { id: 2, name: "Category B" },
  ];
  const [taskCategory, setTaskCategory] = useState(-1);
  const onTaskCategoryChange = (e) => {
    setTaskCategory(parseInt(e.target.value));
  };

  // TASK STATUS FIELD
  const taskStatusLabel = "Trạng thái";
  const [taskStatus, setTaskStatus] = useState(-1);
  const onTaskStatusChange = (e) => {
    setTaskStatus(parseInt(e.target.value));
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

  // PROJECT DETAILS
  const projectDetailsLabel = "Chi tiết";

  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Box sx={{ display: "flex" }}>
            {/* Search Text Field */}
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

            {/* Task Category Select Box */}
            <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
              <InputLabel id="task-category-label">
                {taskCategoryLabel}
              </InputLabel>
              <Select
                labelId="task-category-label"
                id="task-category"
                value={taskCategory}
                label={taskCategoryLabel}
                onChange={onTaskCategoryChange}
              >
                <MenuItem value={-1}>Tất cả</MenuItem>
                {/* Example taskCategories array */}
                {taskCategories?.map((category) => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Task Status Select Box */}
            <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
              <InputLabel id="task-status-label">{taskStatusLabel}</InputLabel>
              <Select
                labelId="task-status-label"
                id="task-status"
                value={taskStatus}
                label={taskStatusLabel}
                onChange={onTaskStatusChange}
              >
                <MenuItem value={-1}>Tất cả</MenuItem>
                {/* Example taskStatuses array */}
                {taskStatuses?.map((status, index) => (
                  <MenuItem value={index} key={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex" }}>
            <TaskModal>
              <span>{createTaskLabel}</span>
            </TaskModal>
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
                  {codeHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {nameHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {percentageHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {pricePerUnitHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {startDateHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  {endDateHeaderLabel}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((task) => (
              <StyledTableRow key={task.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {task.code}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {task.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <LinearProgress
                    variant="determinate"
                    value={task.percentage}
                  />
                  <Typography variant="body2" fontWeight={400}>
                    {`${task.percentage}%`}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {(task.pricePerUnit * task.unitInContract).toLocaleString(
                      "vi-VN"
                    )}{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {new Date(task.startDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {new Date(task.endDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/tasks/${task.id}`}
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
