"use client";

import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { getAllInteriorItemColors } from "/api/interiorItemColorServices";
import { getAllInteriorItemCategories } from "/api/interiorItemCategoryServices";
import {
  createInteriorItemColor,
} from "../../../../api/interiorItemColorServices";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import colorTypeOptions from "/constants/enums/colorType";

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
    type: 0,
    typeError: { hasError: false, label: "" },
    primaryColor: "",
    primaryColorError: { hasError: false, label: "" },
    secondaryColor: "",
    secondaryColorError: { hasError: false, label: "" },
  });

  const [interiorItemColors, setInteriorItemColors] = useState([]);
  const [interiorItemCategories, setInteriorItemCategories] = useState([]);
  const [parentItems, setParentItems] = useState([]);

  const fetchDataFromApi = async () => {

    await Promise.all([
 
    ]);
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
      const response = await createInteriorItemColor(formData);
      toast.success(`Đã tạo '${formData?.name}!'`);
      router.push(`/items/colors/${response?.id}`);
    } catch (error) {
      console.log(`Error creating item: ${error}`);
      toast.error(`Lỗi tạo sản phẩm!`);
    }
  };

  return (
    <FormModal
      buttonLabel="Tạo màu"
      title="Tạo màu"
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
          subtitle="Nhập tên màu"
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
          subtitle="Nhập tên tiếng anh cho màu"
          value={formData.englishName}
          error={formData.englishNameError.hasError}
          errorLabel={formData.englishNameError.label}
          onChange={(e) => handleInputChange("englishName", e.target.value)}
        ></TextForm>
      </Grid>      

      {/* PRIMARY COLOR */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Màu chính"
          titleSpan={3}
          fieldSpan={9}
          required
          subtitle="Nhập tên màu chính"
          value={formData.primaryColor}
          error={formData.primaryColorError.hasError}
          errorLabel={formData.primaryColorError.label}
          onChange={(e) => handleInputChange("primaryColor", e.target.value)}
        ></TextForm>
      </Grid>
      
      {/* SECONDARY COLOR */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Màu phụ"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Nhập tên màu phụ"
          value={formData.secondaryColor}
          error={formData.secondaryColorError.hasError}
          errorLabel={formData.secondaryColorError.label}
          onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
        ></TextForm>
      </Grid>

      {/* COLOR TYPE */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Loại màu"
          required
          titleSpan={6}
          fieldSpan={6}
          subtitle="Chọn loại màu"
          value={formData.type}
          options={colorTypeOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.typeError.hasError}
          errorLabel={formData.typeError.label}
          onChange={(value) => handleInputChange("type", value)}
        ></SelectForm>
      </Grid>

    </FormModal>
  );
}
