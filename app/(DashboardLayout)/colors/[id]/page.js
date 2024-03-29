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
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

import {
  getColorById,
  updateInteriorItemColor,
  deleteInteriorItemColor,
} from "/services/interiorItemColorServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import colorTypeOptions from "/constants/enums/colorType";

export default function TaskCategoryDetails() {
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    type: 0,
    typeError: { hasError: false, label: "" },
    primaryColorFile: null,
    primaryColorFileError: { hasError: false, label: "" },
    secondaryColorFile: null,
    secondaryColorFileError: { hasError: false, label: "" },
    primaryColor: "",
    primaryColorError: { hasError: false, label: "" },
    secondaryColor: "",
    secondaryColorError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    let result = { isValid: true, label: "" }

    switch (field) {
      case "name":
        result = checkValidField({
          value: value,
          maxLength: 50,
          required: true
        });

        break;
      case "type":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      
      case "englishName":
        result = checkValidField({
          value: value,
          maxLength: 50,
        });

        break;
      default:
    }
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: {
        hasError: !result.isValid,
        label: result.label,
      },
    }));
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

  // INIT CONST
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchTaskCategory = async () => {
      try {
        const response = await getColorById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Màu' từ hệ thống");
      }
    };
    await Promise.all([fetchTaskCategory()]);
    setLoading(false);
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateInteriorItemColor(
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
      const response = await deleteInteriorItemColor(params.id);
      console.log(response);
      toast.success("Xoá thành công!");
      router.push("/colors");
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
    <PageContainer title={formData.name} description="Chi tiết màu">
      <DetailsPage
        title="Thông tin màu"
        saveMessage="Lưu thông tin màu?"
        onSave={handleSubmit}
        deleteMessage={"Xoá màu này?"}
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
      </DetailsPage>
    </PageContainer>
  );
}
