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
import projectTypeOptions from "../../../../../constants/enums/projectType";

import {
  getTaskCategoryById,
  updateTaskCategory,
  deleteTaskCategory,
} from "../../../../../services/taskCategoryServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

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
    projectType: -1,
    projectTypeError: { hasError: false, label: "" },
    iconImage: null,
    iconImageError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" },
    }));
    handleInputError(field, false, "");
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
        const response = await getTaskCategoryById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'phân loại công việc' từ hệ thống");
      }
    };
    await Promise.all([fetchTaskCategory()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateTaskCategory(params.id, transformedValue);
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
      const response = await deleteTaskCategory(params.id);
      console.log(response);
      toast.success("Xoá thành công!");
      router.push("/system/task-categories");
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

  return (
    <PageContainer
      title={formData.name}
      description="Chi tiết phân loại công việc"
    >
      <DetailsPage
        title="Thông tin phân loại công việc"
        saveMessage="Lưu thông tin phân loại công việc?"
        onSave={handleSave}
        deleteMessage={"Xoá phân loại công việc này?"}
        deleteLabel={"Xoá"}
        hasDelete
        onDelete={handleDelete}
        loading={loading}
      >
        {/* NAME */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Tên"
            required
            subtitle="Nhập tên danh mục"
            value={formData.name}
            error={formData.nameError.hasError}
            errorLabel={formData.nameError.label}
            onChange={(e) => handleInputChange("name", e.target.value)}
          ></TextForm>
        </Grid>

        {/* ENGLISH NAME */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Tên tiếng Anh"
            subtitle="Nhập tên tiếng Anh (nếu có)"
            value={formData.englishName}
            error={formData.englishNameError.hasError}
            errorLabel={formData.englishNameError.label}
            onChange={(e) => handleInputChange("englishName", e.target.value)}
          ></TextForm>
        </Grid>

        {/* DESCRIPTION */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Mô tả"
            subtitle="Nhập mô tả cho phân loại công việc"
            value={formData.description}
            error={formData.descriptionError.hasError}
            errorLabel={formData.descriptionError.label}
            onChange={(e) => handleInputChange("description", e.target.value)}
          ></TextForm>
        </Grid>

        {/* ENGLISH DESCRIPTION */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Mô tả tiếng Anh"
            subtitle="Nhập mô tả tiếng Anh (nếu có)"
            value={formData.englishDescription}
            error={formData.englishDescriptionError.hasError}
            errorLabel={formData.englishDescriptionError.label}
            onChange={(e) =>
              handleInputChange("englishDescription", e.target.value)
            }
          ></TextForm>
        </Grid>

        {/* PROJECT TYPE */}
        <Grid item xs={12} lg={6}>
          <SelectForm
            title="Loại dự án"
            required
            subtitle="Nhập loại dự án"
            value={formData.projectType}
            options={projectTypeOptions}
            defaultValue={-1}
            defaultLabel="Chọn một..."
            error={formData.projectTypeError.hasError}
            errorLabel={formData.projectTypeError.label}
            onChange={(value) => handleInputChange("projectType", value)}
          ></SelectForm>
        </Grid>

        {/* ICON IMAGE */}
        <Grid item xs={12} lg={6}>
          <FileForm
            title="Biểu tượng"
            titleSpan={3}
            fieldSpan={9}
            required
            subtitle="Chọn biểu tượng minh họa"
            value={formData.iconImage}
            error={formData.iconImageError.hasError}
            errorLabel={formData.iconImageError.label}
            onChange={(file) => handleInputChange("iconImage", file)}
          ></FileForm>
        </Grid>
        <Grid item xs={12} lg={4}>
          {/* Additional details can be added here */}
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
