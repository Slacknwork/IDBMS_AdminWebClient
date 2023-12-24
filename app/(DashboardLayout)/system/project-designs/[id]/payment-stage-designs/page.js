"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Stack,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { getAllProjectDesigns } from "/api/projectDesignServices";
import { getAllPaymentStageDesignsByProjectDesignId } from "/api/paymentStageDesignServices";

import calculationUnit from "/constants/enums/calculationUnit";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import CreatePaymentStageDesignModal from "/components/shared/Modals/PaymentStageDesigns/CreateModal";

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

export default function ProjectList() {
  // CONSTANTS
  const searchQuery = "search";

  const categoryQuery = "type";
  const projectDesignAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const searchParams = useSearchParams();
  const params = useParams();
 
  // INIT CONST
  const [paymentStageDesigns, setPaymentStageDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchPaymentStageDesigns = async () => {
      const name = searchParams.get(searchQuery) || "";
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;
        console.log(params.id);
        try {
        const response = await getAllPaymentStageDesignsByProjectDesignId({
          projectDesignId: params.id,
          name,
          pageSize,
          pageNo,
        });
        console.log(response);
        setPaymentStageDesigns(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thiết Kế Công Việc' từ hệ thống");
      }
    };
    await Promise.all([fetchPaymentStageDesigns()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const [projectDesigns, setProjectDesigns] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    setLoading(true);
    const fetchProjectDesigns = async () => {
      try {
        const response = await getAllProjectDesigns();
        console.log(response);
        setProjectDesigns(response.list);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    await Promise.all([fetchProjectDesigns()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  const handleModalResult = () => {
    fetchDataFromApi();
  }

  return (
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên.."></Search>
        </Box>
        <CreatePaymentStageDesignModal success={handleModalResult}>Tạo</CreatePaymentStageDesignModal>
      </Box>

      {(paymentStageDesigns && paymentStageDesigns.length) > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell width={"30%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Phần trăm giá
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trả trước
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Số giai đoạn
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Thiết kế dự án
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentStageDesigns.map((paymentStageDesign) => (
              <StyledTableRow key={paymentStageDesign.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {paymentStageDesign?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                    <LinearProgress
                        variant="determinate"
                        value={paymentStageDesign?.pricePercentage}
                    />
                    <Typography variant="body2" fontWeight={400}>
                        {`${paymentStageDesign?.pricePercentage}%`}
                        </Typography>
                    </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                  {paymentStageDesign?.isPrepaid ? "Đã trả" : "Chưa trả"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {paymentStageDesign?.stageNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {paymentStageDesign?.projectDesign?.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`payment-stage-designs/${paymentStageDesign.id}`}
                  >
                    Thông tin
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
