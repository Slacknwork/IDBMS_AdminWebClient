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

export default function CreateStageModal({ onCreate }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    stageNo: 0,
    stageNoError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    isPaid: false,
    totalContractPaid: 0,
    totalContractPaidError: { hasError: false, label: "" },
    totalIncurredPaid: 0,
    totalIncurredPaidError: { hasError: false, label: "" },
    isPrepaid: false,
    pricePercentage: 0,
    pricePercentageError: { hasError: false, label: "" },
    paidDate: null,
    paidDateError: { hasError: false, label: "" },
    startedDate: null,
    startedDateError: { hasError: false, label: "" },
    endDate: null,
    endDateError: { hasError: false, label: "" },
    endTimePayment: null,
    endTimePaymentError: { hasError: false, label: "" },
    penaltyFee: 0,
    penaltyFeeError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
    status: -1,
    statusError: { hasError: false, label: "" },
    isHidden: false,
    projectId: params.id,
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
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
        onCreate();
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
      {/* STAGE NO */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Giai đoạn số"
          required
          subtitle="Nhập số thứ tự của giai đoạn"
          value={formData.stageNo}
          error={formData.stageNoError.hasError}
          errorLabel={formData.stageNoError.label}
          onChange={(value) => handleInputChange("stageNo", value)}
        ></NumberForm>
      </Grid>

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

      {/* IS PAID */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          title="Đã trả tiền"
          subtitle="Check vào ô nếu giai đoạn này đã được thanh toán"
          value={formData.isPaid}
          onChange={(e) => handleInputChange("isPaid", e.target.value)}
        ></CheckboxForm>
      </Grid>

      {/* IS PREPAID */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          title="Đã trả trước"
          subtitle="Check vào ô nếu giai đoạn này đã được thanh toán trước giai đoạn"
          value={formData.isPrepaid}
          onChange={(e) => handleInputChange("isPrepaid", e.target.value)}
        ></CheckboxForm>
      </Grid>

      {/* TOTAL CONTRACT PAID */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số tiền trên hợp đồng"
          required
          subtitle="Nhập số tiền dựa trên hợp đồng"
          value={formData.totalContractPaid}
          error={formData.totalContractPaidError.hasError}
          errorLabel={formData.totalContractPaidError.label}
          onChange={(value) => handleInputChange("totalContractPaid", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
      </Grid>

      {/* TOTAL INCURRED PAID */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số tiền phát sinh"
          subtitle="Nhập số tiền phát sinh (nếu có)"
          value={formData.totalIncurredPaid}
          error={formData.totalIncurredPaidError.hasError}
          errorLabel={formData.totalIncurredPaidError.label}
          onChange={(value) => handleInputChange("totalIncurredPaid", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
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

      {/* PAID DATE */}
      <Grid item xs={12} lg={6}>
        <DateForm
          title="Ngày trả tiền"
          subtitle="Ngày khách hàng đã thanh toán khoảng tiền này"
          value={formData.paidDate}
          error={formData.paidDateError.hasError}
          errorLabel={formData.paidDateError.label}
          onChange={(value) => handleInputChange("paidDate", value)}
        ></DateForm>
      </Grid>

      {/* STARTED DATE */}
      <Grid item xs={12} lg={6}>
        <DateForm
          title="Ngày bắt đầu"
          required
          subtitle="Ngày bắt đầu giai đoạn"
          value={formData.startedDate}
          error={formData.startedDateError.hasError}
          errorLabel={formData.startedDateError.label}
          onChange={(value) => handleInputChange("startedDate", value)}
        ></DateForm>
      </Grid>

      {/* END DATE */}
      <Grid item xs={12} lg={6}>
        <DateForm
          title="Ngày kết thúc"
          required
          subtitle="Ngày kết thúc giai đoạn"
          value={formData.endDate}
          error={formData.endDateError.hasError}
          errorLabel={formData.endDateError.label}
          onChange={(value) => handleInputChange("endDate", value)}
        ></DateForm>
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

      {/* PENALTY FEE */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Khoảng phạt"
          subtitle="Nhập số tiền bồi thường giai đoạn"
          value={formData.penaltyFee}
          error={formData.penaltyFeeError.hasError}
          errorLabel={formData.penaltyFeeError.label}
          onChange={(value) => handleInputChange("penaltyFee", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
      </Grid>

      {/* ESTIMATE BUSINESS DAY */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số ngày"
          required
          subtitle="Số ngày làm việc ước tính"
          value={formData.estimateBusinessDay}
          error={formData.estimateBusinessDayError.hasError}
          errorLabel={formData.estimateBusinessDayError.label}
          onChange={(value) => handleInputChange("estimateBusinessDay", value)}
          endAdornment={<>ngày</>}
        ></NumberForm>
      </Grid>

      {/* STATUS */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Trạng thái"
          required
          subtitle="Trạng thái của giai đoạn này"
          value={formData.status}
          options={stageStatusOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.statusError.hasError}
          errorLabel={formData.statusError.label}
          onChange={(value) => handleInputChange("status", value)}
        ></SelectForm>
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
