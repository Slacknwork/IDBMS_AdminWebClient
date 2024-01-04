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
import { getAllInteriorItemColors } from "/services/interiorItemColorServices";
import { getAllInteriorItems } from "/services/interiorItemServices";
import colorType from "/constants/enums/colorType";
import { useSearchParams } from "next/navigation";
import FilterComponent from "/components/shared/FilterStatus";
import checkValidUrl from "components/validations/url";

import PageContainer from "/components/container/PageContainer";
import CreateItemColorModal from "/components/shared/Modals/ItemColors/CreateModal";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import Pagination from "/components/shared/Pagination";
import Image from "next/image";

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

export default function ItemColorList() {
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
  const [interiorItemColors, setInteriorItemColors] = useState([]);
  const [interiorItems, setInteriorItems] = useState([]);
  const [interiorItemCount, setInteriorItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [itemColors, setitemColors] = useState([]);
  const initialized = useRef(false);

  useEffect(() => {
    const type = searchParams.get(typeQuery) ?? "";
    const name = searchParams.get(nameQuery) ?? "";
    const pageNo = searchParams.get(pageQuery) ?? defaultPage;
    const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

    const fetchDataFromApi = async () => {
      try {
        setLoading(true);
        const items = await getAllInteriorItems({});
        const data = await getAllInteriorItemColors({
          type,
          name,
          pageNo,
          pageSize,
        });
        setInteriorItems(items.list);
        setInteriorItemColors(data.list);
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
    <PageContainer title="Danh sách màu" description="Danh sách màu">
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Search query={nameQuery} placeholder="Tìm loại / tên màu"></Search>
          <FilterComponent
            query={typeQuery}
            options={colorType}
            label="Loại dự án"
            allValue={typeAllValue}
            allLabel="Tất cả"
          ></FilterComponent>
        </Box>
        <CreateItemColorModal></CreateItemColorModal>
      </Box>
      {loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : interiorItemColors && interiorItemColors.length > 0 ? (
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
                  Tên màu
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại màu
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Màu chính
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Màu phụ
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interiorItemColors.map((itemColor) => (
              <StyledTableRow key={itemColor.id}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {itemColor.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      ></Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {colorType[itemColor?.type] || "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Image
                    src={checkValidUrl(itemColor.primaryColor)}
                    alt={itemColor.name ?? ""}
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
                    src={checkValidUrl(itemColor.secondaryColor)}
                    alt={itemColor.name ?? ""}
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
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/colors/${itemColor.id}`}
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
