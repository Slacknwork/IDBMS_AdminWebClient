"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import languageOptions from "/constants/enums/language";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import SelectForm from "/components/shared/Forms/Select";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import FileForm from "/components/shared/Forms/File";
import projectTypeOptions from "/constants/enums/projectType";
import interiorItemTypeOptions from "/constants/enums/interiorItemType";

import {
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "/api/transactionServices";
import {getAllUsers} from "/api/userServices";
import {getAllWarrantyClaims} from "/api/warrantyClaimServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import colorTypeOptions from "/constants/enums/colorType";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import transactionTypeOptions from "/constants/enums/transactionType";
import transactionStatusOptions from "/constants/enums/transactionStatus";

export default function TransactionDetails() {
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
    handleInputChange(field, val);
    if (!isNaN(val)) handleInputChange(field, val);
    else handleInputChange(field, "");
    console.log(value);
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const [parentCategories, setParentCategories] = useState([]);

  // INIT CONST
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [warrantyClaims, setWarrantyClaims] = useState([]);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true)
    const fetchTransactions = async () => {
      try {
        const response = await getTransactionById(params.transactionId);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'loại sản phẩm' từ hệ thống");
      }
    };
    const fetchUsers = async () => {
      try {
        const items = await getAllUsers({});
        setParentCategories(items.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Người dùng");
        console.log(error);
      }
    };
    const fetchWarrantyClaims = async () => {
      try {
        const items = await getAllWarrantyClaims({});
        setParentCategories(items.list);
      } catch (error) {
        toast.error("Lỗi dữ liệu: Bảo hiểm");
        console.log(error);
      }
    };
    await Promise.all([
      fetchTransactions(),
      fetchUsers(),
      fetchWarrantyClaims(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateTransaction(params.transactionId, transformedValue);
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi()
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteTransaction(
        params.transactionId
      );
      console.log(response);
      toast.success("Xoá thành công!");
      router.push(`/projects/${params.id}/transactions`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const transformData = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === null) {
        result[key] = "";
      }
    }

    return result;
  };

  return (
    <PageContainer title={formData.name} description="Chi tiết thanh toán">
      <DetailsPage
        title="Thông tin thanh toán"
        saveMessage="Lưu thông tin cho thanh toán?"
        onSave={handleSave}
        deleteMessage={"Xoá thanh toán này?"}
        deleteLabel={"Xoá"}
        hasDelete
        onDelete={handleDelete}
        loading={loading}
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
              title="Ngân sách tối thiểu"
              required
              subtitle="Nhập số tiền tối thiểu"
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
      </DetailsPage>
    </PageContainer>
  );
}
