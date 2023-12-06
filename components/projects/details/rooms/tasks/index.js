"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import TaskModal from "./modal";
import { getProjectTasksByProjectId, getProjectTasksByRoomId } from "../../../../../api/projectTaskServices";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
  const params = useParams();

  // PROJECT DETAILS
  const projectDetailsLabel = "Chi tiết";

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [values, setValues] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      try {
        const data = await getProjectTasksByRoomId(params.roomId);
        console.log(data)
        setValues(data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <PageContainer title={pageTitle} description={pageDescription}>
      <Box sx={{ overflow: "auto" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <TaskModal
            request={{}}
            tasks={values}
          >
            <span>{createTaskLabel}</span>
          </TaskModal>
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
            {values?.map((task) => (
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
                    {task.startedDate ? new Date(task.startedDate).toLocaleDateString("vi-VN") : "Chưa xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {task.endDate ? new Date(task.endDate).toLocaleDateString("vi-VN") : "Chưa xác định"}
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
      </Box>
    </PageContainer>
  );
}
