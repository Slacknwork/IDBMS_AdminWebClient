"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import { createAdmin } from "/services/adminServices";
import checkValidField from "/components/validations/field"
import checkValidEmail from "/components/validations/email"
import { useSelector } from "react-redux";

export default function CreateAdminModal({ success }) {
  const params = useParams();
  const admin = useSelector((state) => state.user);
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    email: "",
    emailError: { hasError: false, label: "" },
    password: "",
    passwordError: { hasError: false, label: "" },
    creatorId: admin?.id || "",
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
      case "password":
        result = checkValidField({
          value: value,
          minLength: 6,
          maxLength: 20,
          required: true
        });

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

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: {
        hasError: !result.isValid,
        label: result.label,
      },
    }));
  };

  // SUBMIT FORM
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
    try {
      const response = await createAdmin(formData);
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
      title="Tạo người quản lý"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
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
          password={true}
        ></TextForm>
      </Grid>

    </FormModal>
  );
}
