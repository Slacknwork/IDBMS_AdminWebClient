"use client";

import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
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

import { getSites } from "/api/siteServices";

import CreateSiteModal from "./(CreateSiteModal)";
import Pagination from "/components/shared/Pagination";
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

export default function SitesPage() {
  // CONSTANTS
  const searchQuery = "search";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // FETCH DATA FROM API
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const search = searchParams.get(searchQuery) ?? "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      try {
        const data = await getSites(search, page, pageSize);
        setCount(data.totalItem);
        setValues(data.list);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    fetchDataFromApi();
  }, [searchParams]);

  return (
    <Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Search
          query={searchQuery}
          placeholder="Tìm kiếm theo Tên / Địa chỉ"
        ></Search>
        <CreateSiteModal>Tạo công trình</CreateSiteModal>
      </Box>
      {loading ? (
        <Stack sx={{ my: 5 }}>
          <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
        </Stack>
      ) : values && values.length > 0 ? (
        <Table
          aria-label="simple table"
          sx={{
            maxWidth: 1,
            overflowX: "hidden",
            my: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell width={"30%"}>
                <Typography variant="subtitle2" fontWeight={600} noWrap>
                  Tên công trình
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"30%"}>
                <Typography variant="subtitle2" fontWeight={600} noWrap>
                  Địa chỉ
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600} noWrap>
                  Tên người đại diện
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}>
                <Typography variant="subtitle2" fontWeight={600} noWrap>
                  Ngày tạo
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"} align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {values?.map((site) => (
              <StyledTableRow key={site.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {site.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {site.address}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {site.contactName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {new Date(site.createdDate).toLocaleDateString("vi-VN")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/sites/${site.id}`}
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
            Không có yêu cầu.
          </Typography>
        </Stack>
      )}

      <Pagination query={pageQuery} sizeQuery={pageSizeQuery} count={count} />
    </Box>
  );
}
