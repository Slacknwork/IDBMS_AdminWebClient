"use client";

import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import MessageModal from "/components/shared/Modals/Message";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import calculationUnitOptions from "/constants/enums/calculationUnit";

import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";

export default function ItemDetails() {
  const [formData, setFormData] = useState({
    code: "",
    name: "Sản phẩm",
    nameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    length: 0,
    lengthError: { hasError: false, label: "" },
    width: 0,
    widthError: { hasError: false, label: "" },
    height: 0,
    heightError: { hasError: false, label: "" },
    calculationUnit: -1,
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
    interiorItemColorError: { hasError: false, label: "" },
    interiorItemCategory: { id: 1, name: "" },
    interiorItemCategoryError: { hasError: false, label: "" },
    status: -1,
    statusError: { hasError: false, label: "" },
    parentItem: { id: 1, name: "" },
    parentItemError: { hasError: false, label: "" },
  });

  const interiorItemColorOptions = [
    { id: 1, name: "Color1", hex: "#ffffff" },
    { id: 2, name: "Color2", hex: "#000000" },
  ];
  const interiorItemCategoryOptions = [
    { id: 1, name: "Category1" },
    { id: 2, name: "Category2" },
  ];
  const parentItemOptions = [
    { id: 1, name: "ParentItem1" },
    { id: 2, name: "ParentItem2" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    // Handle error here
    switch (field) {
      case "name":
      case "length":
      default:
        handleInputError(field, false, "");
    }
  };
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const onSaveInteriorItem = () => {};
  const onDeleteInteriorItem = () => {};

  return (
    <PageContainer title={formData.name} description="Chi tiết sản phẩm">
      <DetailsPage
        title="Thông tin đồ nội thất"
        saveMessage="Lưu thông tin đồ nội thất?"
        deleteMessage="Xóa món đồ này?"
        onSave={onSaveInteriorItem}
        onDelete={onDeleteInteriorItem}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={3}>
            {/* NAME */}
            <Grid item xs={12} lg={6}>
              <TextForm
                multiline
                rows={3}
                title="Tên"
                required
                subtitle="Nhập tên đồ dùng"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              ></TextForm>
            </Grid>

            {/* LENGTH */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Chiều dài"
                required
                subtitle="Nhập chiều dài"
                value={formData.length}
                error={formData.lengthError.hasError}
                errorLabel={formData.lengthError.label}
                onChange={(value) => handleInputChange("length", value)}
                endAdornment={<>m</>}
              ></NumberForm>
            </Grid>

            {/* WIDTH */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Chiều rộng"
                required
                subtitle="Nhập chiều rộng"
                value={formData.width}
                error={formData.widthError.hasError}
                errorLabel={formData.widthError.label}
                onChange={(value) => handleInputChange("width", value)}
                endAdornment={<>m</>}
              ></NumberForm>
            </Grid>

            {/* HEIGHT */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Chiều cao"
                required
                subtitle="Nhập chiều cao"
                value={formData.height}
                error={formData.heightError.hasError}
                errorLabel={formData.heightError.label}
                onChange={(value) => handleInputChange("width", value)}
                endAdornment={<>m</>}
              ></NumberForm>
            </Grid>

            {/* CALCULATION UNIT */}
            <Grid item xs={12} lg={6}>
              <SelectForm
                title="Đơn vị tính"
                required
                subtitle="Chọn một đơn vị tính"
                value={formData.calculationUnit}
                options={calculationUnitOptions}
                defaultValue={-1}
                defaultLabel="Chọn một..."
                error={formData.calculationUnitError.hasError}
                errorLabel={formData.calculationUnitError.label}
                onChange={(value) =>
                  handleInputChange("calculationUnit", value)
                }
              ></SelectForm>
            </Grid>

            {/* MATERIAL */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Chất liệu"
                required
                subtitle="Nhập chất liệu đồ dùng"
                value={formData.material}
                error={formData.materialError.hasError}
                errorLabel={formData.materialError.label}
                onChange={(e) => handleInputChange("material", e.target.value)}
              ></TextForm>
            </Grid>

            {/* ORIGIN */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Xuất xứ"
                required
                subtitle="Nhập xuất xứ đồ dùng"
                value={formData.origin}
                error={formData.originError.hasError}
                errorLabel={formData.originError.label}
                onChange={(e) => handleInputChange("origin", e.target.value)}
              ></TextForm>
            </Grid>

            {/* ESTIMATE PRICE */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Giá ước tính"
                required
                subtitle="Nhập giá tiền ước tính của sản phẩm"
                value={formData.estimatePrice}
                error={formData.estimatePriceError.hasError}
                errorLabel={formData.estimatePriceError.label}
                onChange={(value) => handleInputChange("estimatePrice", value)}
                endAdornment={<>VND</>}
              ></NumberForm>
            </Grid>

            {/* LABOR COST */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Chi phí lao động"
                required
                subtitle="Nhập chi phí lao động"
                value={formData.laborCost}
                error={formData.laborCostError.hasError}
                errorLabel={formData.laborCostError.label}
                onChange={(value) => handleInputChange("laborCost", value)}
                endAdornment={<>VND</>}
              ></NumberForm>
            </Grid>

            {/* INTERIOR ITEM COLOR */}
            <Grid item xs={12} lg={6}>
              <AutocompleteForm
                title="Màu"
                subtitle="Chọn màu sắc sản phẩm"
                value={formData.interiorItemColor}
                options={interiorItemColorOptions}
                error={formData.interiorItemColorError.hasError}
                errorLabel={formData.interiorItemColorError.label}
                onChange={(value) =>
                  handleInputChange("interiorItemColor", value)
                }
              ></AutocompleteForm>
            </Grid>

            {/* INTERIOR ITEM CATEGORY */}
            <Grid item xs={12} lg={6}>
              <AutocompleteForm
                title="Danh mục"
                subtitle="Chọn danh mục sản phẩm"
                value={formData.interiorItemCategory}
                options={interiorItemCategoryOptions}
                error={formData.interiorItemCategoryError.hasError}
                errorLabel={formData.interiorItemCategoryError.label}
                onChange={(value) =>
                  handleInputChange("interiorItemCategory", value)
                }
              ></AutocompleteForm>
            </Grid>

            {/* STATUS */}
            <Grid item xs={12} lg={6}>
              <SelectForm
                title="Trạng thái"
                required
                subtitle="Chọn trạng thái hiển thị của sản phẩm"
                value={formData.status}
                options={interiorItemStatusOptions}
                defaultValue={-1}
                defaultLabel="Chọn một..."
                error={formData.statusError.hasError}
                errorLabel={formData.statusError.label}
                onChange={(value) => handleInputChange("status", value)}
              ></SelectForm>
            </Grid>

            {/* PARENT ITEM */}
            <Grid item xs={12} lg={6}>
              <AutocompleteForm
                title="Sản phẩm tiền bối"
                subtitle="Chọn sản phẩm tiền bối"
                value={formData.parentItem}
                options={parentItemOptions}
                error={formData.parentItemError.hasError}
                errorLabel={formData.parentItemError.label}
                onChange={(value) => handleInputChange("parentItem", value)}
              ></AutocompleteForm>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                multiline
                rows={4}
                title="Mô tả"
                subtitle="Mổ tả sản phẩm"
                value={formData.description}
                error={formData.descriptionError.hasError}
                errorLabel={formData.descriptionError.label}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              ></TextForm>
            </Grid>
          </Grid>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
