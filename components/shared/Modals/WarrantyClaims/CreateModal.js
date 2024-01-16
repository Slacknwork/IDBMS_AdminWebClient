"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createWarrantyClaim } from "../../../../services/warrantyClaimServices";
import { getAllUsers } from "../../../../services/userServices";

import AutocompleteForm from "../../Forms/Autocomplete";
import DateForm from "../../Forms/Date";
import FileForm from "../../Forms/File";
import TextForm from "../../Forms/Text";
import NumberForm from "../../Forms/Number";
import CheckForm from "../../Forms/Checkbox";
import FormModal from "../../Modals/Form";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
};

export default function CreateWarrantyClaimModal({ success }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const params = useParams();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    reason: "",
    reasonError: { hasError: false, label: "" },
    solution: "",
    solutionError: { hasError: false, label: "" },
    note: "",
    noteError: { hasError: false, label: "" },
    totalPaid: 0,
    totalPaidError: { hasError: false, label: "" },
    isCompanyCover: false,
    isCompanyCoverError: { hasError: false, label: "" },
    endDate: "",
    endDateError: { hasError: false, label: "" },
    confirmationDocument: null,
    confirmationDocumentError: { hasError: false, label: "" },
    projectId: params.id,
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
        console.log(result)
        break;
      case "totalPaid":
        result = checkValidField({
          value: value,
          minValue: 0,
          required: true,
        });

        break;
      case "isCompanyCover":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "confirmationDocument":
      case "reason":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
      case "solution":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
      case "note":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
      case "endDate":
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
    if (!switchSubmit) return;
    try {
      const response = await createWarrantyClaim(formData);
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
      title="Tạo phiếu bảo hiểm"
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
          subtitle="Nhập bảo hiểm"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/* REASON */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Lý Do"
          subtitle="Nhập lý Do"
          value={formData.reason}
          error={formData.reasonError.hasError}
          errorLabel={formData.reasonError.label}
          onChange={(e) => handleInputChange("reason", e.target.value)}
        ></TextForm>
      </Grid>

      {/* SOLUTION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Giải Pháp"
          subtitle="Nhập giải Pháp"
          value={formData.solution}
          error={formData.solutionError.hasError}
          errorLabel={formData.solutionError.label}
          onChange={(e) => handleInputChange("solution", e.target.value)}
        ></TextForm>
      </Grid>

      {/* TOTAL PAID */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Tổng số tiền"
          required
          subtitle="Nhập tổng số tiền"
          value={formData.totalPaid}
          error={formData.totalPaidError.hasError}
          errorLabel={formData.totalPaidError.label}
          onChange={(value) => handleInputChange("totalPaid", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
      </Grid>

      {/* IS COMPANY COVER */}
      <Grid item xs={12} lg={6}>
        <CheckForm
          required
          title="Bảo Hiểm Công Ty"
          checked={formData.isCompanyCover}
          onChange={(e) =>
            handleInputChange("isCompanyCover", e.target.checked)
          }
        />
      </Grid>

      {/* END DATE */}
      <Grid item xs={12} lg={6}>
        <DateForm
          datetime
          title="Ngày kết thúc"
          titleSpan={6}
          fieldSpan={6}
          subtitle="Ngày hoàn thành công việc"
          value={formData.endDate}
          error={formData.endDateError.hasError}
          errorLabel={formData.endDateError.label}
          onChange={(value) => handleInputChange("endDate", value)}
        ></DateForm>
      </Grid>

      {/* NOTE */}
      <Grid item xs={12} lg={12}>
        <TextForm
          fullWidth
          multiline
          title="Ghi chú"
          subtitle="Nhập ghi chú cho thanh toán"
          value={formData.note}
          error={formData.noteError.hasError}
          errorLabel={formData.noteError.label}
          onChange={(e) => handleInputChange("note", e.target.value)}
        ></TextForm>
      </Grid>

      {/* CONFIRMATION DOCUMENT */}
      <Grid item xs={12} lg={12}>
        <FileForm
          fullWidth
          title="Tài Liệu Xác Nhận"
          subtitle="Chọn tệp"
          titleSpan={3}
          fieldSpan={9}
          value={formData.confirmationDocument}
          error={formData.confirmationDocumentError.hasError}
          errorLabel={formData.confirmationDocumentError.label}
          onChange={(file) =>
            handleInputChange("confirmationDocument", file)
          }
        ></FileForm>
      </Grid>
    </FormModal>
  );
}
