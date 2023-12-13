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
import {createWarrantyClaim} from "../../../../api/warrantyClaimServices";
import {getAllUsers} from "../../../../api/userServices";

import AutocompleteForm from "../../Forms/Autocomplete";
import DateForm from "../../Forms/Date";
import FileForm from "../../Forms/File";
import TextForm from "../../Forms/Text";
import NumberForm from "../../Forms/Text";
import CheckForm from "../../Forms/Checkbox";
import FormModal from "../../Modals/Form";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";

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

export default function CreateTransactionModal({ children }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const params = useParams();

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
    userId: "",
    userIdError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" },
    }));
    handleInputError(field, false, "");
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

   const handleNumberChange = (field, value) => {
    const val = parseFloat(value);
    if (!isNaN(val)) handleInputChange(field, val);
    else handleInputChange(field, "");
  };

  const handleAutocompleteChange = (field, selectedOption) => {
    handleInputChange(field, selectedOption);
    if (field === "userId") {
        users.forEach((user) => {
        if (user.id === selectedOption) selectedOption = user.name
        });
        handleInputChange("payerName", selectedOption)
    };
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: checked,
    }));
  };

  const handleFileInputChange = (file) => {
    handleInputChange("confirmationDocument", file);
  };

  const handleCreate = async () => {
    console.log(formData)
    try {
        const response = await createWarrantyClaim(formData);
        toast.success("Thêm thành công!");
        console.log(response)
    } catch (error) {
        console.error("Error :", error);
        toast.error("Lỗi!");
    }
};

const [loading, setLoading] = useState(true);
const [users, setUsers] = useState([]);

// FETCH OPTIONS
const fetchOptionsFromApi = async () => {
    const fetchProjectDocumentTemplates = async () => {
        try {
            const response = await getAllUsers();
            console.log(response);
            setUsers(response.list || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
    };
    await Promise.all([
        fetchProjectDocumentTemplates(),
    ]);
    setLoading(false);
};

useEffect(() => {
    fetchOptionsFromApi();
}, []);

  return (
    <FormModal
    buttonLabel="Tạo"
    title="Tạo tài liệu"
    submitLabel="Tạo"
    onSubmit={handleCreate}
    size="big"
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

            {/* USER */}
            <Grid item xs={12} lg={6}>
                  <AutocompleteForm
                    required
                    title="Người bảo hiểm"
                    subtitle="Chọn người dùng"
                    value={formData.userId}
                    options={users}
                    error={formData.userIdError.hasError}
                    errorLabel={formData.userIdError.label}
                    onChange={(value) => handleAutocompleteChange("userId", value)}
                ></AutocompleteForm>
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
                    onChange={(e) => handleNumberChange("totalPaid", e.target.value)}
                    endAdornment={<>VND</>}
                ></NumberForm>
            </Grid>

            {/* IS COMPANY COVER */}
            <Grid item xs={12} lg={6}>
                <CheckForm
                  title="Bảo Hiểm Công Ty"
                  checked={formData.isCompanyCover}
                  onChange={(e) =>
                  handleCheckboxChange("isCompanyCover", e.target.checked)
                  }
                />
            </Grid>

            {/* END DATE */}
            <Grid item xs={12} lg={12}>
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
                    error={formData.note.hasError}
                    errorLabel={formData.note.label}
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
                  onChange={(file) => handleFileInputChange("confirmationDocument", file)}
                  ></FileForm>
            </Grid>

    </FormModal>
  );
}
