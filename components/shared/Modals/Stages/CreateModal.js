"use client";

import { useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { createPaymentStage } from "/api/paymentStageServices";

import stageStatusOptions from "/constants/enums/stageStatus";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";

export default function CreateStageModal({ success }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    isPrepaid: false,
    pricePercentage: 0,
    pricePercentageError: { hasError: false, label: "" },
    endTimePayment: null,
    endTimePaymentError: { hasError: false, label: "" },
    status: -1,
    statusError: { hasError: false, label: "" },
    projectId: params.id,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    handleInputError(field, false, "");
  };
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await createPaymentStage(formData);
      if (response.data != null) {
        toast.success("Thêm thành công!");
        success(true)
      } else {
        throw new Error("Create failed!");
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo giai đoạn"
      submitLabel="Tạo"
      onSubmit={handleCreate}
      size="big"
    >
      {/* NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên"
          required
          subtitle="Nhập tên giai đoạn"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/* PRICE PERCENTAGE */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Khoảng phần trăm"
          required
          subtitle="Nhập số phần trăm trên số tiền tổng dự án cho giai đoạn này"
          value={formData.pricePercentage}
          error={formData.pricePercentageError.hasError}
          errorLabel={formData.pricePercentageError.label}
          onChange={(value) => handleInputChange("pricePercentage", value)}
          endAdornment={<>%</>}
        ></NumberForm>
      </Grid>

      {/* IS PREPAID */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          title="Phải trả trước"
          subtitle="Check vào ô nếu giai đoạn này phải được thanh toán trước khi bắt đầu"
          value={formData.isPrepaid}
          onChange={(e) => handleInputChange("isPrepaid", e.target.checked)}
        ></CheckboxForm>
      </Grid>

      {/* END TIME PAYMENT */}
      <Grid item xs={12} lg={6}>
        <DateForm
          datetime
          title="Hạn chót thanh toán"
          required
          subtitle="Hạn chót thanh toán cho giai đoạn này"
          value={formData.endTimePayment}
          error={formData.endTimePaymentError.hasError}
          errorLabel={formData.endTimePaymentError.label}
          onChange={(value) => handleInputChange("endTimePayment", value)}
        ></DateForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Mô tả"
          multiline
          rows={4}
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
