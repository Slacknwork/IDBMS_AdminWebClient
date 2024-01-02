"use client";

import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { getAllInteriorItemColors } from "/services/interiorItemColorServices";
import { getAllInteriorItemCategories } from "/services/interiorItemCategoryServices";
import { createInteriorItemCategory } from "../../../../services/interiorItemCategoryServices";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import interiorItemTypeOptions from "/constants/enums/interiorItemType";

import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import FileForm from "/components/shared/Forms/File";
import FormModal from "/components/shared/Modals/Form";

export default function CreateItemModal() {
  // INIT
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    englishDescription: "",
    englishDescriptionError: { hasError: false, label: "" },
    bannerImage: null,
    bannerImageError: { hasError: false, label: "" },
    iconImage: null,
    iconImageError: { hasError: false, label: "" },
    interiorItemType: 0,
    interiorItemTypeError: { hasError: false, label: "" },
    parentCategoryId: "",
    parentCategoryIdError: { hasError: false, label: "" },
  });

  const [interiorItemColors, setInteriorItemColors] = useState([]);
  const [interiorItemCategories, setInteriorItemCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);

  const fetchDataFromApi = async () => {
    const fetchParentCategories = async () => {
      try {
        const items = await getAllInteriorItemCategories({});
        setParentCategories(items.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Sản phẩm");
        console.log(error);
      }
    };
    await Promise.all([fetchParentCategories()]);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

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

  const handleCreate = async () => {
    try {
      console.log(formData);
      const response = await createInteriorItemCategory(formData);
      toast.success(`Đã tạo '${formData?.name}!'`);
      console.log(response);
      router.push(`/item-categories/${response?.id}`);
    } catch (error) {
      console.log(`Error creating item: ${error}`);
      toast.error(`Lỗi tạo sản phẩm!`);
    }
  };

  return (
    <FormModal
      buttonLabel="Tạo loại sản phẩm"
      title="Tạo loại sản phẩm"
      submitLabel="Tạo"
      onSubmit={handleCreate}
      size="big"
    >
      {/* NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên"
          titleSpan={3}
          fieldSpan={9}
          required
          subtitle="Nhập tên loại sản phẩm"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/*ENGLISH NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên tiếng anh"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Nhập tên tiếng anh cho loại sản phẩm"
          value={formData.englishName}
          error={formData.englishNameError.hasError}
          errorLabel={formData.englishNameError.label}
          onChange={(e) => handleInputChange("englishName", e.target.value)}
        ></TextForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          titleSpan={3}
          fieldSpan={9}
          multiline
          rows={4}
          title="Mô tả"
          subtitle="Mổ tả loại sản phẩm"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>

      {/* ENGLISH DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          titleSpan={3}
          fieldSpan={9}
          multiline
          rows={4}
          title="Mô tả"
          subtitle="Mổ tả tiếng anh cho loại sản phẩm"
          value={formData.englishDescription}
          error={formData.englishDescriptionError.hasError}
          errorLabel={formData.englishDescriptionError.label}
          onChange={(e) =>
            handleInputChange("englishDescription", e.target.value)
          }
        ></TextForm>
      </Grid>

      {/* BANNER IMAGE */}
      <Grid item xs={12} lg={12}>
        <FileForm
          title="Ảnh banner"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Kéo thả / chọn hình ảnh banner cho sản phẩm"
          value={formData.bannerImage}
          error={formData.bannerImageError.hasError}
          errorLabel={formData.bannerImageError.label}
          onChange={(file) => handleInputChange("bannerImage", file)}
        ></FileForm>
      </Grid>

      {/* ICON IMAGE */}
      <Grid item xs={12} lg={12}>
        <FileForm
          title="Ảnh icon"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Kéo thả / chọn hình ảnh icon cho sản phẩm"
          value={formData.iconImage}
          error={formData.iconImageError.hasError}
          errorLabel={formData.iconImageError.label}
          onChange={(file) => handleInputChange("iconImage", file)}
        ></FileForm>
      </Grid>

      {/* ITEM TYPE */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Kiểu sản phẩm "
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Chọn kiểu sản phẩm"
          value={formData.interiorItemType}
          options={interiorItemTypeOptions}
          defaultValue={-1}
          defaultLabel="Chọn kiểu..."
          error={formData.interiorItemTypeError.hasError}
          errorLabel={formData.interiorItemTypeError.label}
          onChange={(value) => handleInputChange("interiorItemType", value)}
        ></SelectForm>
      </Grid>
      {/* PARENT CATEGORY */}
      <Grid item xs={12} lg={6}>
        <AutocompleteForm
          title="Loại sản phẩm gốc"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Chọn loại sản phẩm gốc"
          value={formData.parentCategoryId}
          options={parentCategories}
          error={formData.parentCategoryIdError.hasError}
          errorLabel={formData.parentCategoryId.label}
          onChange={(value) => handleInputChange("parentCategoryId", value)}
        ></AutocompleteForm>
      </Grid>
    </FormModal>
  );
}
