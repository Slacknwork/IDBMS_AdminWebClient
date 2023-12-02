"use client";

import { styled } from "@mui/material/styles";
import Link from "next/link";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";

import StageModal from "./modal";

// Sample paymentStage data
const paymentStages = [
  {
    id: "1",
    stageNo: 1,
    name: "Stage 1",
    totalContractPaidVND: 100000,
    totalIncurredPaidVND: 50000,
    startedDate: "2023-01-01",
    endDate: "2023-01-15",
    endTimePayment: "2023-01-20",
    isPaid: true,
  },
  {
    id: "2",
    stageNo: 2,
    name: "Stage 2",
    totalContractPaidVND: 150000,
    totalIncurredPaidVND: 75000,
    startedDate: "2023-02-01",
    endDate: "2023-02-15",
    endTimePayment: "2023-02-20",
    isPaid: false,
  },
  // Add more paymentStage objects as needed
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function PaymentStages() {
  const params = useParams();

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <StageModal>Thêm</StageModal>
      </Box>
      {/* Table */}
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
                Số tiền (VND)
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Phát sinh (VND)
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
          {paymentStages &&
            paymentStages.map((stage, index) => (
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
                    {stage.totalContractPaidVND}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.totalIncurredPaidVND}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.startedDate} - {stage.endDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {stage.endTimePayment}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  {stage.isPaid ? "Yes" : "No"}
                </TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/payment/stages/${stage.id}`}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
