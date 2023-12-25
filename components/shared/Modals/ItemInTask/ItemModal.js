"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import calculationUnitOptions from "/constants/enums/calculationUnit";

import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import FileForm from "/components/shared/Forms/File";
import FormModal from "/components/shared/Modals/Form";

const initialState = {
  code: "",
  codeError: { hasError: false, label: "" },
  name: "",
  nameError: { hasError: false, label: "" },
  description: "",
  descriptionError: { hasError: false, label: "" },
  englishName: "",
  englishNameError: { hasError: false, label: "" },
  image: null,
  imageError: { hasError: false, label: "" },
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
  interiorItemColorId: "",
  interiorItemColorIdError: { hasError: false, label: "" },
  interiorItemCategoryId: "",
  interiorItemCategoryIdError: { hasError: false, label: "" },
  status: -1,
  statusError: { hasError: false, label: "" },
  parentItemId: "",
  parentItemIdError: { hasError: false, label: "" },
};

export default function ItemModal({
  success,
  sx,
  buttonLabel,
  item = initialState,
  interiorItemColors,
  interiorItemCategories,
  parentItems,
  onCreateItemInTask,
}) {
  const [formData, setFormData] = useState({ ...initialState, ...item });

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

  const onCreateInteriorItem = () => {
    try {
      onCreateItemInTask(formData);
      toast.success(`Đã tạo '${formData?.name}!'`);
      setFormData(initialState);
      success(true);
    } catch (error) {
      console.log(`Error creating item: ${error}`);
      toast.error(`Lỗi tạo sản phẩm!`);
    }
  };

  return (
    <FormModal
      sx={sx}
      buttonLabel={buttonLabel ?? "Tạo mới"}
      title="Thông tin đồ nội thất"
      submitLabel="Tạo"
      onSubmit={onCreateInteriorItem}
      size="big"
    >
      {/* CODE */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Mã"
          titleSpan={3}
          fieldSpan={9}
          required
          subtitle="Mã sản phẩm"
          value={formData.code}
          error={formData.codeError.hasError}
          errorLabel={formData.codeError.label}
          onChange={(e) => handleInputChange("code", e.target.value)}
        ></TextForm>
      </Grid>

      {/* NAME */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Tên"
          titleSpan={3}
          fieldSpan={9}
          required
          subtitle="Nhập tên đồ dùng"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/* IMAGE */}
      <Grid item xs={12} lg={12}>
        <FileForm
          title="Hình ảnh"
          titleSpan={3}
          fieldSpan={9}
          required
          subtitle="Kéo thả / chọn hình ảnh cho sản phẩm"
          value={formData.image}
          error={formData.imageError.hasError}
          errorLabel={formData.imageError.label}
          onChange={(file) => handleInputChange("image", file)}
        ></FileForm>
      </Grid>

      {/* LENGTH */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Chiều dài"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          subtitle="Nhập chiều dài của sản phẩm"
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
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Nhập chiều rộng của sản phẩm"
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
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Nhập chiều cao của sản phẩm"
          value={formData.height}
          error={formData.heightError.hasError}
          errorLabel={formData.heightError.label}
          onChange={(value) => handleInputChange("height", value)}
          endAdornment={<>m</>}
        ></NumberForm>
      </Grid>

      {/* CALCULATION UNIT */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Đơn vị tính"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Chọn một đơn vị tính"
          value={formData.calculationUnit}
          options={calculationUnitOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.calculationUnitError.hasError}
          errorLabel={formData.calculationUnitError.label}
          onChange={(value) => handleInputChange("calculationUnit", value)}
        ></SelectForm>
      </Grid>

      {/* MATERIAL */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Chất liệu"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
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
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
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
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Nhập giá tiền ước tính của sản phẩm"
          value={formData.estimatePrice}
          error={formData.estimatePriceError.hasError}
          errorLabel={formData.estimatePriceError.label}
          onChange={(value) => handleInputChange("estimatePrice", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
      </Grid>

      {/* INTERIOR ITEM COLOR */}
      <Grid item xs={12} lg={6}>
        <AutocompleteForm
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          title="Màu"
          subtitle="Chọn màu sắc sản phẩm"
          value={formData.interiorItemColorId}
          options={interiorItemColors}
          error={formData.interiorItemColorIdError.hasError}
          errorLabel={formData.interiorItemColorIdError.label}
          onChange={(value) => handleInputChange("interiorItemColorId", value)}
        ></AutocompleteForm>
      </Grid>

      {/* INTERIOR ITEM CATEGORY */}
      <Grid item xs={12} lg={6}>
        <AutocompleteForm
          title="Danh mục"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Chọn danh mục sản phẩm"
          value={formData.interiorItemCategoryId}
          options={interiorItemCategories}
          error={formData.interiorItemCategoryIdError.hasError}
          errorLabel={formData.interiorItemCategoryIdError.label}
          onChange={(value) =>
            handleInputChange("interiorItemCategoryId", value)
          }
        ></AutocompleteForm>
      </Grid>

      {/* STATUS */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Trạng thái"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
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
      <Grid item xs={12} lg={12}>
        <AutocompleteForm
          titleSpan={3}
          fieldSpan={9}
          title="Sản phẩm mẫu"
          subtitle="Chọn sản phẩm mẫu của phiên bản này"
          value={formData.parentItemId}
          options={parentItems}
          error={formData.parentItemIdError.hasError}
          errorLabel={formData.parentItemIdError.label}
          onChange={(value) => handleInputChange("parentItemId", value)}
        ></AutocompleteForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          titleSpan={3}
          fieldSpan={9}
          multiline
          rows={4}
          title="Mô tả"
          subtitle="Mổ tả sản phẩm"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
