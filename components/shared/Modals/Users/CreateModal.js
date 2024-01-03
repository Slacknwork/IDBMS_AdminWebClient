"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import SelectForm from "/components/shared/Forms/Select";
import { createUser } from "/services/userServices";

import languageOptions from "/constants/enums/language";
import companyRoleOptions from "/constants/enums/companyRole";
import checkValidField from "/components/validations/field"
import checkValidEmail from "/components/validations/email"
import checkValidPhone from "/components/validations/phone"

export default function CreateUserModal({ success }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    jobPosition: "",
    companyName: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: null,
    language: 0,
    nameError: { hasError: false, label: "" },
    bioError: { hasError: false, label: "" },
    jobPositionError: { hasError: false, label: "" },
    companyNameError: { hasError: false, label: "" },
    addressError: { hasError: false, label: "" },
    emailError: { hasError: false, label: "" },
    passwordError: { hasError: false, label: "" },
    phoneError: { hasError: false, label: "" },
    dateOfBirthError: { hasError: false, label: "" },
    languageError: { hasError: false, label: "" },
    role: 0,
    roleError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "address":
      case "password":
      case "language":
      case "role":
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
      case "phone":
        const validPhone = checkValidPhone(value);

        if (validPhone.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validPhone.label,
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
      case "bio":
      case "jobPosition":
      case "companyName":
      case "dateOfBirth":
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
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };
  
  const handleCreate = async () => {
    console.log(formData);
    try {
      const response = await createUser(formData);
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

    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo người dùng"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit={formHasError}
    >
      {/* NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên"
          required
          subtitle="Nhập tên người dùng"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/* BIO */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tiểu sử"
          subtitle="Nhập tiểu sử người dùng"
          value={formData.bio}
          error={formData.bioError.hasError}
          errorLabel={formData.bioError.label}
          onChange={(e) => handleInputChange("bio", e.target.value)}
        ></TextForm>
      </Grid>

      {/* JOB POSITION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Vị trí công việc"
          subtitle="Nhập vị trí công việc"
          value={formData.jobPosition}
          error={formData.jobPositionError.hasError}
          errorLabel={formData.jobPositionError.label}
          onChange={(e) => handleInputChange("jobPosition", e.target.value)}
        ></TextForm>
      </Grid>

      {/* COMPANY NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên công ty"
          subtitle="Nhập tên công ty"
          value={formData.companyName}
          error={formData.companyNameError.hasError}
          errorLabel={formData.companyNameError.label}
          onChange={(e) => handleInputChange("companyName", e.target.value)}
        ></TextForm>
      </Grid>

      {/* ADDRESS */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Địa chỉ"
          required
          subtitle="Nhập địa chỉ người dùng"
          value={formData.address}
          error={formData.addressError.hasError}
          errorLabel={formData.addressError.label}
          onChange={(e) => handleInputChange("address", e.target.value)}
        ></TextForm>
      </Grid>

      {/* EMAIL */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Email"
          required
          subtitle="Nhập địa chỉ email"
          value={formData.email}
          error={formData.emailError.hasError}
          errorLabel={formData.emailError.label}
          onChange={(e) => handleInputChange("email", e.target.value)}
        ></TextForm>
      </Grid>

      {/* PASSWORD */}
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

      {/* PHONE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Số điện thoại"
          required
          subtitle="Nhập số điện thoại"
          value={formData.phone}
          error={formData.phoneError.hasError}
          errorLabel={formData.phoneError.label}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        ></TextForm>
      </Grid>

      {/* DATE OF BIRTH */}
      <Grid item xs={12} lg={6}>
        <DateForm
          title="Ngày sinh"
          subtitle="Nhập ngày sinh"
          value={formData.dateOfBirth}
          error={formData.dateOfBirthError.hasError}
          errorLabel={formData.dateOfBirthError.label}
          onChange={(value) => handleInputChange("dateOfBirth", value)}
        ></DateForm>
      </Grid>

      {/* LANGUAGE */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Ngôn ngữ"
          required
          subtitle="Chọn ngôn ngữ"
          value={formData.language}
          options={languageOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.languageError.hasError}
          errorLabel={formData.languageError.label}
          onChange={(value) => handleInputChange("language", value)}
        ></SelectForm>
      </Grid>

      {/* COMPANY ROLE */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Vai trò trong công ty"
          required
          subtitle="Chọn vai trò"
          value={formData.role}
          options={companyRoleOptions}
          defaultLabel="Chọn một..."
          error={formData.roleError.hasError}
          errorLabel={formData.roleError.label}
          onChange={(value) => handleInputChange("role", value)}
        ></SelectForm>
      </Grid>
    </FormModal>
  );
}
