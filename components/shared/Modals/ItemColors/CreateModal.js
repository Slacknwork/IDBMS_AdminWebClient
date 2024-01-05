"use client";

import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

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
import checkValidUrl from "/components/validations/url"

export default function CreateItemModal() {
  // INIT
  const router = useRouter();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
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
    primaryColorFile: null,
    primaryColorFileError: { hasError: false, label: "" },
    secondaryColorFile: null,
    secondaryColorFileError: { hasError: false, label: "" },
  });

  const [interiorItemColors, setInteriorItemColors] = useState([]);
  const [interiorItemCategories, setInteriorItemCategories] = useState([]);
  const [parentItems, setParentItems] = useState([]);

  const fetchDataFromApi = async () => {
    await Promise.all([]);
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "type":
        const result = checkValidField(value);
        console.log(field)
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
      case "primaryColorFile":
      case "secondaryColorFile":
        const validFile = checkValidUrl(value);
        console.log(field)
        if (validFile.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validFile.label,
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
      case "englishName":
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
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
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
    fetchDataFromApi();

    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    setOpenModal(false);
    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Tạo màu"
      title="Tạo màu"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
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
          <FileForm
            title="Màu chính"
            titleSpan={3}
            fieldSpan={9}
            required
            subtitle="Kéo thả / chọn hình ảnh màu chính"
            value={formData.primaryColorFile}
            imgDisplay={formData.primaryColor}
            error={formData.primaryColorFileError.hasError}
            errorLabel={formData.primaryColorFileError.label}
            onChange={(file) => handleInputChange("primaryColorFile", file)}
          ></FileForm>
        </Grid>

      {/* SECONDARY COLOR */}
      {formData.type === 0 && (
        <Grid item xs={12} lg={6}>
          <FileForm
            title="Màu phụ"
            titleSpan={3}
            fieldSpan={9}
            subtitle="Kéo thả / chọn hình ảnh màu phụ"
            value={formData.secondaryColorFile}
            imgDisplay={formData.secondaryColor}
            error={formData.secondaryColorFileError.hasError}
            errorLabel={formData.secondaryColorFileError.label}
            onChange={(file) => handleInputChange("secondaryColorFile", file)}
          ></FileForm>
        </Grid>
        )}
    </FormModal>
  );
}
