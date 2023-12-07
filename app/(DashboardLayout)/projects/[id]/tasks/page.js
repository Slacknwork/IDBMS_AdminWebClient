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
import { getPaymentStagesByProjectId } from "api/paymentStageServices";

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
  const [stages, setStages] = useState([]);
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
        const stages = await getPaymentStagesByProjectId(params.id);
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
        setStages(stages);
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        <Box sx={{ display: "flex" }}>
          <Button disableElevation variant="contained" sx={{ mr: 2 }}>
            Xem theo tầng
          </Button>
          <TaskModal>
            <span>Tạo</span>
          </TaskModal>
        </Box>
      </Box>
      {tasks && tasks.length > 0 ? (
        <Box>
          <Tabs sx={{ mt: 2 }} value={activeTab} onChange={handleTabChange}>
            <Tab label="Chưa có giai đoạn" />
            {stages &&
              stages.map((stage) => <Tab key={stage.id} label={stage.name} />)}
          </Tabs>
          <Box sx={{ mt: 2, display: "flex", overflowX: "hidden" }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              sx={{
                minWidth: "8rem",
                backgroundColor: "whitesmoke",
                ".MuiTabs-indicator": {
                  left: 0,
                },
              }}
              value={activeTab}
              onChange={handleTabChange}
            >
              <Tab label="Phòng 1" />
              <Tab label="Phòng 2" />
              <Tab label="Phòng 3" />
            </Tabs>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell width={"30%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Công việc
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"15%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Tổng giá ước tính
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"15%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Ngày bắt đầu
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"30%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Tiến độ
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks?.map((task) => (
                  <StyledTableRow key={task.id}>
                    <TableCell>
                      <Typography variant="p" fontWeight={600}>
                        {task.code}
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {task.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {(
                          task.pricePerUnit * task.unitInContract
                        ).toLocaleString("vi-VN")}{" "}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={400}>
                        {task.startDate
                          ? new Date(task.startDate).toLocaleDateString("vi-VN")
                          : "Chưa xác định"}
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
          </Box>
        </Box>
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
    </PageContainer>
  );
}
