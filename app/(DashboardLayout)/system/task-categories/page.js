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
import Image from "next/image";
import { getAllTaskCategories } from "/services/taskCategoryServices";
import projectType from "/constants/enums/projectType";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import checkValidUrl from "components/validations/url";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import FilterComponent from "/components/shared/FilterStatus";
import CreateTaskCategoryModal from "/components/shared/Modals/TaskCategories/CreateModal";

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

export default function ProjectList() {
  const searchQuery = "search";

  const typeQuery = "type";
  const typeAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [taskCategories, setTaskCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchProjectDesigns = async () => {
      const name = searchParams.get(searchQuery) || "";
      const type = searchParams.get(typeQuery) || "";
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getAllTaskCategories({
          type,
          name,
          pageSize,
          pageNo,
        });
        console.log(response);
        setTaskCategories(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân Loại Công Việc' từ hệ thống");
      }
    };
    await Promise.all([fetchProjectDesigns()]);
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
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo tên.."></Search>

          <FilterComponent
            query={typeQuery}
            options={projectType}
            label="Loại dự án"
            allValue={typeAllValue}
            allLabel="Tất cả"
          ></FilterComponent>
        </Box>
        <CreateTaskCategoryModal success={handleModalResult}>
          Tạo
        </CreateTaskCategoryModal>
      </Box>

      {(taskCategories && taskCategories.length) > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Icon
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"20%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại dự án
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"30%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Mô tả
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskCategories.map((projectCategory) => (
              <StyledTableRow key={projectCategory.id}>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {projectCategory.name}
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
                  <Image
                    src={checkValidUrl(projectCategory.iconImageUrl)}
                    alt=""
                    width={0}
                    height={0}
                    style={{
                      width: "7rem",
                      height: "7rem",
                      objectFit: "cover",
                    }}
                    unoptimized={true}
                    onError={(e) => {
                      e.target.src = "/images/results/no-file.png";
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {projectType[projectCategory?.projectType] ||
                      "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {projectCategory.description ?? "Không có"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/system/task-categories/${projectCategory.id}`}
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
  );
}
