"use client";

import Image from "next/image";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Stack,
  CircularProgress
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import ItemModal from "./(CreateItemModal)";
import { getItemInTasksByProjectId } from "api/itemInTaskServices";

const interiorItems = [
  {
    id: 1,
    code: "ITEM001",
    name: "Sofa",
    imageUrl:
      "https://i.pinimg.com/originals/be/d8/c2/bed8c28f7c314f30b6657297911cfc15.jpg",
    interiorItemCategory: { id: 1, name: "Furniture" },
    interiorItemStatus: 0,
  },
  {
    id: 2,
    code: "ITEM002",
    name: "Table",
    imageUrl:
      "https://zago-store.vn/wp-content/uploads/2021/03/loft-coffee-square-table-90x90x45h-cm_1-750x750.jpg",
    interiorItemCategory: { id: 2, name: "Decor" },
    interiorItemStatus: 1,
  },
];

const interiorItemCategoryOptions = [
  { id: 1, name: "Furniture" },
  { id: 2, name: "Decor" },
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

export default function InteriorItems() {

  const searchQuery = "search";

  const categoryQuery = "category";

  const statusQuery = "status";
  const statusAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const [categoryFilter, setCategoryFilter] = useState(-1);
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(parseInt(e.target.value));
  };

  const [statusFilter, setStatusFilter] = useState(-1);
  const handleStatusFilterChange = (e) => {
    setStatusFilter(parseInt(e.target.value));
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push(`/sites/${params.id}/interior-items?page=${newPage + 1}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    router.push(`/sites/${params.id}/interior-items?page=1`);
  };

  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState([]);

  const fetchDataFromApi = async () => {
    try {
      const projectId = params.id;
      const data = await getItemInTasksByProjectId(projectId);
      console.log(data);
      setValues(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <FormControl sx={{ minWidth: 300 }}>
            <TextField
              label="Tìm kiếm"
              size="small"
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
            <InputLabel id="category-filter-label">Danh mục</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              label="Danh mục"
              onChange={handleCategoryFilterChange}
            >
              <MenuItem value={-1}>Tất cả</MenuItem>
              {interiorItemCategoryOptions?.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ ml: 2, minWidth: 200 }} size="small">
            <InputLabel id="status-filter-label">Trạng thái</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Trạng thái"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value={-1}>Tất cả</MenuItem>
              {interiorItemStatusOptions?.map((status, index) => (
                <MenuItem value={index} key={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <ItemModal>
          <span>Tạo</span>
        </ItemModal>
      </Box>

      {(values && values.length) > 0 ? (
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Mã
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hình ảnh
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Danh mục
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Chi tiết
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interiorItems &&
              interiorItems.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {item.code}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={50}
                      height={50}
                      objectFit="cover"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {item.interiorItemCategory.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={interiorItemStatusOptions[item.interiorItemStatus]}
                      color={
                        item.interiorItemStatus === 0 ? "default" : "primary"
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/projects/${params.id}/items/${item.id}`}
                    >
                      Chi tiết
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
      <TablePagination
        component="div"
        count={6}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
