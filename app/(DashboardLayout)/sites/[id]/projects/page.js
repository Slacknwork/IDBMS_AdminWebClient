"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Avatar,
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

import projectTypeOptions, {
  projectTypeChipColors,
} from "/constants/enums/projectType";
import languageTypeOptions, {
  languageTypeChipColors,
  languageTypeChipImages,
} from "/constants/enums/language";
import projectStatusOptions from "/constants/enums/projectStatus";

import { getProjectsBySiteId } from "/api/projectServices";

import PageContainer from "/components/container/PageContainer";
import Pagination from "/components/shared/Pagination";
import FilterStatus from "/components/shared/FilterStatus";
import Search from "/components/shared/Search";
import CreateProjectModal from "./(CreateProjectModal)";

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

export default function ProjectListPage() {
  // CONSTANTS
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const projectTypeQuery = "type";
  const projectTypeLabel = "Loại dự án";
  const projectTypeAllValue = -1;
  const projectTypeAllLabel = "Tất cả";

  const projectStatusQuery = "status";
  const projectStatusLabel = "Trạng thái";
  const projectStatusAllValue = -1;
  const projectStatusAllLabel = "Tất cả";

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const siteId = params.id;
      const search = searchParams.get(searchQuery) ?? "";
      const status = searchParams.get(projectStatusQuery) ?? "";
      const type = searchParams.get(projectTypeQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;
      try {
        const data = await getProjectsBySiteId({
          siteId,
          search,
          type,
          status,
          page,
          pageSize,
        });
        setCount(data.totalItem);
        setValues(data.list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <PageContainer title="Danh sách dự án" description="Danh sách dự án">
      <Box sx={{ zIndex: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Search placeholder="Tìm tên dự án"></Search>
            <FilterStatus
              query={projectTypeQuery}
              options={projectTypeOptions}
              label={projectTypeLabel}
              allValue={projectTypeAllValue}
              allLabel={projectTypeAllLabel}
            ></FilterStatus>
            <FilterStatus
              query={projectStatusQuery}
              options={projectStatusOptions}
              label={projectStatusLabel}
              allValue={projectStatusAllValue}
              allLabel={projectStatusAllLabel}
            ></FilterStatus>
          </Box>
          <CreateProjectModal></CreateProjectModal>
        </Box>
        {values && values.length > 0 ? (
          <Table aria-label="simple table" sx={{ mt: 1 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell width={"40%"}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Tên
                  </Typography>
                </StyledTableCell>
                <StyledTableCell width={"15%"}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Loại
                  </Typography>
                </StyledTableCell>
                <StyledTableCell width={"15%"}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Ngôn ngữ
                  </Typography>
                </StyledTableCell>
                <StyledTableCell width={"15%"}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Trạng thái
                  </Typography>
                </StyledTableCell>
                <StyledTableCell width={"15%"} align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values?.map((project) => (
                <StyledTableRow key={project.id}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {project.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={projectTypeOptions[project.type]}
                      color={projectTypeChipColors[project.type]}
                      fontWeight={400}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={languageTypeOptions[project.language]}
                      color={languageTypeChipColors[project.language]}
                      avatar={
                        <Avatar
                          src={languageTypeChipImages[project.language]}
                        />
                      }
                      variant="outlined"
                      fontWeight={400}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={projectStatusOptions[project.status]}
                      fontWeight={400}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/projects/${project.id}`}
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
              Không có yêu cầu.
            </Typography>
          </Stack>
        )}
        <Pagination count={count}></Pagination>
      </Box>
    </PageContainer>
  );
}
