"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import FormModal from "/components/shared/Modals/Form";

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

export default function CreateItemModal() {
  const onCreateItemInTask = async () => {
    try {
    } catch (error) {
      console.log(`Error creating item: ${error}`);
      toast.error(`Lỗi tạo sản phẩm!`);
    }
  };

  return (
    <FormModal
      buttonLabel="Thêm"
      title="Thêm nội thất cho công việc"
      submitLabel="Tạo"
      onSubmit={onCreateItemInTask}
      size="big"
    >
      <Box sx={{ zIndex: 1 }}>
        <Table aria-label="simple table" sx={{ mt: 1 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Mã sản phẩm
                </Typography>
              </StyledTableCell>
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
                    <Typography variant="subtitle2" fontWeight={400}>
                      {item?.interiorItem?.code ?? ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {item?.interiorItem?.name ?? ""}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={
                        item?.interiorItem?.imageUrl ??
                        "/images/results/no-image.png"
                      }
                      alt={item?.interiorItem?.name ?? ""}
                      width={50}
                      height={50}
                      objectFit="cover"
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
      </Box>
    </FormModal>
  );
}
