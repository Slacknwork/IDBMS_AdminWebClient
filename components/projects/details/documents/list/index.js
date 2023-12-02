"use client";

// Import necessary components and libraries
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
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
} from "@mui/material";
import {
  IconDownload,
  IconPencil,
  IconTrash,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import DocumentModal from "./modal";
import DeleteModal from "./deleteModal";

// Sample projectDocuments data
const projectDocuments = [
  {
    id: 1,
    name: "Document 1",
    category: 1,
    createdDate: new Date("2023-01-20"),
    projectDocumentTemplate: { id: 1, name: "Template A" },
  },
  {
    id: 2,
    name: "Document 2",
    category: 2,
    createdDate: new Date("2023-02-10"),
    projectDocumentTemplate: { id: 2, name: "Template B" },
  },
  // Add more projectDocuments as needed
];

const projectDocumentCategories = [
  { id: 1, name: "Category A" },
  { id: 2, name: "Category B" },
  // Add more categories as needed
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

export default function ProjectDocuments() {
  const params = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(-1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(parseInt(e.target.value));
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      {/* Filter and Search */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Box sx={{ display: "flex" }}>
          {/* Search Text Field with Search Icon */}
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

          {/* Category Select Box */}
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
              {projectDocumentCategories?.map((category) => (
                <MenuItem value={category.id} key={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <DocumentModal>
          <span>Thêm</span>
        </DocumentModal>
      </Box>

      {/* Table */}
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tên
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Danh mục
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Ngày tạo
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Mẫu tài liệu
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectDocuments.map((document) => (
            <StyledTableRow key={document.id}>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {document.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {
                    projectDocumentCategories.find(
                      (cat) => cat.id === document.category
                    )?.name
                  }
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {document.createdDate.toLocaleDateString("vi-VN")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {document.projectDocumentTemplate?.name}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ display: "flex" }}>
                <DeleteModal>
                  <IconTrash></IconTrash>
                </DeleteModal>
                <DocumentModal projectDocument={document}>
                  <IconPencil></IconPencil>
                </DocumentModal>
                <Button
                  size="small"
                  variant="contained"
                  disableElevation
                  color="primary"
                >
                  <IconDownload></IconDownload>
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
