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
import { createTransaction } from "../../../../services/transactionServices";
import { getAllUsers } from "../../../../services/userServices";
import { getAllWarrantyClaims } from "../../../../services/warrantyClaimServices";

import transactionTypeOptions from "../../../../constants/enums/transactionType";
import transactionStatusOptions from "../../../../constants/enums/transactionStatus";
import AutocompleteForm from "../../Forms/Autocomplete";
import SelectForm from "../../Forms/Select";
import FileForm from "../../Forms/File";
import TextForm from "../../Forms/Text";
import NumberForm from "../../Forms/Number";
import FormModal from "../../Modals/Form";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
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

export default function CreateTransactionModal({ success }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
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
    ProjectId: params.id,
    status: 0,
    statusError: { hasError: false, label: "" },
    transactionReceiptImage: null,
    transactionReceiptImageError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "type":
      case "amount":
      case "payerName":
      case "status":
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
      case "transactionReceiptImage":
        const validFile = checkValidUrl(value);
        if (validFile.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validFile.label,
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
      case "note":
      case "userId":
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
      const response = await createTransaction(formData);
      toast.success("Thêm thành công!");
      console.log(response);
      success(true);
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
    await Promise.all([fetchUsers(), fetchWarrantyClaims()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
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
      title="Tạo tài liệu"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
    >
      {/* TYPE */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          required
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
          onChange={(value) => handleInputChange("amount", value)}
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
          onChange={(value) => handleInputChange("user", value)}
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

      {/* STATUS */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          required
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
          error={formData.noteError.hasError}
          errorLabel={formData.noteError.label}
          onChange={(e) => handleInputChange("note", e.target.value)}
        ></TextForm>
      </Grid>

      {/* TRANSACTION RECEIPT IMAGE */}
      <Grid item xs={12} lg={12}>
        <FileForm
          fullWidth
          title="Ảnh hoá đơn"
          subtitle="Chọn tệp"
          titleSpan={3}
          fieldSpan={9}
          value={formData.transactionReceiptImage}
          error={formData.transactionReceiptImageError.hasError}
          errorLabel={formData.transactionReceiptImageError.label}
          onChange={(file) =>
            handleInputChange("transactionReceiptImage", file)
          }
        ></FileForm>
      </Grid>
    </FormModal>
  );
}
