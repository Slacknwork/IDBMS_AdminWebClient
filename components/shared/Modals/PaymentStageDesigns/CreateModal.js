"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import FileForm from "/components/shared/Forms/File";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";

import { createPaymentStageDesign } from "/services/paymentStageDesignServices";
import { getAllProjectDesigns } from "/services/projectDesignServices";
import checkValidField from "/components/validations/field"

export default function CreateProjectCategoryModal({ success }) {
  const params = useParams();
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
    pricePercentage: 0,
    pricePercentageError: { hasError: false, label: "" },
    stageNo: 0,
    stageNoError: { hasError: false, label: "" },
    isPrepaid: false,
    isPrepaidError: { hasError: false, label: "" },
    isWarrantyStage: false,
    isWarrantyStageError: { hasError: false, label: "" },
    projectDesignId: "",
    projectDesignIdError: { hasError: false, label: "" },
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
      case "pricePercentage":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "stageNo":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "isPrepaid":
      case "isWarrantyStage":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "projectDesignId":
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
      case "description":
      case "englishDescription":
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

  const [projectDesigns, setProjectDesigns] = useState([]);

  const fetchDataFromApi = async () => {
    const fetchProjectDesigns = async () => {
      try {
        const data = await getAllProjectDesigns({});
        setProjectDesigns(data.list);
        console.log(data.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Thiết kế dự án");
        console.log(error);
      }
    };
    await Promise.all([fetchProjectDesigns()]);
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
      const response = await createPaymentStageDesign(formData);
      toast.success("Thêm thành công!");
      console.log(response);
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
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
      buttonLabel="Tạo"
      title="Tạo thiết kế giai đoạn thanh toán"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      disableCloseOnSubmit
    >
      {/* NAME */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Tên"
          required
          subtitle="Nhập tên"
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
          subtitle="Nhập mổ tả"
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
          subtitle="Nhập mô tả tiếng anh"
          value={formData.englishDescription}
          error={formData.englishDescriptionError.hasError}
          errorLabel={formData.englishDescriptionError.label}
          onChange={(e) =>
            handleInputChange("englishDescription", e.target.value)
          }
        ></TextForm>
      </Grid>

      {/* PRICE PERCENTAGE */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Phần trăm giá"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Nhập phần trăm giá"
          value={formData.pricePercentage}
          error={formData.pricePercentageError.hasError}
          errorLabel={formData.pricePercentageError.label}
          onChange={(value) => handleInputChange("pricePercentage", value)}
          endAdornment={<>%</>}
        ></NumberForm>
      </Grid>

      {/* STAGE NO */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số giai đoạn"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          subtitle="Nhập số giai đoạn"
          value={formData.stageNo}
          error={formData.stageNoError.hasError}
          errorLabel={formData.stageNoError.label}
          onChange={(value) => handleInputChange("stageNo", value)}
          endAdornment={<></>}
        ></NumberForm>
      </Grid>

      {/* PROJECT DESIGN */}
      <Grid item xs={12} lg={12}>
        <AutocompleteForm
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          title="Thiết kế dự án"
          subtitle="Chọn thiết kế dự án"
          value={formData.projectDesignId}
          options={projectDesigns}
          error={formData.projectDesignIdError.hasError}
          errorLabel={formData.projectDesignIdError.label}
          onChange={(value) => handleInputChange("projectDesignId", value)}
        ></AutocompleteForm>
      </Grid>

      {/* IS PREPAID */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          required
          title="Trả trước"
          subtitle="Check vào ô nếu đã trả trước"
          value={formData.isPrepaid}
          onChange={(e) => handleInputChange("isPrepaid", e.target.checked)}
        ></CheckboxForm>
      </Grid>

      {/* IS WARRANTY STAGE */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          required
          title="Bảo hành"
          subtitle="Check vào ô nếu giai đoạn này có bảo hành"
          value={formData.isWarrantyStage}
          onChange={(e) => handleInputChange("isWarrantyStage", e.target.checked)}
        ></CheckboxForm>
      </Grid>

    </FormModal>
  );
}
