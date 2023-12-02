"use client";

import { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DeleteModal from "./deleteModal";
import SaveModal from "./modal";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import calculationUnitOptions from "/constants/enums/calculationUnit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
};

export default function TaskOverview() {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    length: 0,
    lengthError: { hasError: false, label: "" },
    width: 0,
    widthError: { hasError: false, label: "" },
    height: 0,
    heightError: { hasError: false, label: "" },
    calculationUnit: "",
    calculationUnitError: { hasError: false, label: "" },
    material: "",
    materialError: { hasError: false, label: "" },
    origin: "",
    originError: { hasError: false, label: "" },
    estimatePrice: 0,
    estimatePriceError: { hasError: false, label: "" },
    laborCost: 0,
    laborCostError: { hasError: false, label: "" },
    interiorItemColor: { id: 1, name: "", hex: "" },
    interiorItemCategory: { id: 1, name: "" },
    status: -1,
    statusError: { hasError: false, label: "" },
    parentItem: { id: 1, name: "" },
    parentItemError: { hasError: false, label: "" },
  });

  const interiorItemColorOptions = [
    { id: 1, name: "Color1", hex: "#ffffff" },
    { id: 2, name: "Color2", hex: "#000000" },
    // Add more color options as needed
  ];
  const interiorItemCategoryOptions = [
    { id: 1, name: "Category1" },
    { id: 2, name: "Category2" },
    // Add more category options as needed
  ];
  const parentItemOptions = [
    { id: 1, name: "ParentItem1" },
    { id: 2, name: "ParentItem2" },
    // Add more parent item options as needed
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };
  const handleNumberChange = (field, value) => {
    const val = parseFloat(value);
    handleInputChange(field, val);
  };

  return (
    <PageContainer title="Task Details" description="Details of the task">
      <Box sx={{ overflow: "auto", mt: 3 }}>
        <Grid container columnSpacing={4} rowSpacing={4}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              borderBottom: 1,
              display: "flex",
              justifyContent: "space-between",
              borderColor: "grey.500",
              py: 3,
            }}
          >
            <Typography variant="h2" sx={{ my: "auto" }}>
              Đồ nội thất
            </Typography>
            <Box sx={{ display: "flex" }}>
              <DeleteModal>
                <span>Xóa</span>
              </DeleteModal>
              <SaveModal>
                <span>Lưu</span>
              </SaveModal>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              {/* NAME */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Tên</Typography>
                    <Typography variant="p">Nhập tên</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.nameError.hasError}
                        variant="outlined"
                        value={formData.name}
                        helperText={formData.nameError.label}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* LENGTH */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Chiều dài</Typography>
                    <Typography variant="p">Nhập chiều dài</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.lengthError.hasError}
                        variant="outlined"
                        type="number"
                        value={formData.length}
                        helperText={formData.lengthError.label}
                        onChange={(e) =>
                          handleNumberChange("length", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* WIDTH */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Chiều rộng</Typography>
                    <Typography variant="p">Nhập chiều rộng</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.widthError.hasError}
                        variant="outlined"
                        type="number"
                        value={formData.width}
                        helperText={formData.widthError.label}
                        onChange={(e) =>
                          handleNumberChange("width", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* HEIGHT */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Chiều cao</Typography>
                    <Typography variant="p">Nhập chiều cao</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.heightError.hasError}
                        variant="outlined"
                        type="number"
                        value={formData.height}
                        helperText={formData.heightError.label}
                        onChange={(e) =>
                          handleNumberChange("height", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* CALCULATION UNIT */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Đơn vị tính</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={formData.calculationUnit}
                        onChange={(e) =>
                          handleInputChange("calculationUnit", e.target.value)
                        }
                        error={formData.calculationUnitError.hasError}
                      >
                        <MenuItem disabled value={-1}>
                          Chọn đơn vị tính
                        </MenuItem>
                        {calculationUnitOptions.map((unit, index) => (
                          <MenuItem key={unit} value={index}>
                            {unit}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* MATERIAL */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Chất liệu</Typography>
                    <Typography variant="p">Nhập chất liệu</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.materialError.hasError}
                        variant="outlined"
                        value={formData.material}
                        helperText={formData.materialError.label}
                        onChange={(e) =>
                          handleInputChange("material", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* ORIGIN */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Xuất xứ</Typography>
                    <Typography variant="p">Nhập xuất xứ</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.originError.hasError}
                        variant="outlined"
                        value={formData.origin}
                        helperText={formData.originError.label}
                        onChange={(e) =>
                          handleInputChange("origin", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* ESTIMATE PRICE */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Giá ước tính</Typography>
                    <Typography variant="p">Nhập giá ước tính</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.estimatePriceError.hasError}
                        variant="outlined"
                        type="number"
                        value={formData.estimatePrice}
                        helperText={formData.estimatePriceError.label}
                        onChange={(e) =>
                          handleNumberChange("estimatePrice", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* LABOR COST */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Chi phí lao động</Typography>
                    <Typography variant="p">Nhập chi phí lao động</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.laborCostError.hasError}
                        variant="outlined"
                        type="number"
                        value={formData.laborCost}
                        helperText={formData.laborCostError.label}
                        onChange={(e) =>
                          handleNumberChange("laborCost", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* INTERIOR ITEM COLOR */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Màu sắc sản phẩm</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={formData.interiorItemColor.id}
                        onChange={(e) =>
                          handleInputChange("interiorItemColor", {
                            ...formData.interiorItemColor,
                            id: e.target.value,
                          })
                        }
                      >
                        {interiorItemColorOptions.map((color) => (
                          <MenuItem key={color.id} value={color.id}>
                            {color.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* INTERIOR ITEM CATEGORY */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Danh mục sản phẩm</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={formData.interiorItemCategory.id}
                        onChange={(e) =>
                          handleInputChange("interiorItemCategory", {
                            ...formData.interiorItemCategory,
                            id: e.target.value,
                          })
                        }
                      >
                        {interiorItemCategoryOptions.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* STATUS */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Trạng thái</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={formData.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        error={formData.statusError.hasError}
                      >
                        {interiorItemStatusOptions.map((status, index) => (
                          <MenuItem key={status} value={index}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* PARENT ITEM */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Sản phẩm cha</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={formData.parentItem.id}
                        onChange={(e) =>
                          handleInputChange("parentItem", {
                            ...formData.parentItem,
                            id: e.target.value,
                          })
                        }
                      >
                        {parentItemOptions.map((parentItem) => (
                          <MenuItem key={parentItem.id} value={parentItem.id}>
                            {parentItem.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Additional details can be added here */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
