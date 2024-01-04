"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import { createPaymentStage } from "/services/paymentStageServices";

import stageStatusOptions from "/constants/enums/stageStatus";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import checkValidField from "/components/validations/field"

export default function CreateStageModal({ success }) {
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

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "isPrepaid":
      case "isWarrantyStage":
      case "pricePercentage":
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
      case "endTimePayment":
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
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
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
          subtitle="% trên tổng số tiền"
          value={formData.pricePercentage}
          error={formData.pricePercentageError.hasError}
          errorLabel={formData.pricePercentageError.label}
          onChange={(value) => handleInputChange("pricePercentage", value)}
          endAdornment={<>%</>}
        ></NumberForm>
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
