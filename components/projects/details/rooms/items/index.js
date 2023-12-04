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
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import { getProjectTasksWithItemByRoomId } from "/api/projectTaskServices";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import ItemModal from "./modal";
import ExistingItemModal from "./modalExisting";

const interiorItems = [
  {
    id: 1,
    code: "ITEM001",
    name: "Sofa",
    imageUrl:
      "https://i.pinimg.com/originals/be/d8/c2/bed8c28f7c314f30b6657297911cfc15.jpg",
    interiorItemCategory: { id: 1, name: "Furniture" },
    interiorItemStatus: 0,
  },
  {
    id: 2,
    code: "ITEM002",
    name: "Table",
    imageUrl:
      "https://zago-store.vn/wp-content/uploads/2021/03/loft-coffee-square-table-90x90x45h-cm_1-750x750.jpg",
    interiorItemCategory: { id: 2, name: "Decor" },
    interiorItemStatus: 1,
  },
];

const interiorItemCategoryOptions = [
  { id: 1, name: "Furniture" },
  { id: 2, name: "Decor" },
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function InteriorItems() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);
  const [values, setValues] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      try {
        const data = await getProjectTasksWithItemByRoomId(params.roomId);
        console.log(data);

        const interiorItems = data?.map((task) => task.interiorItem) ?? [];
        setValues(interiorItems);
        console.log(interiorItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <ExistingItemModal>Thêm từ dữ liệu</ExistingItemModal>
        <ItemModal>Tạo mới</ItemModal>
      </Box>
      <Table aria-label="simple table">
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
                Trạng thái
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
          {values &&
            values.map((item) => (
              <StyledTableRow key={item?.id}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {item?.code ?? ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {item?.name ?? ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Image
                    src={item?.imageUrl}
                    alt=""
                    width={50}
                    height={50}
                    objectFit="cover"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {item?.interiorItemCategory?.name ?? ""}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={interiorItemStatusOptions[item?.status]}
                    color={
                      item?.interiorItemStatus === 0 ? "default" : "primary"
                    }
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/projects/${params.id}/items/${item?.id}`}
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
}
