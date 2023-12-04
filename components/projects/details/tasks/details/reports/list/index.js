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
  Tab,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";

import calculationUnitOptions from "/constants/enums/calculationUnit";

import PageContainer from "/components/container/PageContainer";
import TaskModal from "./modal";
import { getTaskReportsByProjectTaskId } from "../../../../../../../api/taskReportServices";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const taskReports = [
  {
    id: "1",
    name: "Task Report 1",
    calculationUnit: 5,
    unitUsed: 25,
    createdTime: new Date("2023-01-15T08:00:00"),
    description: "Description for Task 1",
  },
  {
    id: "2",
    name: "Task Report 2",
    calculationUnit: 10,
    unitUsed: 50,
    createdTime: new Date("2023-02-01T10:30:00"),
    description: "Description for Task 2",
  },
  // Add more task reports as needed
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

export default function Sites() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [values, setValues] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      try {
        const data = await getTaskReportsByProjectTaskId(params.taskId);
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
    <PageContainer title={"Báo cáo công việc"}>
      <Box sx={{ overflow: "auto", mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex" }}>
            <TaskModal>
              <span>Tạo báo cáo</span>
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
                  Tên Báo cáo
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Đã thực hiện
                </Typography>
              </StyledTableCell>
              {/* <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Đơn vị
                </Typography>
              </StyledTableCell> */}
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ngày Tạo
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values?.map((taskReport) => (
              <StyledTableRow key={taskReport.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {taskReport.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {`${taskReport.unitUsed}`}
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {`${calculationUnitOptions[taskReport.calculationUnit]
                      }`}
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {new Date(taskReport.createdTime).toLocaleDateString(
                      "vi-VN"
                    )}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/tasks/${params.taskId}/reports/${taskReport.id}`}
                  >
                    Xem Chi Tiết
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
