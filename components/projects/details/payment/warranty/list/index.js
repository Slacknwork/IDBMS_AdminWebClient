"use client";

import { useState } from "react";
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
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";

import WarrantyModal from "./modal";

const warrantyClaims = [
  {
    id: "1",
    name: "Warranty Claim 1",
    totalPaid: 2000,
    isCompanyCover: true,
    createdDate: "2023-01-01",
    endDate: "2023-02-01",
  },
  {
    id: "2",
    name: "Warranty Claim 2",
    totalPaid: 1500,
    isCompanyCover: false,
    createdDate: "2023-02-01",
    endDate: "2023-03-01",
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Transactions() {
  const params = useParams();

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <WarrantyModal>Thêm</WarrantyModal>
      </Box>
      {/* Table */}
      <Table aria-label="simple table" sx={{ mt: 1 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tên
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tổng Số Tiền (VND)
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Bảo Hiểm Công Ty
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Ngày Tạo
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Ngày Kết Thúc
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warrantyClaims &&
            warrantyClaims.map((claim) => (
              <StyledTableRow key={claim.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {claim.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {claim.totalPaid.toLocaleString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {claim.isCompanyCover ? "Có" : "Không"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {new Date(claim.createdDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {new Date(claim.endDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/projects/${params.id}/payment/warranty/${claim.id}`}
                    >
                      Chi Tiết
                    </Button>
                  </Box>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
