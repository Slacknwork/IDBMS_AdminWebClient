"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import projectTypeOptions from "/constants/enums/projectType";

import { createProjectDesign } from "/services/projectDesignServices";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import checkValidField from "/components/validations/field"

export default function CreateProjectDesignModal({ success }) {
  const params = useParams();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
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
    let result = { isValid: true, label: "" }

    switch (field) {
      case "name":
        result = checkValidField({
          value: value,
          maxLength: 50,
          required: true
        });

        break;
      case "minBudget":
      case "maxBudget":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "projectType":
      case "isHidden":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "estimateBusinessDay":
        result = checkValidField({
          value: value,
          minValue: 0,
        });

        break;
      case "description":
        result = checkValidField({
          value: value,
          maxLength: 750,
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
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
    try {
      const response = await createProjectDesign(formData);
      toast.success("Thêm thành công!");
      console.log(response);
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
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
    
    setOpenModal(false);
    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Tạo"
      title="Tạo thiết kế dự án"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
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
          onChange={(value) => handleInputChange("estimateBusinessDay", value)}
          endAdornment={<>Ngày</>}
        ></NumberForm>
      </Grid>

      {/* IS HIDDEN */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          required
          title="Ẩn"
          subtitle="Check vào ô nếu muốn ẩn"
          value={formData.isHidden}
          onChange={(e) => handleInputChange("isHidden", e.target.checked)}
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
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
