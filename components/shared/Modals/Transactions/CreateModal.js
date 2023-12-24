"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {createTransaction} from "../../../../api/transactionServices";
import {getAllUsers} from "../../../../api/userServices";
import {getAllWarrantyClaims} from "../../../../api/warrantyClaimServices";

import transactionTypeOptions from "../../../../constants/enums/transactionType";
import transactionStatusOptions from "../../../../constants/enums/transactionStatus";
import AutocompleteForm from "../../Forms/Autocomplete";
import SelectForm from "../../Forms/Select";
import FileForm from "../../Forms/File";
import TextForm from "../../Forms/Text";
import NumberForm from "../../Forms/Text";
import FormModal from "../../Modals/Form";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

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

  const userList = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Smith" },
    // Add more users as needed
  ];

  const warrantyClaimList = [
    { id: 1, name: "Extended Warranty" },
    { id: 2, name: "Manufacturer's Warranty" },
    { id: 3, name: "Limited Lifetime Warranty" },
    { id: 4, name: "Accidental Damage Protection" },
    // Add more warranty claims as needed
  ];

  const params = useParams();

  const [formData, setFormData] = useState({
    type: "",
    typeError: { hasError: false, label: "" },
    amount: 0,
    amountError: { hasError: false, label: "" },
    note: "",
    noteError: { hasError: false, label: "" },
    payerName: "",
    payerNameError: { hasError: false, label: "" },
    userId: "",
    userIdError: { hasError: false, label: "" },
    warrantyClaimId: "",
    warrantyClaimIdError: { hasError: false, label: "" },
    ProjectId: params.id,
    status: "",
    statusError: { hasError: false, label: "" },
    transactionReceiptImage: null,
    transactionReceiptImageError: { hasError: false, label: "" },
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
    if (field === "user") {
        users.forEach((user) => {
        if (user.id === selectedOption) selectedOption = user.name
        });
        handleInputChange("payerName", selectedOption)
    };
  };

  const handleFileInputChange = (file) => {
    handleInputChange("transactionReceiptImage", file);
  };

  const handleCheckboxChange = (fieldName, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: !formData[fieldName],
    }));
  };

  const handleCreate = async () => {
    console.log(formData)
    try {
        const response = await createTransaction(formData);
        toast.success("Thêm thành công!");
        console.log(response)
    } catch (error) {
        console.error("Error :", error);
        toast.error("Lỗi!");
    }
};

const [loading, setLoading] = useState(true);
const [users, setUsers] = useState([]);
const [warrantyClaims, setWarrantyClaims] = useState([]);

// FETCH OPTIONS
const fetchOptionsFromApi = async () => {
    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            console.log(response);
            setUsers(response.list || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
    };
    const fetchWarrantyClaims = async () => {
        try {
            const response = await getAllWarrantyClaims();
            console.log(response);
            setWarrantyClaims(response.list || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
    };
    await Promise.all([
      fetchUsers(),
      fetchWarrantyClaims(),
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
            {/* TYPE */}
            <Grid item xs={12} lg={6}>
                  <SelectForm
                    title="Kiểu thanh toán"
                    subtitle="Chọn kiểu thanh toán"
                    value={formData.type}
                    options={transactionTypeOptions}
                    error={formData.typeError.hasError}
                    errorLabel={formData.typeError.label}
                    onChange={(value) => handleInputChange("type", value)}
                    ></SelectForm>
            </Grid>

            {/* AMOUNT */}
            <Grid item xs={12} lg={6}>
                <NumberForm
                    title="Số tiền"
                    required
                    subtitle="Nhập số tiền"
                    value={formData.amount}
                    error={formData.amountError.hasError}
                    errorLabel={formData.amountError.label}
                    onChange={(e) => handleNumberChange("amount", e.target.value)}
                    endAdornment={<>VND</>}
                ></NumberForm>
            </Grid>

            {/* USER */}
            <Grid item xs={12} lg={6}>
                  <AutocompleteForm
                    title="Người dùng"
                    subtitle="Chọn người dùng"
                    value={formData.userId}
                    options={users}
                    error={formData.userIdError.hasError}
                    errorLabel={formData.userIdError.label}
                    onChange={(value) => handleAutocompleteChange("user", value)}
                ></AutocompleteForm>
            </Grid>

            

            {/* PAYER NAME */}
            <Grid item xs={12} lg={6}>
                  <TextForm
                    title="Tên người trả tiền"
                    required
                    subtitle="Nhập tên người trả tiền"
                    value={formData.payerName}
                    error={formData.payerNameError.hasError}
                    errorLabel={formData.payerNameError.label}
                    onChange={(e) => handleInputChange("payerName", e.target.value)}
                ></TextForm>
            </Grid>

            {/* WARRANTY CLAIM */}
            <Grid item xs={12} lg={6}>
                  <AutocompleteForm
                    title="Bảo hiểm"
                    subtitle="Chọn bảo hiểm"
                    value={formData.warrantyClaimId}
                    options={warrantyClaims}
                    error={formData.warrantyClaimIdError.hasError}
                    errorLabel={formData.warrantyClaimIdError.label}
                    onChange={(value) => handleAutocompleteChange("warrantyClaimId", value)}
                ></AutocompleteForm>
            </Grid>

            {/* STATUS */}
            <Grid item xs={12} lg={6}>
                <SelectForm
                    title="Trạng thái"
                    subtitle="Chọn trạng thái"
                    value={formData.status}
                    options={transactionStatusOptions}
                    error={formData.statusError.hasError}
                    errorLabel={formData.statusError.label}
                    onChange={(value) => handleInputChange("status", value)}
                ></SelectForm>
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

            {/* TRANSACTION RECEIPT IMAGE */}
            <Grid item xs={12} lg={12}>
                  <FileForm 
                  fullWidth
                  title="Ảnh hoá đơn"
                  required
                  subtitle="Chọn tệp"
                  titleSpan={3}
                  fieldSpan={9}
                  value={formData.transactionReceiptImage}
                  error={formData.transactionReceiptImageError.hasError}
                  errorLabel={formData.transactionReceiptImageError.label}
                  onChange={(file) => handleInputChange("transactionReceiptImage", file)}
                  ></FileForm>
            </Grid>
    </FormModal>
  );
}
