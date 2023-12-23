"use client";

import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "next/navigation";
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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAllInteriorItems } from "/api/interiorItemServices";
import { getAllInteriorItemCategories } from "/api/interiorItemCategoryServices";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import checkValidUrl from "components/validations/url"

import PageContainer from "/components/container/PageContainer";
import CreateItemModal from "/components/shared/Modals/Items/CreateModal";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
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

export default function ItemListPage() {
  // CONSTANTS
  const typeQuery = "type";
  const statusQuery = "status";
  const searchQuery = "search";
  const interiorItemCategoryQuery = "category";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [interiorItems, setInteriorItems] = useState([]);
  const [interiorItemCategories, setInteriorItemCategories] = useState([]);
  const [interiorItemCount, setInteriorItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codeOrName = searchParams.get(searchQuery) ?? "";
    const status = searchParams.get(statusQuery) ?? "";
    const itemCategoryId = searchParams.get(interiorItemCategoryQuery) ?? "";
    const itemType = searchParams.get(typeQuery) ?? "";
    const pageNo = searchParams.get(pageQuery) ?? defaultPage;
    const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

    const fetchDataFromApi = async () => {
      try {
        setLoading(true);
        const categories = await getAllInteriorItemCategories({});
        const data = await getAllInteriorItems({
          itemCategoryId,
          codeOrName,
          status,
          itemType,
          pageNo,
          pageSize,
        });
        setInteriorItemCategories(categories.list);
        setInteriorItems(data.list);
        setInteriorItemCount(data.totalItem);
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
    <PageContainer title="Danh sách sản phẩm" description="Danh sách sản phẩm">
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Search
            query={searchQuery}
            placeholder="Tìm mã / tên sản phẩm"
          ></Search>
          <FilterAutocomplete
            query={interiorItemCategoryQuery}
            options={interiorItemCategories}
            label="Danh mục"
            allValue={-1}
            allLabel="Tất cả"
          ></FilterAutocomplete>
        </Box>
        <CreateItemModal></CreateItemModal>
      </Box>
      {loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : interiorItems && interiorItems.length > 0 ? (
        <Table
          aria-label="simple table"
          sx={{
            overflowX: "hidden",
            mt: 1,
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên sản phẩm
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hình ảnh
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại sản phẩm
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}>
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
                  <Typography variant="subtitle2" fontWeight={600}>
                    {item?.code}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {item?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Image
                    src={checkValidUrl(item.imageUrl)}
                    alt={item.name ?? ""}
                    width={200}
                    height={200}
                    style={{
                      objectFit: "cover",
                      width: "7rem",
                      height: "7rem",
                    }}
                  />
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
      ) : (
        <Stack sx={{ my: 5 }}>
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Không có dữ liệu.
          </Typography>
        </Stack>
      )}

      <Pagination
        query={pageQuery}
        sizeQuery={pageSizeQuery}
        count={interiorItemCount}
      />
    </PageContainer>
  );
}
