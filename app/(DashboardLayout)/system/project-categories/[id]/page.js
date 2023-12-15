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

import {
  getProjectCategoryById,
  updateProjectCategory,
  updateProjectCategoryHiddenStatus,
} from "/api/projectCategoryServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ProjectCategoryDetails() {
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    iconImage: null, // file update request
    iconImageError: { hasError: false, label: "" },
    isHidden: false,
    isHiddenError: { hasError: false, label: "" },
    iconImageUrl: null, // get from api
    iconImageChange: false,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" },
    }));
    handleInputError(field, false, "");

    //check file change
    if (field === "iconImageUrl")
      setFormData((prevData) => ({
        ...prevData,
        iconImageChange: true,
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
    const fetchProjectCategory = async () => {
      try {
        const response = await getProjectCategoryById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'phân loại dự án' từ hệ thống");
      }
    };
    await Promise.all([fetchProjectCategory()]);
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
      const response = await updateProjectCategory(params.id, transformedValue);
      console.log(response);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleUpdateStatus = async () => {
    try {
      const response = await updateProjectCategoryHiddenStatus(
        params.id,
        formData?.isHidden ? false : true
      );
      console.log(response);
      toast.success("Cập nhật thành công!");
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

    //set file for changes
    if (result.iconImageChange === true) result.iconImage = result.iconImageUrl;

    return result;
  };

  return (
    <PageContainer title={formData.name} description="Chi tiết phân loại dự án">
      <DetailsPage
        title="Thông tin phân loại dự án"
        saveMessage="Lưu thông tin phân loại dự án?"
        onSave={handleSave}
        deleteMessage={
          formData?.isHidden
            ? "Hiện phân loại dự án này?"
            : "Ẩn phân loại dự án này?"
        }
        deleteLabel={formData?.isHidden ? "Hiện" : "Ẩn"}
        hasDelete
        onDelete={handleUpdateStatus}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={3}>
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Tên"
                required
                subtitle="Nhập tên phân loại dự án"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              ></TextForm>
            </Grid>

            {/* ENGLISH NAME */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Tên tiếng Anh"
                subtitle="Nhập tên tiếng Anh (nếu có)"
                value={formData.englishName}
                error={formData.englishNameError.hasError}
                errorLabel={formData.englishNameError.label}
                onChange={(e) =>
                  handleInputChange("englishName", e.target.value)
                }
              ></TextForm>
            </Grid>

            {/* ICON IMAGE */}
            <Grid item xs={12} lg={12}>
              <FileForm
                title="Biểu tượng"
                titleSpan={4}
                fieldSpan={8}
                required
                subtitle="Chọn biểu tượng minh họa"
                value={formData.iconImageUrl}
                error={formData.iconImageError.hasError}
                errorLabel={formData.iconImageError.label}
                onChange={(file) => handleInputChange("iconImageUrl", file)}
              ></FileForm>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          {/* Additional details can be added here */}
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
