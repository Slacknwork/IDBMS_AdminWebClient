"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import SelectForm from "/components/shared/Forms/Select";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import projectTypeOptions from "/constants/enums/projectType";
import checkValidField from "/components/validations/field"

import {
  getProjectDesignById,
  updateProjectDesign,
  updateProjectDesignHiddenStatus,
} from "/services/projectDesignServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function ProjectDesignDetails() {
  const [formData, setFormData] = useState({
    minBudget: 0,
    minBudgetError: { hasError: false, label: "" },
    maxBudget: 0,
    maxBudgetError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
    name: "",
    nameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    projectType: "",
    projectTypeError: { hasError: false, label: "" },
    isHidden: false,
    isHiddenError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "minBudget":
      case "maxBudget":
      case "projectType":
      case "isHidden":
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
      case "estimateBusinessDay":
      case "description":
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

  // INIT CONST
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchProjectDesign = async () => {
      try {
        const response = await getProjectDesignById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'thiết kế dự án' từ hệ thống");
      }
    };
    await Promise.all([fetchProjectDesign()]);
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
      const response = await updateProjectDesign(params.id, transformedValue);
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleUpdateStatus = async () => {
    try {
      const response = await updateProjectDesignHiddenStatus(
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
    <PageContainer title={formData.name} description="Chi tiết thiết kế dự án">
      <DetailsPage
        title="Thông tin thiết kế dự án"
        saveMessage="Lưu thông tin thiết kế dự án?"
        onSave={handleSubmit}
        deleteMessage={
          formData?.isHidden
            ? "Hiện thiết kế dự án này?"
            : "Ẩn thiết kế dự án này?"
        }
        deleteLabel={formData?.isHidden ? "Hiện" : "Ẩn"}
        hasDelete
        onDelete={handleUpdateStatus}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={3}>
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

            {/* MIN BUDGET */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Ngân sách tối thiểu"
                required
                subtitle="Nhập số tiền tối thiểu"
                value={formData.minBudget}
                error={formData.minBudgetError.hasError}
                errorLabel={formData.minBudgetError.label}
                onChange={(value) => handleInputChange("minBudget", value)}
                endAdornment={<>VND</>}
              ></NumberForm>
            </Grid>

            {/* MAX BUDGET */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Ngân sách tối đa"
                required
                subtitle="Nhập số tiền tối đa"
                value={formData.maxBudget}
                error={formData.maxBudgetError.hasError}
                errorLabel={formData.maxBudgetError.label}
                onChange={(value) => handleInputChange("maxBudget", value)}
                endAdornment={<>VND</>}
              ></NumberForm>
            </Grid>

            {/* ESTIMATE BUSINESS DAY */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Ngày hoàn thành dự kiến"
                subtitle="Nhập số ngày"
                value={formData.estimateBusinessDay}
                error={formData.estimateBusinessDayError.hasError}
                errorLabel={formData.estimateBusinessDayError.label}
                onChange={(value) =>
                  handleInputChange("estimateBusinessDay", value)
                }
                endAdornment={<>Ngày</>}
              ></NumberForm>
            </Grid>

            {/* IS HIDDEN */}
            <Grid item xs={12} lg={6}>
              <CheckboxForm
                title="Ẩn"
                subtitle="Check vào ô nếu muốn ẩn"
                value={formData.isHidden}
                onChange={(e) =>
                  handleInputChange("isHidden", e.target.checked)
                }
              ></CheckboxForm>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                titleSpan={3}
                fieldSpan={9}
                title="Mô tả"
                subtitle="Nhập mô tả cho thiết kế dự án"
                value={formData.description}
                error={formData.descriptionError.hasError}
                errorLabel={formData.descriptionError.label}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              ></TextForm>
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
