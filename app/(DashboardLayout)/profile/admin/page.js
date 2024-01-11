"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getAdminById, updateAdmin } from "/services/adminServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import SelectForm from "/components/shared/Forms/Select";
import checkValidField from "/components/validations/field";
import checkValidEmail from "/components/validations/email";

export default function TaskCategoryDetails() {
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    username: "",
    usernameError: { hasError: false, label: "" },
    email: "",
    emailError: { hasError: false, label: "" },
    password: "",
    passwordError: { hasError: false, label: "" },
    creatorId: "0a93a6c1-8267-4d60-8c6d-c8e25c8f8f22",
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "password":
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
      case "email":
        const validEmail = checkValidEmail(value);

        if (validEmail.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validEmail.label,
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
      default:
    }
  };

  // INIT CONST
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchAdmin = async () => {
    try {
      const response = await getAdminById(user.id);
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
    try {
      await updateAdmin(user.id, transformedValue);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
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
    <PageContainer title={formData.name} description="Thông tin cá nhân">
      <DetailsPage
        title="Thông tin cá nhân"
        saveMessage="Lưu thông tin?"
        onSave={handleSubmit}
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
