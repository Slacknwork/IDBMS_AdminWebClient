"use client";

// Import necessary components and libraries
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
  Stack,
  CircularProgress,
  Link,
} from "@mui/material";
import { IconDownload } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment-timezone";

import timezone from "/constants/timezone";
import projectDocumentCategories from "/constants/enums/projectDocumentCategory";
import { companyRoleConstants } from "/constants/enums/companyRole";

import { getDocumentsByProjectId } from "/services/projectDocumentServices";

import GenerateContractModal from "/components/shared/Modals/Contract/GenerateModal";
import DocumentModal from "/components/shared/Modals/ProjectDocuments/CreateModal";
import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterCategory from "/components/shared/FilterStatus";

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

  const user = useSelector((state) => state.user);
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  moment.tz.setDefault(timezone.momentDefault);

  // DOCUMENTS
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchDocuments = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const categoryEnum = searchParams.get(categoryQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

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

    await Promise.all([fetchDocuments()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  const handleModalResult = () => {
    fetchDataFromApi();
  };

  return (
    <Box sx={{ zIndex: 1 }}>
      {/* Filter and Search */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên.."></Search>

          <FilterCategory
            query={categoryQuery}
            options={projectDocumentCategories}
            label="Danh mục"
            allValue={categoryAllValue}
            allLabel="Tất cả"
          ></FilterCategory>
        </Box>
        <Box sx={{ display: "flex" }}>
          {user?.role && user?.role === companyRoleConstants.ADMIN && (
            <GenerateContractModal sx={{ mr: 1 }}></GenerateContractModal>
          )}

          <DocumentModal success={handleModalResult}>
            <span>Tạo</span>
          </DocumentModal>
        </Box>
      </Box>
      {/* Table */}
      {(documents && documents.length) > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell width="40%">
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell width="20%">
                <Typography variant="subtitle2" fontWeight={600}>
                  Danh mục
                </Typography>
              </StyledTableCell>
              <StyledTableCell width="20%">
                <Typography variant="subtitle2" fontWeight={600}>
                  Ngày tạo
                </Typography>
              </StyledTableCell>
              <StyledTableCell width="20%" align="right"></StyledTableCell>
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
                    {projectDocumentCategories[document?.category] ??
                      "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {document?.createdDate
                      ? moment(document?.createdDate).format("L")
                      : "Chưa xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      sx={{ width: 75, mr: 2 }}
                      size="small"
                      variant="contained"
                      disableElevation
                      color="primary"
                      endIcon={<IconDownload></IconDownload>}
                    >
                      Tải
                    </Button>
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/projects/${params.id}/documents/${document.id}`}
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
