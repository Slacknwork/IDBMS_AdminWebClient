"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
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

import participationRoleOptions from "/constants/enums/participationRole";

import languageTypeOptions, {
  languageTypeChipColors,
  languageTypeChipImages,
} from "/constants/enums/language";
import projectStatusOptions from "/constants/enums/projectStatus";

import { getParticipationsByUserId } from "/services/projectParticipationServices";

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
  const user = useSelector((state) => state.user);
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [participations, setParticipations] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchParticipations = async () => {
    const userId = user.id;
    const search = searchParams.get(searchQuery) ?? "";
    const status = searchParams.get(projectStatusQuery) ?? "";
    const type = searchParams.get(projectTypeQuery) ?? "";
    const pageNo = searchParams.get(pageQuery) ?? defaultPage;
    const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;
    try {
      const data = await getParticipationsByUserId({
        userId,
        search,
        type,
        status,
        pageNo,
        pageSize,
      });
      setCount(data.totalItem);
      setParticipations(data.list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchParticipations()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <PageContainer title="Danh sách dự án" description="Danh sách dự án">
      <Typography variant="h2">{"Dự án tham gia"}</Typography>
      <Box sx={{ mt: 3, minHeight: "30rem" }}>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Search placeholder="Tìm tên dự án"></Search>
            {/* <FilterStatus
              query={projectTypeQuery}
              options={projectTypeOptions}
              label={projectTypeLabel}
              allValue={projectTypeAllValue}
              allLabel={projectTypeAllLabel}
            ></FilterStatus> */}
            <FilterStatus
              query={projectStatusQuery}
              options={projectStatusOptions}
              label={projectStatusLabel}
              allValue={projectStatusAllValue}
              allLabel={projectStatusAllLabel}
            ></FilterStatus>
          </Box>
        </Box>
        {loading ? (
          <Stack sx={{ my: 5 }}>
            <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
          </Stack>
        ) : participations && participations.length > 0 ? (
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
                    Vai trò
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
              {participations?.map((participation) => (
                <StyledTableRow key={participation.project?.id}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {participation.project?.site?.name}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {participation.project?.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={participationRoleOptions[participation.role]}
                      fontWeight={400}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        languageTypeOptions[participation.project?.language]
                      }
                      color={
                        languageTypeChipColors[participation.project?.language]
                      }
                      avatar={
                        <Avatar
                          src={
                            languageTypeChipImages[
                            participation.project?.language
                            ]
                          }
                        />
                      }
                      variant="outlined"
                      fontWeight={400}
                    ></Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        projectStatusOptions[participation.project?.status]
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
                      href={`/projects/${participation.project?.id}`}
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
              Không có dữ liệu.
            </Typography>
          </Stack>
        )}
        <Pagination count={count}></Pagination>
      </Box>
    </PageContainer>
  );
}
