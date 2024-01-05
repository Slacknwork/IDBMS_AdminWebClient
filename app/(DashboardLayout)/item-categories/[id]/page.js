"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import languageOptions from "/constants/enums/language";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import SelectForm from "/components/shared/Forms/Select";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import FileForm from "/components/shared/Forms/File";
import projectTypeOptions from "/constants/enums/projectType";
import interiorItemTypeOptions from "/constants/enums/interiorItemType";

import {
  getAllInteriorItemCategories,
  getInteriorItemCategoryById,
  updateInteriorItemCategory,
  deleteInteriorItemCategory,
} from "/services/interiorItemCategoryServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import colorTypeOptions from "/constants/enums/colorType";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

export default function TaskCategoryDetails() {
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
    bannerImageUrl: null,
    bannerImageUrlError: { hasError: false, label: "" },
    iconImage: null,
    iconImageError: { hasError: false, label: "" },
    iconImageUrl: null,
    iconImageUrlError: { hasError: false, label: "" },
    interiorItemType: 0,
    interiorItemTypeError: { hasError: false, label: "" },
    parentCategoryId: "",
    parentCategoryIdError: { hasError: false, label: "" },
  });

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

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [parentCategories, setParentCategories] = useState([]);

  // INIT CONST
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchTaskCategory = async () => {
      try {
        const response = await getInteriorItemCategoryById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'loại sản phẩm' từ hệ thống");
      }
    };
    const fetchParentCategories = async () => {
      try {
        const items = await getAllInteriorItemCategories({});
        setParentCategories(items.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Sản phẩm");
        console.log(error);
      }
    };
    await Promise.all([fetchTaskCategory(), fetchParentCategories()]);
    setLoading(false);
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };


  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateInteriorItemCategory(
        params.id,
        transformedValue
      );
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteInteriorItemCategory(params.id);
      console.log(response);
      toast.success("Xoá thành công!");
      router.push("/item-categories");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const transformData = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === null) {
        result[key] = "";
      }
    }

    return result;
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

    handleSave();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <PageContainer title={formData.name} description="Chi tiết loại sản phẩm">
      <DetailsPage
        title="Thông tin loại sản phẩm"
        saveMessage="Lưu thông tin loại sản phẩm?"
        onSave={handleSubmit}
        deleteMessage={"Xoá loại sản phẩm này?"}
        deleteLabel={"Xoá"}
        hasDelete
        onDelete={handleDelete}
        loading={loading}
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
            imgDisplay={formData.bannerImageUrl}
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
            imgDisplay={formData.iconImageUrl}
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
            errorLabel={formData.parentCategoryId?.label}
            onChange={(value) => handleInputChange("parentCategoryId", value)}
          ></AutocompleteForm>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
