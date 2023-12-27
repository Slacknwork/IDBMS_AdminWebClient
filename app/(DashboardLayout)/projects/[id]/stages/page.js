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

import {
  getPaymentStagesByProjectId,
  startPaymentStage,
  endPaymentStage,
  suspendPaymentStage,
} from "/api/paymentStageServices";


import CreateStageModal from "/components/shared/Modals/Stages/CreateModal";
import Search from "/components/shared/Search";
import FilterStatus from "/components/shared/FilterStatus";
import Pagination from "/components/shared/Pagination";
import { stageStatusBackgroundChipColors } from "../../../../../constants/enums/stageStatus";
import ReopenStageModal from "/components/shared/Modals/Stages/ReopenStageModal"
import MessageModal from "/components/shared/Modals/Message";
import moment from "moment-timezone";

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
  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  // FETCH DATA FROM API
  const [stages, setStages] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // FETCH DATA 
  const fetchDataFromApi = async () => {
    const fetchPaymentStages = async () => {

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
        toast.error("Lỗi nạp dữ liệu 'Giai đoạn' từ hệ thống");
      }
    };
    await Promise.all([
      fetchPaymentStages(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  }

  //STAGE STATUS HANDLE
  const handleStartStage = async (stageId) => {
    try {
      const response = await startPaymentStage(stageId);
      toast.success("Cập nhật thành công!");
      fetchDataFromApi()
    } catch (error) {
      console.error("Error:", error);
      toast.error("Lỗi!");
    }
  };

  const handleCloseStage = async (stageId) => {
    try {
      const response = await endPaymentStage(stageId);
      toast.success("Cập nhật thành công!");
      fetchDataFromApi()
    } catch (error) {
      console.error("Error:", error);
      toast.error("Lỗi!");
    }
  };

  const handleSuspendedStage = async (stageId) => {
    try {
      const response = await suspendPaymentStage(stageId);
      toast.success("Cập nhật thành công!");
      fetchDataFromApi()
    } catch (error) {
      console.error("Error:", error);
      toast.error("Lỗi!");
    }
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
              <StyledTableCell width={"18%"}>
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
              <StyledTableCell width={"12%"}>
                <Typography variant="subtitle2" sx={{ textAlign: "center" }} fontWeight={600}>
                  Thời gian thực hiện
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hạn chót thanh toán
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
            {stages.map((response, index) => (
              <StyledTableRow key={response.stage.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {response.stage.stageNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {response.stage.name}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={800}>
                    {response.stage?.isWarrantyStage ? "(Giai đoạn bảo hành)" : null}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {response.stage?.totalContractPaid?.toLocaleString("en-US") ?? 0}
                  </Typography>
                  ~ {response.stage?.pricePercentage ?? 0} %
                  <Typography variant="subtitle2" fontWeight={800}>
                    {response.stage?.isContractAmountPaid ? "(Đã trả)" : "(Chưa trả)"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {response.stage?.totalIncurredPaid?.toLocaleString("en-US") ?? 0}
                  </Typography>
                  {response.stage?.penaltyFee > 0 ? "+ " + (response.stage?.penaltyFee?.toLocaleString("en-US") ?? 0) : null}
                  <Typography variant="subtitle2" fontWeight={800}>
                    {response.stage?.isIncurredAmountPaid ? "(Đã trả)"
                      : response.stage?.isContractAmountPaid ? "(Chưa trả)" : null}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ textAlign: "center" }} fontWeight={400}>
                    {response.stage.startedDate ?
                      `${new Date(response.stage.startedDate).toLocaleDateString("vi-VN")}` : "Chưa xác định"}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ textAlign: "center" }} fontWeight={700}>
                    -
                  </Typography>
                  <Typography variant="subtitle2" sx={{ textAlign: "center" }} fontWeight={400}>
                    {response.stage.endDate ?
                      `${new Date(response.stage.endDate).toLocaleDateString("vi-VN")}` : "Chưa xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {response.stage.endTimePayment
                      ? moment(response.stage.endTimePayment).format("L")
                      : "Chưa xác định"}
                  </Typography>
                  {/* <Typography variant="subtitle2" fontWeight={800}>
                    {response.stage?.isPrepaid ? "(Trả trước)" : null}
                  </Typography> */}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor: stageStatusBackgroundChipColors[response.stage?.status] ||
                        "error",
                    }}
                    size="small"
                    label={
                      stageStatusOptions[response.stage?.status] ||
                      "Không xác định"
                    }
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" alignItems="center">
                    {response.openAllowed && (
                      <MessageModal
                        disabled={loading}
                        color="success"
                        buttonLabel={"Bắt đầu"}
                        onSubmit={() => handleStartStage(response.stage.id)}
                        title={"Bắt đầu giai đoạn"}
                        submitLabel={"Xác nhận"}
                      >
                        <Typography variant="p">{"Xác nhận bắt đầu giai đoạn"}</Typography>
                      </MessageModal>
                    )}

                    {response.closeAllowed && (
                      <MessageModal
                        disabled={loading}
                        color="success"
                        buttonLabel={"Đóng"}
                        onSubmit={() => handleCloseStage(response.stage.id)}
                        title={"Đóng giai đoạn"}
                        submitLabel={"Xác nhận"}
                      >
                        <Typography variant="p">{"Xác nhận đã hoàn thành giai đoạn"}</Typography>
                      </MessageModal>
                    )}

                    {response.reopenAllowed && (
                      <ReopenStageModal
                        stageId={response.stage.id}
                        success={handleModalResult}
                      > </ReopenStageModal>
                    )}

                    {response.suspendAllowed && (
                      <MessageModal
                        disabled={loading}
                        color="error"
                        buttonLabel={"Hoãn"}
                        onSubmit={() => handleSuspendedStage(response.stage.id)}
                        title={"Hoãn giai đoạn"}
                        submitLabel={"Xác nhận"}
                      >
                        <Typography variant="p">{"Xác nhận hoãn giai đoạn này"}</Typography>
                      </MessageModal>
                    )}

                    <Button
                      component={Link}
                      sx={{ ml: "auto" }}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/projects/${params.id}/stages/${response.stage.id}`}
                    >
                      Chi tiết
                    </Button>
                  </Box>
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
