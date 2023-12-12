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
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  IconDownload,
  IconPencil,
  IconTrash,
  IconSearch,
} from "@tabler/icons-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import DocumentModal from "./(DocumentModal)";
import DeleteModal from "./(DeleteDocumentModal)";

import projectDocumentCategories from "/constants/enums/projectDocumentCategory";
import { getDocumentsByProjectId } from "api/projectDocumentServices";
import moment from "moment-timezone";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterCategory from "/components/shared/FilterStatus";
import { toast } from "react-toastify";


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

  const searchQuery = "search";

  const categoryQuery = "category";
  const categoryAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  moment.tz.setDefault("Asia/Ho_Chi_Minh");


  // DOCUMENTS
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchDocuments = async () => {

      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const categoryEnum = searchParams.get(categoryQuery) || "";
      const page = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize = parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getDocumentsByProjectId({
          projectId,
          search,
          categoryEnum,
          page,
          pageSize,
        });
        console.log(response);
        setDocuments(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Tài Liệu' từ hệ thống");
      }
    };

    await Promise.all([
      fetchDocuments(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  return (
    <Box sx={{ zIndex: 1 }}>
      {/* Filter and Search */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search
            placeholder="Tìm theo tên.."
          ></Search>

          <FilterCategory
            query={categoryQuery}
            options={projectDocumentCategories}
            label="Danh mục"
            allValue={categoryAllValue}
            allLabel="Tất cả"
          ></FilterCategory>

        </Box>
        <DocumentModal>
          <span>Tạo</span>
        </DocumentModal>
      </Box>
      {/* Table */}
      {(documents && documents.length) > 0 ? (
        < Table aria-label="simple table" sx={{mt: 1}}>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Mô tả
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
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document) => (
              <StyledTableRow key={document?.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {document?.name ?? ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {document?.description ?? ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {projectDocumentCategories[document?.category] ?? "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {document?.createdDate ? moment(document?.createdDate).format('L') : "Chưa xác định"}
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
    </Box >
  );
}
