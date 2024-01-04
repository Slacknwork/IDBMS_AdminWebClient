"use client";

import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { getAllInteriorItemColors } from "/services/interiorItemColorServices";
import { getAllInteriorItemCategories } from "/services/interiorItemCategoryServices";
import { createInteriorItemColor } from "../../../../services/interiorItemColorServices";

import interiorItemStatusOptions from "/constants/enums/interiorItemStatus";
import colorTypeOptions from "/constants/enums/colorType";

import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import FileForm from "/components/shared/Forms/File";
import FormModal from "/components/shared/Modals/Form";
import checkValidField from "/components/validations/field"

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
    await Promise.all([]);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "type":
      case "primaryColor":
        const result = checkValidField(value);

        if (result.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: result.label,
            },
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: false,
              label: "",
            },
          }));
        }
        break;
      case "englishName":
      case "secondaryColor":
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
          [`${field}Error`]: {
            hasError: false,
            label: "",
          },
        }));
        break;
      default:
    }
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    try {
      const response = await createInteriorItemColor(formData);
      toast.success(`Đã tạo '${formData?.name}!'`);
      router.push(`/colors/${response?.id}`);
    } catch (error) {
      console.log(`Error creating item: ${error}`);
      toast.error(`Lỗi tạo sản phẩm!`);
    }
  };

  useEffect(() => {
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      buttonLabel="Tạo màu"
      title="Tạo màu"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit={formHasError}
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

      {/* COLOR TYPE */}
      <Grid item xs={12} lg={8}>
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
      {formData.type === 0 && (
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
      )}

    </FormModal>
  );
}
