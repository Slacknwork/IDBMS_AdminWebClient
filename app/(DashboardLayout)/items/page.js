"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getInteriorItemsFilter,
  countInteriorItemsFilter,
} from "/api/interiorItemServices";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";

import CreateItemModal from "./(CreateItemModal)";
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

export default function ItemList() {
  // CONSTANTS
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 0;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [interiorItems, setInteriorItems] = useState([]);
  const [interiorItemCount, setInteriorItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const search = searchParams.get(searchQuery) || "";
    const page = parseInt(searchParams.get(pageQuery)) - 1 || defaultPage;
    const pageSize =
      parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

    const fetchDataFromApi = async () => {
      try {
        setLoading(true);
        const data = await getInteriorItemsFilter(search, page, pageSize);
        const count = await countInteriorItemsFilter(search);
        setInteriorItems(data);
        setInteriorItemCount(count);
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
    <Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Search query={searchQuery}></Search>
        <CreateItemModal></CreateItemModal>
      </Box>
      {interiorItems && interiorItems.length > 0 ? (
        <Table
          aria-label="simple table"
          sx={{
            overflowX: "hidden",
            my: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell width={"25%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên sản phẩm
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"17.5%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại sản phẩm
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"12.5%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Đơn vị
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Giá ước tính / Quyết toán (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interiorItems.map((item) => (
              <StyledTableRow key={item.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {item?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {item?.interiorItemCategory?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {calculationUnitOptions[item?.calculationUnit] ||
                      "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor: "primary.main",
                      color: "#fff",
                    }}
                    size="small"
                    label={
                      interiorItemStatusOptions[item?.status] ||
                      "Không xác định"
                    }
                  ></Chip>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {item?.estimatePrice?.toLocaleString("en-US")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/items/${item.id}`}
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
            Không có yêu cầu.
          </Typography>
        </Stack>
      )}

      <Pagination
        query={pageQuery}
        sizeQuery={pageSizeQuery}
        count={interiorItemCount}
      />
    </Box>
  );
}
