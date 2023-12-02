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

import transactionTypeOptions from "/constants/enums/transactionType";
import transactionStatusOptions from "/constants/enums/transactionStatus";

import TransactionModal from "./modal";

// Sample transaction data
const transactions = [
  {
    id: "1",
    type: 1,
    amount: 1000,
    createdDate: "2023-01-01",
    user: { id: "1", name: "John Doe" },
    status: 0,
  },
  {
    id: "2",
    type: 2,
    amount: 500,
    createdDate: "2023-02-01",
    user: { id: "2", name: "Jane Doe" },
    status: 1,
  },
  // Add more transaction objects as needed
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <TransactionModal>Add Transaction</TransactionModal>
      </Box>
      {/* Table */}
      <Table aria-label="simple table" sx={{ mt: 1 }}>
        {/* Table Head */}
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Loại
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Số tiền (VND)
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Ngày tạo
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Người tạo
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Trạng thái
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        {/* Table Body */}
        <TableBody>
          {transactions &&
            transactions.map((transaction) => (
              <StyledTableRow key={transaction.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {transactionTypeOptions[transaction.type]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {transaction.amount.toLocaleString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {new Date(transaction.createdDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {transaction.user?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {transactionStatusOptions[transaction.status]}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/projects/${params.id}/payment/transactions/${transaction.id}`}
                    >
                      Chi tiết
                    </Button>
                  </Box>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={10}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
