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
import { getFloorsByProjectId } from "/api/floorServices";
import { getRoomsByFloorId } from "/api/roomServices";
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
  const viewModeQuery = "viewMode";
  const defaultViewMode = 0;

  const searchQuery = "search";

  const stageQuery = "stage";

  const floorQuery = "floor";

  const roomQuery = "room";

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

  const updateSearchParams = (query, value = null) => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (value !== null) {
      searchParams.set(query, value);
    } else {
      searchParams.delete(query);
    }
    url.search = searchParams.toString();
    router.push(url.toString());
  };

  // VIEWMODE (STAGE / FLOOR & ROOMS)
  const viewModeLabels = ["Xem theo giai đoạn", "Xem theo tầng/phòng"];
  const [viewMode, setViewMode] = useState(
    searchParams.get(viewModeQuery)
      ? parseInt(searchParams.get(viewModeQuery))
      : defaultViewMode
  );
  const onToggleViewMode = () => {
    const newViewMode = viewMode ? 0 : 1;
    setViewMode(newViewMode);
    updateSearchParams(viewModeQuery, newViewMode || null);
  };

  // FETCH DATA FROM API
  const [categories, setCategories] = useState([]);

  // STAGES
  const [stages, setStages] = useState([]);
  const [activeStage, setActiveStage] = useState(0);
  const fetchStages = async () => {
    const stages = await getPaymentStagesByProjectId(params.id);
    setStages(stages);
    const active =
      stages.findIndex((stage) => searchParams.get(stageQuery) === stage.id) +
      1;
    setActiveStage(active);
  };
  const handleStageChange = (event, newValue) => {
    setActiveStage(newValue);
    updateSearchParams(stageQuery, newValue ? stages[newValue - 1]?.id : null);
  };

  // FLOORS
  const [floors, setFloors] = useState([]);
  const [activeFloor, setActiveFloor] = useState(0);
  const fetchFloors = async () => {
    const floors = await getFloorsByProjectId(params.id);
    setFloors(floors);
    const active =
      floors.findIndex((floor) => searchParams.get(floorQuery) === floor.id) +
      1;
    setActiveFloor(active);
  };
  const handleFloorChange = (event, newValue) => {
    setActiveFloor(newValue);
    updateSearchParams(floorQuery, newValue ? floors[newValue - 1]?.id : null);
  };

  // ROOMS
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(0);
  const fetchRooms = async () => {
    if (searchParams.get(floorQuery)) {
      const rooms = await getRoomsByFloorId(searchParams.get(floorQuery));
      setRooms(rooms);
      const active = rooms.findIndex(
        (room) => searchParams.get(roomQuery) === room.id
      );
      setActiveRoom(active);
    } else {
      setRooms([]);
      updateSearchParams(roomQuery, null);
    }
  };
  const handleRoomChange = (event, newValue) => {
    setActiveRoom(newValue);
    updateSearchParams(roomQuery, rooms[newValue]?.id);
  };

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchTasks = async () => {
    const projectId = params.id;
    const search = searchParams.get(searchQuery) || "";
    const categoryId = searchParams.get(categoryQuery);
    const status =
      projectTaskStatusOptionsEnglish[parseInt(searchParams.get(statusQuery))];
    const page = parseInt(searchParams.get(pageQuery)) - 1 || defaultPage;
    const pageSize =
      parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;
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
    setCount(count);
    setTasks(data);
  };

  const fetchDataFromApi = async () => {
    try {
      setLoading(true);
      const categories = await getAllTaskCategories();
      setCategories(categories);
      await fetchStages();
      await fetchFloors();
      await fetchRooms();
      await fetchTasks();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          <Button
            disableElevation
            variant="contained"
            sx={{ mr: 2 }}
            onClick={onToggleViewMode}
          >
            {viewModeLabels[viewMode]}
          </Button>
          <TaskModal>
            <span>Tạo</span>
          </TaskModal>
        </Box>
      </Box>
      {tasks && tasks.length > 0 ? (
        <Box>
          {viewMode === 0 ? (
            <Tabs
              sx={{ mt: 2 }}
              value={activeStage}
              onChange={handleStageChange}
            >
              <Tab label="Chưa có giai đoạn" />
              {stages &&
                stages.map((stage) => (
                  <Tab key={stage.id} label={stage.name} />
                ))}
            </Tabs>
          ) : (
            <Tabs
              sx={{ mt: 2 }}
              value={activeFloor}
              onChange={handleFloorChange}
            >
              <Tab label="Ngoài kiến trúc" />
              {floors &&
                floors.map((floor) => (
                  <Tab key={floor.id} label={floor.usePurpose} />
                ))}
            </Tabs>
          )}
          <Box sx={{ mt: 2, display: "flex", overflowX: "hidden" }}>
            {viewMode === 1 && rooms && rooms.length > 0 && (
              <Tabs
                orientation="vertical"
                variant="scrollable"
                sx={{
                  minWidth: "8rem",
                  ".MuiTabs-indicator": {
                    left: 0,
                  },
                }}
                value={activeRoom}
                onChange={handleRoomChange}
              >
                {rooms.map((room) => (
                  <Tab key={room.id} label={room.usePurpose} />
                ))}
              </Tabs>
            )}
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
