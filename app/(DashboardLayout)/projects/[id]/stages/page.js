"use client";

import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import {
  Box,
  Button,
  Chip,
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import stageStatusOptions from "/constants/enums/stageStatus";

import { getPaymentStagesByProjectId } from "/api/paymentStageServices";

import CreateStageModal from "/components/shared/Modals/Stages/CreateModal";
import Search from "/components/shared/Search";
import FilterStatus from "/components/shared/FilterStatus";
import Pagination from "/components/shared/Pagination";
import { stageStatusBackgroundChipColors } from "../../../../../constants/enums/stageStatus";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function PaymentStages() {
  // CONSTANTS
  const searchQuery = "search";

  const statusQuery = "status";
  const statusAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [stages, setStages] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const status = searchParams.get(statusQuery) ?? "";
      const page = searchParams.get(pageQuery) || defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) || defaultPageSize;

      try {
        setLoading(true);
        const data = await getPaymentStagesByProjectId({
          projectId,
          search,
          status,
          page,
          pageSize,
        });
        setCount(data.totalItem);
        setStages(data.list);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  }


  //STAGE STATUS HANDLE
  const handleStartStage = (stageId) => {

    console.log(`Start Stage with ID: ${stageId}`);
  };

  const handleCloseStage = (stageId) => {

    console.log(`Close Stage with ID: ${stageId}`);
  };

  const handleReopenStage = (stageId) => {

    console.log(`Reopen Stage with ID: ${stageId}`);
  };

  const handleSuspendedStage = (stageId) => {

    console.log(`Suspend Stage with ID: ${stageId}`);
  };

  const isExceedPaymentDeadline = (stage) => {

    if (stage?.isContractAmountPaid && stage?.endTimePayment != null) {
      const currentDate = new Date();
      const stageDateObject = new Date(stage?.endTimePayment);
      return stageDateObject < currentDate;
    }
    return false;

  };

  return (
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Nhập tên.."></Search>
          <FilterStatus
            query={statusQuery}
            options={stageStatusOptions}
            label="Trạng thái"
            allValue={statusAllValue}
            allLabel="Tất cả"
          ></FilterStatus>
        </Box>
        <CreateStageModal
          success={handleModalResult}
        >Thêm</CreateStageModal>
      </Box>
      {/* Table */}
      {stages && stages.length > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <StyledTableCell width={"3%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  #
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"12%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tổng hợp đồng (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"12%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tổng phát sinh (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"17%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Thời gian thực hiện
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"8%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hạn chót
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center" width={"7%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái
                </Typography>
              </StyledTableCell >
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {stages.map((stage, index) => (
              <StyledTableRow key={stage.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.stageNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage?.totalContractPaid?.toLocaleString("en-US") ?? 0}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={800}>
                    {stage?.isContractAmountPaid ? "(Đã trả)" : "(Chưa trả)"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage?.totalIncurredPaid?.toLocaleString("en-US") ?? 0}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={800}>
                    {stage?.isIncurredAmountPaid ? "(Đã trả)" : "(Chưa trả)"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.startedDate
                      ? stage.endDate
                        ? `${new Date(stage.startedDate).toLocaleDateString(
                          "vi-VN"
                        )} - ${new Date(stage.endDate).toLocaleDateString(
                          "vi-VN"
                        )}`
                        : `${new Date(stage.startedDate).toLocaleDateString(
                          "vi-VN"
                        )} - Chưa xác định`
                      : "Chưa xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.endTimePayment
                      ? new Date(stage.endTimePayment).toLocaleDateString(
                        "vi-VN"
                      )
                      : "Chưa xác định"}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={800}>
                    {stage?.isPrepaid ? "(Trả trước)" : null}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor: stageStatusBackgroundChipColors[stage?.status] ||
                        "error",
                    }}
                    size="small"
                    label={
                      stageStatusOptions[stage?.status] ||
                      "Không xác định"
                    }
                  ></Chip>
                </TableCell>
                <TableCell align="right">

                  {stage?.status === 0 && !isExceedPaymentDeadline(stage) && (
                    // Start button
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      disableElevation
                      color="primary"
                      onClick={() => handleStartStage(stage.id)}
                    >
                      Bắt đầu
                    </Button>
                  )}

                  {stage?.status === 1 && (
                    // Close button
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      disableElevation
                      color="primary"
                      onClick={() => handleCloseStage(stage.id)}
                    >
                      Đóng
                    </Button>
                  )}

                  {stage?.status === 2 && (
                    // Reopen popup button
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      disableElevation
                      color="primary"
                      onClick={() => handleReopenStage(stage.id)}
                    >
                      Mở lại
                    </Button>
                  )}

                  {stage?.status === 0 && isExceedPaymentDeadline(stage) && (
                    // Suspended button
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      disableElevation
                      color="primary"
                      onClick={() => handleSuspendedStage(stage.id)}
                    >
                      Hoãn
                    </Button>
                  )}

                  <Button
                    component={Link}
                    sx={{ mr: 1 }}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/stages/${stage.id}`}
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
            Không có dữ liệu.
          </Typography>
        </Stack>
      )
      }
      <Pagination count={count}></Pagination>
    </Box >
  );
}
