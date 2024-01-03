"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import { createSite } from "/services/siteServices";
import checkValidField from "/components/validations/field"
import checkValidEmail from "/components/validations/email"
import checkValidPhone from "/components/validations/phone"

export default function CreateSiteModal({ onCreate }) {
  // CONSTANTS
  const modalOpenQuery = "createSite";
  const contactNameQuery = "contactName";
  const contactLocationQuery = "contactLocation";
  const contactPhoneQuery = "contactPhone";
  const contactEmailQuery = "contactEmail";

  // INIT
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    address: "",
    addressError: { hasError: false, label: "" },
    contactName: "",
    contactNameError: { hasError: false, label: "" },
    contactLocation: "",
    contactLocationError: { hasError: false, label: "" },
    contactPhone: "",
    contactPhoneError: { hasError: false, label: "" },
    contactEmail: "",
    contactEmailError: { hasError: false, label: "" },
    companyCode: "",
    companyCodeError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "address":
      case "contactName":
      case "contactLocation":
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
      case "contactPhone":
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
      case "contactEmail":
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

  // SUBMIT FORM
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleCreate = async () => {
    if (!switchSubmit) return;
    try {
      const response = await createSite(formData);
      toast.success("Thêm thành công!");
      router.push(`/sites/${response.id}`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
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

  // ON MOUNTED
  useEffect(() => {
    const handleQueryParam = (param, queryParam) => {
      if (queryParam !== null) {
        handleInputChange(param, queryParam);
      }
    };

    handleQueryParam(contactNameQuery, searchParams.get(contactNameQuery));
    handleQueryParam(
      contactLocationQuery,
      searchParams.get(contactLocationQuery)
    );
    handleQueryParam(contactPhoneQuery, searchParams.get(contactPhoneQuery));
    handleQueryParam(contactEmailQuery, searchParams.get(contactEmailQuery));
  }, []);

  return (
    <FormModal
      isOpen={searchParams.get(modalOpenQuery) ?? false}
      buttonLabel="Tạo"
      title="Tạo khu công trình"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit={formHasError}
    >
      {/* NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          spacing={5}
          title="Tên"
          required
          subtitle="Tên khu công trình"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </Grid>

      {/* CONTACT NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Đại diện"
          required
          subtitle="Họ và tên người đại diện"
          value={formData.contactName}
          error={formData.contactNameError.hasError}
          errorLabel={formData.contactNameError.label}
          onChange={(e) => handleInputChange("contactName", e.target.value)}
        />
      </Grid>

      {/* ADDRESS */}
      <Grid item xs={12} lg={6}>
        <TextForm
          spacing={5}
          title="Địa chỉ"
          required
          subtitle="Địa chỉ công trình"
          value={formData.address}
          error={formData.addressError.hasError}
          errorLabel={formData.addressError.label}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
      </Grid>

      {/* CONTACT EMAIL */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Email"
          required
          subtitle="Email liên hệ"
          value={formData.contactEmail}
          error={formData.contactEmailError.hasError}
          errorLabel={formData.contactEmailError.label}
          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
        />
      </Grid>

      {/* CONTACT LOCATION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          spacing={5}
          title="Địa chỉ liên hệ"
          required
          subtitle="Địa chỉ liên hệ với người đại diện"
          value={formData.contactLocation}
          error={formData.contactLocationError.hasError}
          errorLabel={formData.contactLocationError.label}
          onChange={(e) => handleInputChange("contactLocation", e.target.value)}
        />
      </Grid>

      {/* CONTACT PHONE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Số điện thoại"
          required
          subtitle="Nhập số điện thoại liên hệ"
          value={formData.contactPhone}
          error={formData.contactPhoneError.hasError}
          errorLabel={formData.contactPhoneError.label}
          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
        />
      </Grid>

      {/* COMPANY CODE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          spacing={5}
          title="Mã công ty"
          subtitle="Mã số doanh nghiệp"
          value={formData.companyCode}
          error={formData.companyCodeError.hasError}
          errorLabel={formData.companyCodeError.label}
          onChange={(e) => handleInputChange("companyCode", e.target.value)}
        />
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          multiline
          rows={4}
          titleSpan={2}
          fieldSpan={10}
          title="Mô tả"
          subtitle="Mô tả chi tiết"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </Grid>
    </FormModal>
  );
}
