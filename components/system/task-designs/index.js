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
  MenuTask,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getAllTaskDesigns } from "/api/taskDesignServices";
import calculationUnit from "../../../constants/enums/calculationUnit";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import FilterComponent from "/components/shared/FilterStatus";
import { getAllTaskCategories } from "/api/taskCategoryServices";
import CreateTaskDesignModal from "../../shared/Modals/TaskDesigns/CreateModal";

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

export default function ProjectList() {

  const searchQuery = "search";

  const categoryQuery = "type";
  const categoryAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [taskDesigns, setTaskDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchProjectDesigns = async () => {
      const codeOrName = searchParams.get(searchQuery) || "";
      const taskCategoryId = searchParams.get(categoryQuery) || "";
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getAllTaskDesigns({
          codeOrName,
          taskCategoryId,
          pageSize,
          pageNo,
        });
        console.log(response);
        setTaskDesigns(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thiết Kế Công Việc' từ hệ thống");
      }
    };
    await Promise.all([
      fetchProjectDesigns(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);


  // TASK CATEGORIES
  const [taskCategories, setTaskCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await getAllTaskCategories();
        console.log(response);
        setTaskCategories(response.list);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    await Promise.all([
      fetchCategories(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Search
            placeholder="Tìm theo mã / tên.."
          ></Search>

          <FilterAutocomplete
            query={categoryQuery}
            options={taskCategories}
            label="Phân loại"
            allValue={categoryAllValue}
            allLabel="Tất cả"
          ></FilterAutocomplete>
        </Box>
        <CreateTaskDesignModal>
          Tạo
        </CreateTaskDesignModal>
      </Box>

      {(taskDesigns && taskDesigns.length) > 0 ? (
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
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
                  Tính theo
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Giá uóc tính/đơn vị (VND)
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại đồ nội thất
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại công việc
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskDesigns.map((taskDesign) => (
              <StyledTableRow key={taskDesign.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {taskDesign?.code}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignTasks: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {taskDesign?.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {calculationUnit[taskDesign?.calculationUnit] || "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {taskDesign?.estimatePricePerUnit.toLocaleString('en-US')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {taskDesign?.interiorItemCategory?.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {taskDesign?.taskCategory.name}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/TaskDesigns/${taskDesign.id}`}
                  >
                    Thông tin
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
    </Box>
  );
}
