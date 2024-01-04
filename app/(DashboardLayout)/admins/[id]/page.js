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
import checkValidField from "/components/validations/field"
import checkValidEmail from "/components/validations/email"

import {
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "/services/adminServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import adminStatusOptions from "/constants/enums/adminStatus";
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
    status: "",
    statusError: { hasError: false, label: "" },
    creatorId: "0a93a6c1-8267-4d60-8c6d-c8e25c8f8f22",
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "username":
      case "password":
        const result = checkValidField(value);

        if (result.isValid == false)
        {
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
  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchAdmin = async () => {
      try {
        const response = await getAdminById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'quản lý' từ hệ thống");
      }
    };
    await Promise.all([fetchAdmin()]);
    setLoading(false);
  };

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateAdmin(params.id, transformedValue);
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteAdmin(params.id);
      console.log(response);
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
    fetchDataFromApi();
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
            subtitle="Nhập username quản lý"
            value={formData.username}
            error={formData.usernameError.hasError}
            errorLabel={formData.usernameError.label}
            onChange={(e) => handleInputChange("username", e.target.value)}
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

        {/* MẬT KHẨU */}
        <Grid item xs={12} lg={6}>
          <TextForm
            title="Mật khẩu"
            required
            subtitle="Nhập mật khẩu"
            value={formData.password}
            error={formData.passwordError.hasError}
            errorLabel={formData.passwordError.label}
            onChange={(e) => handleInputChange("password", e.target.value)}
          ></TextForm>
        </Grid>

        {/* STATUS */}
        <Grid item xs={12} lg={6}>
          <SelectForm
            title="Trạng thái"
            required
            subtitle="Chọn trạng thái"
            value={formData.status}
            options={adminStatusOptions}
            error={formData.statusError?.hasError}
            errorLabel={formData.statusError.label}
            onChange={(value) => handleInputChange("status", value)}
          ></SelectForm>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
