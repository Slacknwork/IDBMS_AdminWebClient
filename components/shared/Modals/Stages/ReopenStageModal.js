"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import NumberForm from "/components/shared/Forms/Number";
import { reopenPaymentStage } from "../../../../services/paymentStageServices";

export default function ReopenStageModal({ stageId, success }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    status: -1,
    statusError: { hasError: false, label: "" },
    stageId: stageId,
    penaltyFee: 0,
    penaltyFeeError: { hasError: false, label: "" },
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

  const handleReopenStage = async () => {
    try {
      const response = await reopenPaymentStage(stageId, formData.penaltyFee);
      toast.success("Cập nhật thành công!");
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <FormModal
      buttonLabel="Mở lại"
      title="Mở lại giai đoạn"
      submitLabel="Xác nhận"
      onSubmit={handleReopenStage}
    >
      {/* PENALTY FEE */}
      <Grid item xs={12} lg={12}>
        <NumberForm
          title="Tiền phạt trễ hạn"
          required
          subtitle="Nhập số tiền phạt"
          value={formData.penaltyFee}
          error={formData.penaltyFeeError.hasError}
          errorLabel={formData.penaltyFeeError.label}
          onChange={(value) => handleInputChange("penaltyFee", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
      </Grid>
    </FormModal>
  );
}
