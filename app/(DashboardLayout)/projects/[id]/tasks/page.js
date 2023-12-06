"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getProjectTasksFilter,
  countProjectTasksFilter,
} from "/api/projectTaskServices";
import { getAllTaskCategories } from "/api/taskCategoryServices";

import projectTaskStatusOptions, {
  projectTaskStatusOptionsEnglish,
} from "/constants/enums/projectTaskStatus";

import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import FilterStatus from "/components/shared/FilterStatus";
import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import PageContainer from "/components/container/PageContainer";
import TaskModal from "./(CreateTaskModal)";

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
const codeHeaderLabel = "Mã";
const nameHeaderLabel = "Tên";
const percentageHeaderLabel = "Tiến độ";
const pricePerUnitHeaderLabel = "Tổng tiền ước tính (VND)";
const startDateHeaderLabel = "Ngày bắt đầu";
const endDateHeaderLabel = "Ngày kết thúc";

export default function ProjectTasksPage() {
  // CONSTANTS
  const searchQuery = "search";

  const categoryQuery = "category";

  const statusQuery = "status";
  const statusAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 0;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // TABS
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // FETCH DATA FROM API
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const categoryId = searchParams.get(categoryQuery);
      const status =
        projectTaskStatusOptionsEnglish[
          parseInt(searchParams.get(statusQuery))
        ];
      const page = parseInt(searchParams.get(pageQuery)) - 1 || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        setLoading(true);
        const categories = await getAllTaskCategories();
        const count = await countProjectTasksFilter(
          projectId,
          search,
          categoryId,
          status
        );
        const data = await getProjectTasksFilter(
          projectId,
          search,
          categoryId,
          status,
          page,
          pageSize
        );
        setCategories(categories);
        setCount(count);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [searchParams]);

  return (
    <PageContainer
      title="Danh sách công việc"
      description="Danh sách công việc"
    >
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Chưa có stage" />
        <Tab label="Stage 1" />
        <Tab label="Stage 2" />
      </Tabs>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Box>
            <Search></Search>
            <FilterStatus
              query={statusQuery}
              options={projectTaskStatusOptions}
              label="Trạng thái"
              allValue={statusAllValue}
              allLabel="Tất cả"
            ></FilterStatus>
            <FilterAutocomplete
              query={categoryQuery}
              options={categories}
              label="Danh mục"
              allValue={null}
              allLabel="Tất cả"
            ></FilterAutocomplete>
          </Box>
          <TaskModal>
            <span>Tạo</span>
          </TaskModal>
        </Box>
        {tasks && tasks.length > 0 ? (
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
              Không có công việc.
            </Typography>
          </Stack>
        )}

        <Pagination count={count}></Pagination>
      </Box>
    </PageContainer>
  );
}
