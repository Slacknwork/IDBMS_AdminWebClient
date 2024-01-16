"use client";

import { useParams } from "next/navigation";
import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAdvertisementProjectById,
  updateAdvertisementProject,
} from "/services/advertisementServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import SelectForm from "/components/shared/Forms/Select";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import { useSelector } from "react-redux";

import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import languageOptions from "/constants/enums/language";
import advertisementStatusOptions from "/constants/enums/advertisementStatus";
import { getProjectCategories } from "/services/projectCategoryServices";
import { GetProjectDecisionMakersByProjectId } from "/services/projectParticipationServices";
import checkValidField from "/components/validations/field"

export default function AdvertisementDetailsPage() {
  const params = useParams();
  const admin = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    type: 0,
    typeError: { hasError: false, label: "" },
    language: 0,
    languageError: { hasError: false, label: "" },
    projectCategoryId: null,
    projectCategoryIdError: { hasError: false, label: "" },
    estimatedPrice: 0,
    estimatedPriceError: { hasError: false, label: "" },
    finalPrice: 0,
    finalPriceError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
    createdAdminUsername: admin?.username || "",
    createdByAdminId: admin?.id || "",
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
      case "projectCategoryId":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "type":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "area":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "language":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "finalPrice":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "estimatedPrice":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "estimateBusinessDay":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
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

  // GET SITE DETAILS
  const [pageName, setPageName] = useState("");

  const [loading, setLoading] = useState(true);
  const [editEnable, setEditEnable] = useState(false);

  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchProjectById = async () => {
      try {
        const response = await getAdvertisementProjectById(params.id);
        setFormData((prevData) => ({ ...prevData, ...response }));
        setPageName(response.name);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Dự án' từ hệ thống");
      }
    };
    const fetchProjectOwnerByProjectId = async () => {
      try {
        const response = await GetProjectDecisionMakersByProjectId(params.id);

        // if project no owner (advertisement create purpose)
        if (response?.projectOwner === null) {
          setEditEnable(true)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Chủ dự án' từ hệ thống");
      }
    };
    await Promise.all([fetchProjectById(), fetchProjectOwnerByProjectId()]);
    setLoading(false);
  };

  const [projectCategories, setProjectCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    setLoading(true);
    const fetchProjectCategories = async () => {
      try {
        const response = await getProjectCategories();
        setProjectCategories(response?.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân loại dự án' từ hệ thống");
      }
    };
    await Promise.all([fetchProjectCategories()]);
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

  const onSaveAdvertisementProject = async () => {
    try {
      await updateAdvertisementProject(params.id, formData);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  useEffect(() => {
    fetchDataFromApi();
    fetchOptionsFromApi();
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    onSaveAdvertisementProject();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  

  return (
    <PageContainer title={pageName} description={"Chi tiết dự án quảng cáo"}>
      <DetailsPage
        loading={loading}
        title="Thông tin dự án"
        saveMessage="Lưu thông tin dự án?"
        onSave={handleSubmit}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={3}>
            {/* NAME */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Tên"
                required
                subtitle="Nhập tên dự án"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!editEnable}
              ></TextForm>
            </Grid>

            {/* PROJECT TYPE */}
            <Grid item xs={12} lg={6}>
              <SelectForm
                title="Kiểu dự án"
                required
                subtitle="Chọn kiểu dự án"
                value={formData.type}
                options={projectTypeOptions}
                defaultValue={-1}
                defaultLabel="Chọn kiểu dự án"
                error={formData.typeError.hasError}
                errorLabel={formData.typeError.label}
                onChange={(value) => handleInputChange("type", value)}
                disabled={!editEnable}
              ></SelectForm>
            </Grid>

            {/* PROJECT CATEGORY */}
            <Grid item xs={12} lg={6}>
              <AutocompleteForm
                required
                title="Phân loại"
                subtitle="Chọn phân loại dự án"
                value={formData.projectCategoryId}
                options={projectCategories}
                error={formData.projectCategoryIdError.hasError}
                errorLabel={formData.projectCategoryIdError.label}
                onChange={(value) => handleInputChange("projectCategoryId", value)}
                disabled={!editEnable}
              ></AutocompleteForm>
            </Grid>

            {/* LANGUAGE */}
            <Grid item xs={12} lg={6}>
              <SelectForm
                title="Ngôn ngữ"
                required
                subtitle="Chọn ngôn ngữ của dự án"
                value={formData.language}
                options={languageOptions}
                defaultValue={-1}
                defaultLabel="Chọn một..."
                error={formData.languageError.hasError}
                errorLabel={formData.languageError.label}
                onChange={(value) => handleInputChange("language", value)}
                disabled={!editEnable}
              ></SelectForm>
            </Grid>

            {/* ESTIMATE PRICE */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Giá ước tính"
                titleSpan={6}
                fieldSpan={6}
                spacing={5}
                required
                subtitle="Nhập giá ước tính của dự án"
                value={formData.estimatedPrice}
                error={formData.estimatedPriceError.hasError}
                errorLabel={formData.estimatedPriceError.label}
                onChange={(value) => handleInputChange("estimatedPrice", value)}
                endAdornment={<>₫</>}
                disabled={!editEnable}
              ></NumberForm>
            </Grid>

            {/* FINAL PRICE */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Giá cuối cùng"
                titleSpan={6}
                fieldSpan={6}
                spacing={5}
                required
                subtitle="Nhập giá cuối cùng của sản phẩm"
                value={formData.finalPrice}
                error={formData.finalPriceError.hasError}
                errorLabel={formData.finalPriceError.label}
                onChange={(value) => handleInputChange("finalPrice", value)}
                endAdornment={<>₫</>}
                disabled={!editEnable}
              ></NumberForm>
            </Grid>

            {/* AREA */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Diện tích"
                titleSpan={6}
                fieldSpan={6}
                spacing={5}
                required
                subtitle="Nhập diện tích của sản phẩm"
                value={formData.area}
                error={formData.areaError.hasError}
                errorLabel={formData.areaError.label}
                onChange={(value) => handleInputChange("area", value)}
                endAdornment={<>m²</>}
                disabled={!editEnable}
              ></NumberForm>
            </Grid>

            {/* ESTIMATE BUSINESS DAY */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Ngày làm việc ước tính"
                titleSpan={6}
                fieldSpan={6}
                spacing={5}
                required
                subtitle="Nhập số ngày làm việc ước tính để hoàn thành"
                value={formData.estimateBusinessDay}
                error={formData.estimateBusinessDayError.hasError}
                errorLabel={formData.estimateBusinessDayError.label}
                onChange={(value) => handleInputChange("estimateBusinessDay", value)}
                endAdornment={<>ngày</>}
                disabled={!editEnable}
              ></NumberForm>
            </Grid>
          </Grid>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
