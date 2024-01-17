"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import { createPaymentStage } from "/services/paymentStageServices";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import checkValidField from "/components/validations/field";

export default function CreateStageModal({ success, stages }) {
  const params = useParams();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    isPrepaid: false,
    isWarrantyStage: false,
    pricePercentage: 0,
    pricePercentageError: { hasError: false, label: "" },
    endTimePayment: null,
    endTimePaymentError: { hasError: false, label: "" },
    projectId: params.id,
  });

  const [remainingPercentage, setRemainingPercentage] = useState(0);
  useEffect(() => {
    const sum = stages.reduce((accumulator, currentStage) => {
      return accumulator + currentStage.stage.pricePercentage;
    }, 0);
    setRemainingPercentage(100 - sum);
    console.log(sum);
  }, [stages]);

  const handleInputChange = (field, value) => {
    let result = { isValid: true, label: "" };
    console.log(remainingPercentage);
    switch (field) {
      case "name":
        result = checkValidField({
          value: value,
          maxLength: 50,
          required: true,
        });

        break;
      case "isPrepaid":
      case "isWarrantyStage":
        result = checkValidField({
          value: value,
          required: true,
        });

        break;
      case "pricePercentage":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          maxValue: remainingPercentage,
          required: true,
        });

        break;
      case "endTimePayment":
        result = checkValidField({
          value: value,
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
    try {
      if (!switchSubmit) return;
      const response = await createPaymentStage(formData);
      toast.success("Thêm thành công!");
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
      title="Tạo giai đoạn"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
    >
      {/* NAME */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Tên"
          required
          titleSpan={3}
          fieldSpan={9}
          subtitle="Nhập tên giai đoạn"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/* PRICE PERCENTAGE */}
      <Grid item xs={12} lg={6}>
        <NumberSimpleForm
          title="Khoảng phần trăm"
          required
          inputProps={{ min: 0, max: remainingPercentage }}
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="% trên tổng số tiền"
          value={formData.pricePercentage}
          error={formData.pricePercentageError.hasError}
          errorLabel={formData.pricePercentageError.label}
          onChange={(value) => handleInputChange("pricePercentage", value)}
          endAdornment={<>%</>}
        ></NumberSimpleForm>
      </Grid>

      {/* END TIME PAYMENT */}
      <Grid item xs={12} lg={6}>
        <DateForm
          datetime
          title="Hạn chót thanh toán"
          subtitle="Hạn chót thanh toán cho giai đoạn này"
          value={formData.endTimePayment}
          error={formData.endTimePaymentError.hasError}
          errorLabel={formData.endTimePaymentError.label}
          onChange={(value) => handleInputChange("endTimePayment", value)}
        ></DateForm>
      </Grid>

      {/* IS WARRANTY PAID */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          required
          title="Giai đoạn bảo hành"
          subtitle="Check vào ô nếu là giai đoạn bảo hành"
          value={formData.isWarrantyStage}
          onChange={(e) =>
            handleInputChange("isWarrantyStage", e.target.checked)
          }
        ></CheckboxForm>
      </Grid>

      {/* IS PREPAID */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          required
          title="Phải trả trước"
          subtitle="Check nếu phải thanh toán trước khi bắt đầu"
          value={formData.isPrepaid}
          onChange={(e) => handleInputChange("isPrepaid", e.target.checked)}
        ></CheckboxForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Mô tả"
          multiline
          rows={4}
          titleSpan={3}
          fieldSpan={9}
          subtitle="Mô tả sơ lược giai đoạn"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
