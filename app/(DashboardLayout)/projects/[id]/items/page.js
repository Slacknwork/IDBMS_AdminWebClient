"use client";

import Image from "next/image";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import projectTaskStatus from "/constants/enums/projectTaskStatus";
import { getItemInTasksByProjectId } from "api/itemInTaskServices";
import { getAllInteriorItemCategories } from "api/interiorItemCategoryServices";
import checkValidUrl from "components/validations/url"

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterAutocomplete from "/components/shared/FilterAutocomplete";
import FilterStatus from "/components/shared/FilterStatus";
import { toast } from "react-toastify";

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

export default function InteriorItems() {
  const searchQuery = "search";

  const categoryQuery = "category";

  const statusQuery = "status";
  const statusAllValue = -1;

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ITEM IN TASK
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchItems = async () => {
      const projectId = params.id;
      const search = searchParams.get(searchQuery) || "";
      const categoryId = searchParams.get(categoryQuery) || "";
      const status = searchParams.get(statusQuery)
        ? parseInt(searchParams.get(statusQuery))
        : "";
      const page = parseInt(searchParams.get(pageQuery)) || defaultPage;
      const pageSize =
        parseInt(searchParams.get(pageSizeQuery)) || defaultPageSize;

      try {
        const response = await getItemInTasksByProjectId({
          projectId,
          search,
          categoryId,
          status,
          page,
          pageSize,
        });
        console.log(response);
        setItems(response?.list ?? []);
        setCount(response?.totalItem ?? 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    await Promise.all([fetchItems()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [searchParams]);

  // ITEM CATEGORIES
  const [itemCategories, setItemCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    setLoading(true);
    const fetchCategories = async () => {
      try {
        const response = await getAllInteriorItemCategories();
        console.log(response);
        setItemCategories(response.list);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    await Promise.all([fetchCategories()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  return (
    <Box sx={{ zIndex: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Search placeholder="Tìm theo mã / tên.."></Search>

          <FilterAutocomplete
            query={categoryQuery}
            options={itemCategories}
            label="Danh mục"
            allValue={-1}
            allLabel="Tất cả"
          ></FilterAutocomplete>

          <FilterStatus
            query={statusQuery}
            options={projectTaskStatus}
            label="Trạng thái"
            allValue={statusAllValue}
            allLabel="Tất cả"
          ></FilterStatus>
        </Box>
        {/* <ItemModal>
          <span>Tạo</span>
        </ItemModal> */}
      </Box>

      {(items && items.length) > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên sản phẩm
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hình ảnh
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Danh mục
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái công việc
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Chi tiết
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.map((item) => (
                <StyledTableRow key={item?.id}>
                  <TableCell>
                    <Typography variant="p" fontWeight={600}>
                      {item?.interiorItem?.code ?? ""}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {item?.interiorItem?.name ?? ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={
                        checkValidUrl(item?.interiorItem?.imageUrl)
                      }
                      alt={item?.interiorItem?.name ?? ""}
                      width={500}
                      height={500}
                      style={{
                        objectFit: "cover",
                        width: "7rem",
                        height: "7rem",
                      }}
                      unoptimized={true}
                      onError={(e) => {
                        e.target.src = "/images/results/no-file.png";
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {item?.interiorItem?.interiorItemCategory?.name ?? ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        projectTaskStatus[item?.projectTask?.status] ??
                        "Không xác định"
                      }
                      color={
                        item?.projectTask?.status === 0 ? "default" : "primary"
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      component={Link}
                      variant="contained"
                      disableElevation
                      color="primary"
                      href={`/projects/${params.id}/items/${item.id}`}
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
