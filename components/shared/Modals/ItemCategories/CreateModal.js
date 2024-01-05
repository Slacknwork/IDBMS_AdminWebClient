"use client";

import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

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

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "interiorItemType":
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
      case "bannerImage":
      case "iconImage":
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
        break;
      case "englishName":
      case "description":
      case "englishDescription":
      case "parentCategoryId":
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

  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [switchSubmit, setSwitchSubmit] = useState(false);
  
  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    try {
      if (!switchSubmit) return;
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

  useEffect(() => {
    fetchDataFromApi();

    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);

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
      buttonLabel="Tạo loại sản phẩm"
      title="Tạo loại sản phẩm"
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
