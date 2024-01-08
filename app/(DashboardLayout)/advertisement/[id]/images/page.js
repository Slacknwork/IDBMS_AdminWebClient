"use client";

import Link from "next/link";
import Image from "next/image";
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
} from "@mui/material";
import { IconDownload } from "@tabler/icons-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import checkValidUrl from "components/validations/url";

import CreateImagesModal from "/components/shared/Modals/AdvertisementProjects/CreateImagesModal";

import projectDocumentCategories from "/constants/enums/projectDocumentCategory";
import {
  getAdvertisementProjectDocuments,
  deleteImageById,
} from "/services/advertisementServices";
import { downloadFileByUrl } from "/services/downloadServices";
import moment from "moment-timezone";

import Pagination from "/components/shared/Pagination";
import Search from "/components/shared/Search";
import FilterComponent from "/components/shared/FilterStatus";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageModal from "/components/shared/Modals/Message";

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

const isPublicOptions = ["Tạm ẩn", "Công khai"];

export default function ProjectDocuments() {
  const isPublicQuery = "public";

  const pageQuery = "page";
  const defaultPage = 1;

  const pageSizeQuery = "size";
  const defaultPageSize = 5;

  // INIT
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
      const isPublic =
        searchParams.get(isPublicQuery) === "1"
          ? true
          : searchParams.get(isPublicQuery) === "0"
          ? false
          : "";
      const page = searchParams.get(pageQuery) ?? defaultPage;
      const pageSize = searchParams.get(pageSizeQuery) ?? defaultPageSize;

      try {
        const response = await getAdvertisementProjectDocuments({
          projectId,
          isPublic,
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

  const handleDownload = async (imageUrl) => {
    try {
      await downloadFileByUrl({
        imageUrl,
        name: "Hình ảnh minh họa",
      });
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const handleDelete = async (imageId) => {
    try {
      const response = await deleteImageById(imageId);
      console.log(response);
      toast.success("Xoá thành công!");
      fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <Box sx={{ zIndex: 1 }}>
      {/* Filter and Search */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <FilterComponent
            query={isPublicQuery}
            options={isPublicOptions}
            label="Trạng thái"
            allValue={-1}
            allLabel="Tất cả"
          ></FilterComponent>
        </Box>
        <CreateImagesModal success={handleModalResult}>
          <span>Tạo</span>
        </CreateImagesModal>
      </Box>
      {/* Table */}
      {(documents && documents.length) > 0 ? (
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell width={"30%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"25%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hình ảnh
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ngày tạo
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"30%"} align="right"></StyledTableCell>
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
                  <Image
                    src={checkValidUrl(document?.url)}
                    alt={document.name ?? ""}
                    width={500}
                    height={500}
                    style={{
                      width: "7rem",
                      height: "7rem",
                      objectFit: "cover",
                    }}
                    unoptimized={true}
                    onError={(e) => {
                      e.target.src = "/images/results/no-file.png";
                    }}
                  ></Image>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {document?.createdDate
                      ? moment(document?.createdDate).format("L")
                      : "Chưa xác định"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      my: "auto",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ mr: 5 }}
                      disableElevation
                      color="primary"
                      endIcon={<IconDownload></IconDownload>}
                      onClick={() => handleDownload(document.url)}
                    >
                      Tải
                    </Button>
                    <MessageModal
                      disabled={loading}
                      color="error"
                      buttonLabel={"Xóa"}
                      onSubmit={() => handleDelete(document.id)}
                      title={"Xóa hình ảnh minh họa"}
                      submitLabel={"Xác nhận"}
                      buttonEndIcon={<DeleteIcon></DeleteIcon>}
                    >
                      <Typography variant="p">
                        {"Xác nhận xóa hình ảnh này?"}
                      </Typography>
                    </MessageModal>
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
