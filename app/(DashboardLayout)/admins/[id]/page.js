"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import checkValidField from "/components/validations/field";
import checkValidEmail from "/components/validations/email";

import {
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "/services/adminServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function TaskCategoryDetails() {
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    username: "",
    usernameError: { hasError: false, label: "" },
    email: "",
    emailError: { hasError: false, label: "" },
    creatorId: "",
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

        break;
      case "email":
        result = checkValidEmail(value);

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

  const params = useParams();
  const router = useRouter();
  const user = useSelector((state) => state.user);

  // INIT CONST
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchAdmin = async () => {
    try {
      const response = await getAdminById(params.id);
      setFormData((prevData) => ({ ...prevData, ...response }));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu 'Quản lý' từ hệ thống");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchAdmin()]);
    setLoading(false);
  };

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      await updateAdmin(params.id, transformedValue);
      toast.success("Cập nhật thành công!");
      await fetchData();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteAdmin(params.id);
      toast.success("Xoá thành công!");
      router.push("/admins");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
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

  useEffect(() => {
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    handleSave();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title={formData.name} description="Chi tiết loại sản phẩm">
      <DetailsPage
        title="Thông tin người quản lý"
        saveMessage="Lưu thông tin người quản lý?"
        onSave={handleSubmit}
        deleteMessage={"Xoá người quản lý?"}
        deleteLabel={"Xoá"}
        hasDelete={user.id !== formData.id}
        onDelete={handleDelete}
        loading={loading}
      >
        {/* TÊN */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Họ và Tên"
            required
            subtitle="Nhập họ và tên quản lý"
            value={formData.name}
            error={formData.nameError.hasError}
            errorLabel={formData.nameError.label}
            onChange={(e) => handleInputChange("name", e.target.value)}
          ></TextForm>
        </Grid>

        {/* TÊN ĐĂNG NHẬP */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Tên đăng nhập"
            required
            subtitle="Username quản lý"
            value={formData.username}
            error={formData.usernameError.hasError}
            errorLabel={formData.usernameError.label}
            onChange={(e) => handleInputChange("username", e.target.value)}
            disabled
          ></TextForm>
        </Grid>

        {/* EMAIL */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Email"
            required
            subtitle="Nhập email"
            value={formData.email}
            error={formData.emailError.hasError}
            errorLabel={formData.emailError.label}
            onChange={(e) => handleInputChange("email", e.target.value)}
          ></TextForm>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
