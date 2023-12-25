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
import { getAllProjectDesigns } from "/api/projectDesignServices";
import Image from "next/image";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import FilterStatus from "/components/shared/FilterStatus";

import isHiddenOptions from "/constants/enums/isHidden";
import projectTypeOptions from "/constants/enums/projectType";
import CreateprojectDesignModal from "../../../../components/shared/Modals/ProjectDesigns/CreateModal";

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
  const typeQuery = "type";

  const isHiddenQuery = "isHidden";
  const isHiddenAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [projectDesigns, setProjectDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchProjectDesigns = async () => {
      const type = searchParams.get(typeQuery) || "";
      const name = searchParams.get(searchQuery) || "";
      const isHidden =
        searchParams.get(isHiddenQuery) === '1' ?
          true : searchParams.get(isHiddenQuery) === null ?
            "" : false;
      const pageNo = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getAllProjectDesigns({
          type,
          name,
          isHidden,
          pageSize,
          pageNo,
        });
        console.log(response);
        setProjectDesigns(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân Loại Dự Án' từ hệ thống");
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

  const handleModalResult = () => {
    fetchDataFromApi();
  }

  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Box sx={{ display: "flex" }}>
          <Search
            placeholder="Tìm theo tên.."
          ></Search>
          <FilterStatus
            query={isHiddenQuery}
            options={isHiddenOptions}
            label="Trạng thái"
            allValue={isHiddenAllValue}
            allLabel="Tất cả"
          ></FilterStatus>
          <FilterStatus
            query={typeQuery}
            options={projectTypeOptions}
            label="Loại dự án"
            allValue={isHiddenAllValue}
            allLabel="Tất cả"
          ></FilterStatus>
        </Box>
        <CreateprojectDesignModal success={handleModalResult}>
          Tạo
        </CreateprojectDesignModal>
      </Box>
      {(projectDesigns && projectDesigns.length) > 0 ? (
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
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ngân sách tối thiểu
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ngân sách tối đa
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ngày hoàn thành dự kiến
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Loại dự án
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectDesigns.map((projectDesign) => (
              <StyledTableRow key={projectDesign.id}>
               
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {projectDesign.name}
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
                    {projectDesign?.minBudget.toLocaleString("en-US")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {projectDesign?.maxBudget.toLocaleString("en-US")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {projectDesign?.estimateBusinessDay}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {projectTypeOptions[projectDesign?.projectType] ||
                      "Không xác định"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {projectDesign?.isHidden ? isHiddenOptions[1] : isHiddenOptions[0]}
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
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/system/project-designs/${projectDesign.id}`}
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
