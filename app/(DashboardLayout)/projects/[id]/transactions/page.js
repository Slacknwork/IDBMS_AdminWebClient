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
  TablePagination,
  TableRow,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";

import transactionTypeOptions from "/constants/enums/transactionType";
import transactionStatusOptions from "/constants/enums/transactionStatus";

import TransactionModal from "../../../../../components/shared/Modals/Transactions/CreateModal";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import moment from "moment-timezone";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterComponent from "/components/shared/FilterStatus";
import { toast } from "react-toastify";
import { getTransactionsByProjectId } from "/services/transactionServices";
import { participationRoleIndex } from "/constants/enums/participationRole";
import { useSelector } from "react-redux";
import { companyRoleConstants } from "/constants/enums/companyRole";


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
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const participation = data?.projectRole;

  const searchQuery = "search";

  const typeQuery = "type";
  const typeAllValue = -1;

  const statusQuery = "status";
  const statusAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  // TRANSACTIONS
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchTransactions = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const type = searchParams.get(typeQuery) || "";
      const status = searchParams.get(statusQuery) || "";
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getTransactionsByProjectId({
          projectId,
          search,
          type,
          status,
          pageSize,
          pageNo,
        });
        console.log(response);

        setTransactions(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thanh Toán' từ hệ thống");
      }
    };
    await Promise.all([fetchTransactions()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  };

  const [isManageProjectAuthorized, setIsManageProjectAuthorized] = useState(false);
  useEffect(() => {
    setIsManageProjectAuthorized(user?.role === companyRoleConstants.ADMIN ||
      participation?.role === participationRoleIndex.ProjectManager);
  }, [user?.role, participation?.role]);

  return (
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên người trả.."></Search>

          <FilterComponent
            query={typeQuery}
            options={transactionTypeOptions}
            label="Phân loại"
            allValue={typeAllValue}
            allLabel="Tất cả"
          ></FilterComponent>

          <FilterComponent
            query={statusQuery}
            options={transactionStatusOptions}
            label="Trạng thái"
            allValue={statusAllValue}
            allLabel="Tất cả"
          ></FilterComponent>
        </Box>

        {isManageProjectAuthorized && (
          <TransactionModal success={handleModalResult}>
          </TransactionModal>
        )}

      </Box>
      {/* Table */}
      {(transactions && transactions.length) > 0 ? (
        <Table sx={{ mt: 1 }} aria-label="simple table">
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
                  Người trả
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
                      {transaction.amount.toLocaleString("en-US")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {transaction?.createdDate
                        ? moment(transaction?.createdDate).format("L")
                        : "Chưa xác định"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {transaction?.payerName}
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
                        href={`/projects/${params.id}/transactions/${transaction.id}`}
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
      )}
      <Pagination count={count}></Pagination>
    </Box>
  );
}
