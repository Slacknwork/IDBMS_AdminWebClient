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
  CircularProgress
} from "@mui/material";

import WarrantyModal from "/components/shared/Modals/WarrantyClaims/CreateModal";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import moment from "moment-timezone";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterComponent from "/components/shared/FilterStatus";
import { toast } from "react-toastify";
import { getWarrantyClaimsByProjectId } from "/api/warrantyClaimServices";


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

const isCompanyCoverOptions = ["Khách hàng", "Công ty"];

export default function WarrantyClaims() {
  const searchQuery = "search";

  const isCompanyCoverQuery = "isCompanyCover";
  const isCompanyCoverAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  // WARRANTY CLAIMS
  const [warrantyClaims, setWarrantyClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA 
  const fetchDataFromApi = async () => {
    const fetchWarrantyClaims = async () => {

      const projectId = params.id;
      const name = searchParams.get(searchQuery) || "";
      const isCompanyCover =
        searchParams.get(isCompanyCoverQuery) === '1' ?
          true : searchParams.get(isCompanyCoverQuery) === null ?
            "" : false;
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize = parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getWarrantyClaimsByProjectId({
          projectId,
          isCompanyCover,
          name,
          pageSize,
          pageNo,
        });
        console.log(response);

        setWarrantyClaims(response?.list ?? []);
        setCount(response?.totalItem ?? 0);

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thanh Toán' từ hệ thống");
      }
    };
    await Promise.all([
      fetchWarrantyClaims(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  return (
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>

          <Search
            placeholder="Tìm theo tên.."
          ></Search>

          <FilterComponent
            query={isCompanyCoverQuery}
            options={isCompanyCoverOptions}
            label="Đơn vị xử lý"
            allValue={isCompanyCoverAllValue}
            allLabel="Tất cả"
          ></FilterComponent>

        </Box>
        <WarrantyModal>Thêm</WarrantyModal>
      </Box>
      {/* Table */}
      {(warrantyClaims && warrantyClaims.length) > 0 ? (
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
                  Đơn vị xử lý
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
                      {claim?.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {claim?.totalPaid.toLocaleString("en-US")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {claim?.isCompanyCover ? isCompanyCoverOptions[1] : isCompanyCoverOptions[0]}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {claim?.createdDate ? moment(claim?.createdDate).format('L') : "Chưa xác định"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {claim?.endDate ? moment(claim?.endDate).format('L') : "Chưa xác định"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        component={Link}
                        variant="contained"
                        disableElevation
                        color="primary"
                        href={`/projects/${params.id}/warranty/${claim.id}`}
                      >
                        Chi Tiết
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
    </Box>
  );
}
