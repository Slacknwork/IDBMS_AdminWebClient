"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import SelectForm from "/components/shared/Forms/Select";
import checkValidField from "/components/validations/field";
import checkValidEmail from "/components/validations/email";

import {
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "/services/adminServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";

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

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [parentCategories, setParentCategories] = useState([]);

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
    <PageContainer title={formData.name} description="Chi tiết loại sản phẩm">
      <DetailsPage
        title="Thông tin người quản lý"
        saveMessage="Lưu thông tin người quản lý?"
        onSave={handleSubmit}
        deleteMessage={"Xoá người quản lý?"}
        deleteLabel={"Xoá"}
        hasDelete
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
