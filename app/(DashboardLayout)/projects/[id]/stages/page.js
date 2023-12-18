"use client";

import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import stageStatusOptions from "/constants/enums/stageStatus";

import { getPaymentStagesByProjectId } from "/api/paymentStageServices";

import CreateStageModal from "/components/shared/Modals/Stages/CreateModal";
import Search from "/components/shared/Search";
import FilterStatus from "/components/shared/FilterStatus";
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
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search></Search>
          <FilterStatus
            query={statusQuery}
            options={stageStatusOptions}
            label="Trạng thái"
            allValue={statusAllValue}
            allLabel="Tất cả"
          ></FilterStatus>
        </Box>
        <CreateStageModal>Thêm</CreateStageModal>
      </Box>
      {/* Table */}
      {stages && stages.length > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  #
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tổng hợp đồng (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tổng phát sinh (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Thời gian
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hạn chót trả tiền
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  Đã trả
                </Typography>
              </StyledTableCell>
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
                    {stage.totalContractPaid?.toLocaleString("en-US")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.totalIncurredPaid?.toLocaleString("en-US")}
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
                </TableCell>
                <TableCell align="center">
                  {stage.isPaid ? "Chưa" : "Rồi"}
                </TableCell>
                <TableCell>
                  <Button
                    component={Link}
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
      )}
      <Pagination count={count}></Pagination>
    </Box>
  );
}
