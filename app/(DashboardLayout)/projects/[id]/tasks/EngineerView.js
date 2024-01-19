"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
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
import moment from "moment-timezone";
import "moment/locale/vi";

import { getProjectTasksByProjectId } from "/services/projectTaskServices";
import { getAllTaskCategories } from "/services/taskCategoryServices";
import { getFloorsByProjectId } from "/services/floorServices";
import { getPaymentStagesByProjectId } from "/services/paymentStageServices";

import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";
import { companyRoleConstants } from "/constants/enums/companyRole";
import { participationRoleIndex } from "/constants/enums/participationRole";
import timezone from "/constants/timezone";

import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import FilterStatus from "/components/shared/FilterStatus";
import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import PageContainer from "/components/container/PageContainer";
import CreateTaskModal from "/components/shared/Modals/Tasks/CreateModal";
import UpdateTaskStatusModal from "/components/shared/Modals/Tasks/UpdateStatusModal";

import { getColorForAvatar, getAvatarContent } from "/utils/avatar";

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

moment.tz.setDefault(timezone.momentDefault);
moment.locale(timezone.momentLocale);

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
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const projectRole = data?.projectRole;
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // VIEWMODE (STAGE / FLOOR & ROOMS)
  const viewModeLabels = ["Xem theo giai đoạn", "Xem theo tầng/phòng"];
  const [viewMode, setViewMode] = useState(
    searchParams.get(viewModeQuery)
      ? parseInt(searchParams.get(viewModeQuery))
      : defaultViewMode
  );
  const onToggleViewMode = () => {
    setTasksLoading(true);
    const newViewMode = viewMode ? 0 : 1;
    setViewMode(newViewMode);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    newViewMode
      ? searchParams.set(viewModeQuery, newViewMode)
      : searchParams.delete(viewModeQuery);
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  };

  // STAGES
  const [stages, setStages] = useState([]);
  const [activeStage, setActiveStage] = useState(0);
  const fetchStages = async () => {
    const stages = await getPaymentStagesByProjectId({ projectId: params.id });
    setStages(stages.list);
    const active =
      stages.list.findIndex(
        (stage) => searchParams.get(stageQuery) === stage.id
      ) + 1;
    setActiveStage(active);
    setSelectedStageId(stages.list[0]?.id);
  };
  const handleStageChange = (event, newValue) => {
    setTasksLoading(true);
    setActiveStage(newValue);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    newValue
      ? searchParams.set(stageQuery, stages[newValue - 1]?.id)
      : searchParams.delete(stageQuery);
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  };

  // ROOMS
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(0);
  const handleRoomChange = (event, newValue) => {
    setTasksLoading(true);
    setActiveRoom(newValue);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set(roomQuery, rooms[newValue]?.id);
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  };

  // FLOORS
  const [floors, setFloors] = useState([]);
  const [activeFloor, setActiveFloor] = useState(0);
  const fetchFloors = async () => {
    const floors = await getFloorsByProjectId({ projectId: params.id });
    setFloors(floors.list);
    const active =
      floors.list.findIndex(
        (floor) => searchParams.get(floorQuery) === floor.id
      ) + 1;
    setRooms(active ? floors.list[active - 1].rooms : []);
    setActiveFloor(active);
  };
  const handleFloorChange = (event, newValue) => {
    setTasksLoading(true);
    setActiveFloor(newValue);
    setRooms(newValue ? floors[newValue - 1]?.rooms : []);
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    if (newValue) {
      searchParams.set(floorQuery, floors[newValue - 1]?.id);
      setActiveRoom(0);
      searchParams.set(roomQuery, floors[newValue - 1]?.rooms[0]?.id);
    } else {
      searchParams.delete(floorQuery);
      searchParams.delete(roomQuery);
    }
    searchParams.delete(pageQuery);
    searchParams.delete(pageSizeQuery);
    url.search = searchParams.toString();
    router.push(url.toString(), undefined, { scroll: false });
  };

  // SELECTED TASKS
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const onSelectedChange = (id) => {
    setSelectedTasks((prevSelectedTasks) => {
      if (prevSelectedTasks.includes(id)) {
        return prevSelectedTasks.filter((taskId) => taskId !== id);
      } else {
        return [...prevSelectedTasks, id];
      }
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        selected: task.id === id ? !task.selected : task.selected,
      }))
    );
  };

  // TASKS
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const fetchTasks = async () => {
    const projectId = params.id;
    const participationId = projectRole.id;
    const search = searchParams.get(searchQuery) ?? "";
    const categoryId = searchParams.get(categoryQuery) ?? "";
    const stageId = searchParams.get(stageQuery) ?? "";
    const roomId = searchParams.get(roomQuery) ?? "";
    const status = searchParams.get(statusQuery) ?? "";
    const page = searchParams.get(pageQuery) ?? defaultPage;
    const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

    const data = await getProjectTasksByProjectId({
      projectId,
      participationId,
      search,
      categoryId,
      status,
      ...(viewMode
        ? { roomId, includeRoomIdFilter: true }
        : { stageId, includeStageIdFilter: true }),
      page,
      pageSize,
    });
    setCount(data.totalItem);
    setTasks(
      data.list.map((task) => ({
        ...task,
        selected: selectedTasks.includes(task.id),
      }))
    );
  };

  // CATEGORIES
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const data = await await getAllTaskCategories({});
      setCategories(data.list);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Phân loại công việc' từ hệ thống!");
    }
  };

  const fetchOptionsFromApi = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchCategories(), fetchStages(), fetchFloors()]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu 'Tuỳ chọn trong công việc' từ hệ thống");
    } finally {
      setLoading(false);
    }
  };

  const fetchDataFromApi = async () => {
    setTasksLoading(true);
    try {
      await fetchTasks();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu 'Công việc' từ hệ thống");
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  useEffect(() => {
    setViewMode(
      searchParams.get(viewModeQuery)
        ? parseInt(searchParams.get(viewModeQuery))
        : defaultViewMode
    );
    setActiveStage(
      stages.findIndex((stage) => searchParams.get(stageQuery) === stage.id) + 1
    );
    const active =
      floors.findIndex((floor) => searchParams.get(floorQuery) === floor.id) +
      1;
    setRooms(active ? floors[active - 1].rooms : []);
    setActiveFloor(active);
    fetchDataFromApi();
  }, [searchParams]);

  const onUpdateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <PageContainer
      title="Danh sách công việc"
      description="Danh sách công việc"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Search placeholder="Nhập mã / tên công việc"></Search>
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
            allValue={-1}
            allLabel="Tất cả"
          ></FilterAutocomplete>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            disabled={tasksLoading}
            disableElevation
            variant="contained"
            onClick={onToggleViewMode}
          >
            {viewModeLabels[viewMode]}
          </Button>
          {(user?.role === companyRoleConstants.ADMIN ||
            projectRole.role === participationRoleIndex.ProjectManager) && (
              <CreateTaskModal
                hasCallback
                onCallback={fetchDataFromApi}
              ></CreateTaskModal>
            )}
        </Box>
      </Box>
      {(stages && stages.length) || (floors && floors.length) > 0 ? (
        <Box>
          {viewMode === 0 ? (
            <Tabs
              sx={{ mt: 2 }}
              value={activeStage}
              onChange={handleStageChange}
            >
              <Tab label="Chưa có giai đoạn" />
              {stages.map((stage) => (
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
              {floors.map((floor) => (
                <Tab key={floor.id} label={floor.usePurpose} />
              ))}
            </Tabs>
          )}
          <Grid container sx={{ mt: 2, overflowX: "hidden" }}>
            <Grid
              item
              xs={12}
              lg={viewMode === 1 && rooms && rooms.length > 0 ? 2 : 0}
            >
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
            </Grid>
            <Grid
              item
              sx={{ minHeight: "27rem" }}
              xs={12}
              lg={viewMode === 1 && rooms && rooms.length > 0 ? 10 : 12}
            >
              {/* TABLE */}
              {tasksLoading ? (
                <Stack sx={{ my: 5 }}>
                  <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
                </Stack>
              ) : tasks && tasks.length > 0 ? (
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {(user?.role === companyRoleConstants.ADMIN ||
                        projectRole.role ===
                        participationRoleIndex.ProjectManager) && (
                          <StyledTableCell width={"1%"}></StyledTableCell>
                        )}
                      <StyledTableCell width={"22%"}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Công việc
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell width={"11.5%"}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Giá ước tính
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell width={"11.5%"}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Ngày bắt đầu
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell width={"15.5%"}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Tiến độ
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell width={"11.5%"}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Phân công
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell width={"11.5%"}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Trạng thái
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks?.map((task) => (
                      <StyledTableRow key={task.id}>
                        {(user?.role === companyRoleConstants.ADMIN ||
                          projectRole.role ===
                          participationRoleIndex.ProjectManager) && (
                            <TableCell>
                              <Checkbox
                                color="primary"
                                checked={task?.selected}
                                onChange={(e) => onSelectedChange(task.id)}
                              />
                            </TableCell>
                          )}

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
                            ).toLocaleString("en-US")}{" "}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={400}>
                            {task.startedDate
                              ? moment(task.startedDate).format("L")
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
                        <TableCell>
                          <Box display="flex">
                            {task.taskAssignments &&
                              task.taskAssignments.length > 0 ? (
                              <AvatarGroup
                                max={3}
                                sx={{
                                  "& .MuiAvatar-root": {
                                    fontSize: 16,
                                    width: 36,
                                    height: 36,
                                  },
                                  justifyContent: "flex-start",
                                }}
                              >
                                {task.taskAssignments.map((taskAssignment) => (
                                  <Avatar
                                    key={taskAssignment?.id}
                                    sx={{
                                      bgcolor: getColorForAvatar(
                                        taskAssignment?.projectParticipation
                                          ?.user?.name
                                      ),
                                      fontSize: 16,
                                      width: 36,
                                      height: 36,
                                    }}
                                  >
                                    {getAvatarContent(
                                      taskAssignment?.projectParticipation?.user
                                        ?.name
                                    )}
                                  </Avatar>
                                ))}
                              </AvatarGroup>
                            ) : (
                              <Typography variant="p">
                                Chưa phân công
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box>
                            <UpdateTaskStatusModal
                              task={task}
                              setTaskStatus={onUpdateTaskStatus}
                            ></UpdateTaskStatusModal>
                          </Box>
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
              ) : (
                <Stack sx={{ my: 5 }}>
                  <Typography variant="p" sx={{ textAlign: "center" }}>
                    Không có dữ liệu.
                  </Typography>
                </Stack>
              )}
              {/* END OF TABLE */}
            </Grid>
          </Grid>
        </Box>
      ) : loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : (
        <Stack sx={{ my: 5 }}>
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Không có dữ liệu.
          </Typography>
        </Stack>
      )}

      <Pagination count={count}></Pagination>
    </PageContainer>
  );
}
