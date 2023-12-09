"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import calculationUnitOptions from "/constants/enums/calculationUnit";

import PageContainer from "/components/container/PageContainer";
import TaskModal from "./(CreateReportModal)";
import { getTaskReportsByProjectTaskId } from "/api/taskReportServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";

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

export default function ReportListPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);

  const fetchDataFromApi = async () => {
    try {
      const data = await getTaskReportsByProjectTaskId(params.taskId);
      console.log(data);
      setValues(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <PageContainer title={"Báo cáo công việc"}>
      <Box sx={{ zIndex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Search placeholder="Tìm tên báo cáo"></Search>
          </Box>
          <TaskModal>
            <span>Tạo</span>
          </TaskModal>
        </Box>
        <Box>
          {loading ? (
            <Stack sx={{ my: 5 }}>
              <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
            </Stack>
          ) : values && values.length > 0 ? (
            <Table
              aria-label="simple table"
              sx={{
                mt: 1,
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
          ) : (
            <Stack sx={{ my: 5 }}>
              <Typography variant="p" sx={{ textAlign: "center" }}>
                Không có báo cáo.
              </Typography>
            </Stack>
          )}
          <Pagination count={count}></Pagination>
        </Box>
      </Box>
    </PageContainer>
  );
}
