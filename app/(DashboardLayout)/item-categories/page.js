"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import { IconSearch } from "@tabler/icons-react";
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
  Chip,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllInteriorItemCategories, getInteriorItemCategoryById } from "/api/interiorItemCategoryServices";
import interiorItemType from "/constants/enums/interiorItemType";
import { useSearchParams } from "next/navigation";
import FilterComponent from "/components/shared/FilterStatus";

import PageContainer from "/components/container/PageContainer";
import CreateItemCategoryModal from "/components/shared/Modals/ItemCategories/CreateModal";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import Pagination from "/components/shared/Pagination";
import Image from "next/image";

import checkValidUrl from "components/validations/url"

const projects = [
  {
    id: "1",
    name: "COOLNAME Building",
    companyName: "COOLNAME Co.",
    projectType: 0,
    language: 0,
    status: 0,
    estimatePrice: 200,
    finalPrice: 200,
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ItemCategoriesList() {
  // CONSTANTS
  const typeQuery = "type";
  const nameQuery = "name";
  const searchQuery = "search";
  const interiorItemCategoryQuery = "category";
  const typeAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [interiorItemCount, setInteriorItemCount] = useState(0);
  const [interiorItemCategories, setInteriorItemCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    const type = searchParams.get(typeQuery) ?? "";
    const name = searchParams.get(nameQuery) ?? "";
    const pageNo = searchParams.get(pageQuery) ?? defaultPage;
    const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

    const fetchDataFromApi = async () => {
      try {
        setLoading(true);
        const data = await getAllInteriorItemCategories({
          type,
          name,
          pageNo,
          pageSize,
        });
        console.log(data)
        setInteriorItemCategories(data.list);
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
    <PageContainer title="Danh sách phân loại" description="Danh sách phân loại">
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Search
            query={nameQuery}
            placeholder="Tìm loại / tên phân loại"
          ></Search>
          <FilterComponent
            query={typeQuery}
            options={interiorItemType}
            label="Loại dự án"
            allValue={typeAllValue}
            allLabel="Tất cả"
          ></FilterComponent>
        </Box>
        <CreateItemCategoryModal></CreateItemCategoryModal>
      </Box>
      {loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : interiorItemCategories && interiorItemCategories.length > 0 ? (
        <Table
          aria-label="simple table"
          sx={{
            overflowX: "hidden",
            mt: 1,
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên loại sản phẩm
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ảnh banner
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Icon
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại nội thất
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại sản phẩm liên quan
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interiorItemCategories.map((itemCategory) => (
              <StyledTableRow key={itemCategory.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {itemCategory.name}
                  </Typography>
                </TableCell>
                {/* <TableCell>
                  <Image
                    src={itemCategory.bannerImageUrl ?? "/images/results/no-image.png"}
                    alt={itemCategory.name ?? ""}
                    width={200}
                    height={200}
                    style={{
                      objectFit: "cover",
                      width: "7rem",
                      height: "7rem",
                    }}
                  />
              </TableCell> */}
                <TableCell>
                  <Image
                    src={checkValidUrl(itemCategory.bannerImageUrl)}
                    alt={itemCategory.name ?? ""}
                    width={200}
                    height={200}
                    onError={(e) => {
                      e.target.src = "/images/results/no-image.png";
                    }}
                    unoptimized={true}
                    style={{
                      objectFit: "cover",
                      width: "7rem",
                      height: "7rem",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Image
                    src={checkValidUrl(itemCategory.iconImageUrl)}
                    alt={itemCategory.name ?? ""}
                    width={200}
                    height={200}
                    onError={(e) => {
                      e.target.src = "/images/results/no-image.png";
                    }}
                    unoptimized={true}
                    style={{
                      objectFit: "cover",
                      width: "7rem",
                      height: "7rem",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {interiorItemType[itemCategory?.interiorItemType] || "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {itemCategory?.parentCategory?.name ?? 'Không có'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/item-categories/${itemCategory.id}`}
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
            Không có yêu cầu.
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
