"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { getAllInteriorItemColors } from "/api/interiorItemColorServices";
import { getAllInteriorItemCategories } from "/api/interiorItemCategoryServices";
import { getAllInteriorItems } from "/api/interiorItemServices";
import { createItemInTask } from "/api/itemInTaskServices";
import checkValidUrl from "components/validations/url"

import FormModal from "/components/shared/Modals/Form";
import MessageModal from "/components/shared/Modals/Message";
import ItemModal from "./ItemModal";
import { useParams } from "next/navigation";

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

export default function CreateItemModal({ success }) {
  // INIT
  const params = useParams();
  const [items, setItems] = useState([]);

  const [interiorItemColors, setInteriorItemColors] = useState([]);
  const [interiorItemCategories, setInteriorItemCategories] = useState([]);
  const [parentItems, setParentItems] = useState([]);

  const fetchDataFromApi = async () => {
    const fetchInteriorItemColors = async () => {
      try {
        const colors = await getAllInteriorItemColors({});
        setInteriorItemColors(colors.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Màu");
        console.log(error);
      }
    };
    const fetchInteriorItemCategories = async () => {
      try {
        const categories = await getAllInteriorItemCategories({});
        setInteriorItemCategories(categories.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Danh mục");
        console.log(error);
      }
    };
    const fetchParentItems = async () => {
      try {
        const items = await getAllInteriorItems({});
        setParentItems(items.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Sản phẩm");
        console.log(error);
      }
    };
    await Promise.all([
      fetchInteriorItemColors(),
      fetchInteriorItemCategories(),
      fetchParentItems(),
    ]);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelectedItemChange = (event, newValue) => {
    const item = {
      quantity: 1,
      projectId: params.id,
      projectTaskId: params.taskId,
      interiorItemId: newValue.id,
      interiorItem: newValue,
    };
    setItems((prevData) => [...prevData, item]);
  };

  const addItem = (data) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedData = {
        quantity: 1,
        projectId: params.id,
        projectTaskId: params.taskId,
        interiorItemId: null,
        interiorItem: {
          ...data,
          imageUrl: e.target.result,
        },
      };
      setItems((prevData) => [...prevData, updatedData]);
    };
    reader.readAsDataURL(data.image);
  };

  const onCreateItemInTask = async () => {
    try {
      await createItemInTask(params.taskId, items);
      toast.success("Tạo sản phẩm thành công!");
      success(true);
    } catch (error) {
      console.log(`Error creating item: ${error}`);
      toast.error(`Lỗi tạo sản phẩm!`);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  return (
    <FormModal
      buttonLabel="Thêm"
      title="Thêm nội thất cho công việc"
      submitLabel="Tạo"
      onSubmit={onCreateItemInTask}
      size="big"
    >
      <Grid item xs={12} lg={12}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={"35%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tên sản phẩm
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Hình ảnh
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"15%"}>
                <Typography variant="subtitle2" fontWeight={600}>
                  Số lượng (Qty)
                </Typography>
              </StyledTableCell>
              <StyledTableCell width={"10%"}></StyledTableCell>
              <StyledTableCell width={"25%"} align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Chi tiết
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.map((item, index) => (
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
                        width: "5rem",
                        height: "5rem",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      inputProps={{
                        min: 1,
                        step: 1,
                      }}
                      value={item?.quantity ?? ""}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10) || 0;
                        setItems((prevData) =>
                          prevData.map((prevItem, idx) =>
                            idx === index
                              ? {
                                  ...prevItem,
                                  quantity: newQuantity,
                                }
                              : prevItem
                          )
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {item.interiorItemId ? (
                      <Chip label="Hệ thống" color="primary"></Chip>
                    ) : (
                      <Chip label="Mới" color="error"></Chip>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      {item.interiorItemId === null && (
                        <ItemModal
                          buttonLabel={"Sửa"}
                          item={item?.interiorItem}
                          interiorItemColors={interiorItemColors}
                          interiorItemCategories={interiorItemCategories}
                          parentItems={parentItems}
                          onCreateItemInTask={addItem}
                        ></ItemModal>
                      )}
                      <MessageModal
                        sx={{ ml: 2 }}
                        buttonLabel="Xóa"
                        color="error"
                      ></MessageModal>
                    </Box>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <Box sx={{ mt: 2, display: "flex" }}>
          <ItemModal
            sx={{ my: "auto" }}
            interiorItemColors={interiorItemColors}
            interiorItemCategories={interiorItemCategories}
            parentItems={parentItems}
            onCreateItemInTask={addItem}
          ></ItemModal>
          <Typography sx={{ my: "auto", mx: 2 }} variant="p">
            hoặc
          </Typography>
          <Autocomplete
            sx={{ width: "20rem" }}
            size="small"
            disableClearable
            options={parentItems.filter((parentItem) =>
              items.every((item) => item.interiorItemId !== parentItem.id)
            )}
            value={selectedItem}
            onChange={handleSelectedItemChange}
            noOptionsText="Không tìm thấy.."
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  {option.name}
                </li>
              );
            }}
            renderInput={(params) => {
              return <TextField {...params} label="Chọn một sản phẩm" />;
            }}
          ></Autocomplete>
        </Box>
      </Grid>
    </FormModal>
  );
}
