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

import PageContainer from "/components/container/PageContainer";
import { getTaskReportsByProjectTaskId } from "/services/taskReportServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CreateTaskReportModal from "/components/shared/Modals/TaskReports/CreateModal";

import Search from "/components/shared/Search";
import Pagination from "/components/shared/Pagination";

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

  const projectTaskId = params.taskId;

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);

  const fetchDataFromApi = async () => {
    try {
      const projectId = params.id;
      const data = await getTaskReportsByProjectTaskId({
        projectTaskId,
        projectId,
      });
      setValues(data.list);
      setCount(data.totalItem);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu 'Báo cáo công việc' từ hệ thống");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleModalResult = () => {
    fetchDataFromApi();
  };

  return (
    <PageContainer title={"Báo cáo công việc"}>
      <Box sx={{ zIndex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Search placeholder="Tìm tên báo cáo"></Search>
          </Box>
          <CreateTaskReportModal
            success={handleModalResult}
          ></CreateTaskReportModal>
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
                Không có dữ liệu.
              </Typography>
            </Stack>
          )}
          <Pagination count={count}></Pagination>
        </Box>
      </Box>
    </PageContainer>
  );
}
