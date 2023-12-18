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
import advertisementStatusOptions from "/constants/enums/advertisementStatus";

import { getAdvertisementProjects } from "/api/advertisementServices";

import PageContainer from "/components/container/PageContainer";
import Pagination from "/components/shared/Pagination";
import FilterStatus from "/components/shared/FilterStatus";
import Search from "/components/shared/Search";

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

export default function AdvertisementPage() {
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

  const advertisementStatusQuery = "status";
  const advertisementStatusLabel = "Trạng thái quảng cáo";
  const advertisementStatusAllValue = -1;
  const advertisementStatusAllLabel = "Tất cả";

  // INIT
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [values, setValues] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setLoading(true);
      const search = searchParams.get(searchQuery) ?? "";
      const status = searchParams.get(advertisementStatusQuery) ?? "";
      const type = searchParams.get(projectTypeQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;
      try {
        const data = await getAdvertisementProjects({
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
    <PageContainer title="Quảng cáo" description="Danh sách dự án quảng cáo">
      <Typography variant="h2">Quảng cáo</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3 }}>
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
                  query={advertisementStatusQuery}
                  options={advertisementStatusOptions}
                  label={advertisementStatusLabel}
                  allValue={advertisementStatusAllValue}
                  allLabel={advertisementStatusAllLabel}
                ></FilterStatus>
              </Box>
            </Box>
            {loading ? (
              <Stack sx={{ my: 10 }}>
                <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
              </Stack>
            ) : values && values.length > 0 ? (
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
                        Trạng thái quảng cáo
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      width={"15%"}
                      align="right"
                    ></StyledTableCell>
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
                          label={
                            advertisementStatusOptions[
                              project.advertisementStatus
                            ]
                          }
                          fontWeight={400}
                        ></Chip>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          component={Link}
                          variant="contained"
                          disableElevation
                          color="primary"
                          href={`/advertisement/${project.id}`}
                        >
                          Chi tiết
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Stack sx={{ my: 5 }}>
                <Typography variant="p" sx={{ textAlign: "center" }}>
                  Không có dự án.
                </Typography>
              </Stack>
            )}
            <Pagination count={count}></Pagination>
          </Box>
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
                      href={`/advertisement/${project.id}`}
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
        <Pagination count={count}></Pagination>
      </Box>
    </PageContainer>
  );
}
