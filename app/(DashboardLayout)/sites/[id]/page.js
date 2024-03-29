"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getSiteById,
  updateSite,
  deleteSiteById,
} from "/services/siteServices";

import UserCard from "/components/shared/UserCard";
import TextForm from "/components/shared/Forms/Text";
import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import checkValidField from "/components/validations/field";
import checkValidEmail from "/components/validations/email";
import checkValidPhone from "/components/validations/phone";

export default function SiteDetails() {
  const params = useParams();
  const router = useRouter();

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
    let result = { isValid: true, label: "" }

    switch (field) {
      case "name":
      case "contactName":
        result = checkValidField({
          value: value,
          maxLength: 50,
          required: true
        });

        break;
      case "address":
      case "contactLocation":
        result = checkValidField({
          value: value,
          maxLength: 750,
          required: true
        });

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
      case "companyCode":
        result = checkValidField({
          value: value,
          maxLength: 50,
        });

        break;
      case "description":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

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

  // FETCH DATA FROM API
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchSite = async () => {
      try {
        const data = await getSiteById(params.id);
        console.log(data);
        setFormData((prevData) => ({
          ...prevData,
          ...data,
        }));
        setPageName(data?.name);
        setPageDescription(data?.pageDescription);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Địa điểm' từ hệ thống");
      }
    };
    await Promise.all([fetchSite()]);
    setLoading(false);
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);
  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const onSaveSite = async () => {
    try {
      await updateSite(params.id, formData);
      toast.success("Cập nhật thành công!");
      setPageName(formData?.name);
      setPageDescription(formData?.description);
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const onDeleteSite = async () => {
    try {
      await deleteSiteById(params.id);
      toast.success("Xóa thành công!");
      router.push(`/sites`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
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

    onSaveSite();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DetailsPage
        loading={loading}
        title="Thông tin khu công trình"
        saveMessage="Lưu thông khu công trình?"
        onSave={handleSubmit}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <TextForm
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
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Tên người đại diện"
                required
                subtitle="Nhập họ và tên người đại diện"
                value={formData.contactName}
                error={formData.contactNameError.hasError}
                errorLabel={formData.contactNameError.label}
                onChange={(e) =>
                  handleInputChange("contactName", e.target.value)
                }
              />
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Địa chỉ"
                required
                subtitle="Nhập địa chỉ công trình"
                value={formData.address}
                error={formData.addressError.hasError}
                errorLabel={formData.addressError.label}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </Grid>

            {/* CONTACT EMAIL */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Email"
                required
                subtitle="Nhập email liên hệ"
                value={formData.contactEmail}
                error={formData.contactEmailError.hasError}
                errorLabel={formData.contactEmailError.label}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
              />
            </Grid>

            {/* CONTACT LOCATION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Địa chỉ liên hệ"
                required
                subtitle="Nhập địa chỉ liên hệ với người đại diện"
                value={formData.contactLocation}
                error={formData.contactLocationError.hasError}
                errorLabel={formData.contactLocationError.label}
                onChange={(e) =>
                  handleInputChange("contactLocation", e.target.value)
                }
              />
            </Grid>

            {/* CONTACT PHONE */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Số điện thoại"
                required
                subtitle="Nhập số điện thoại liên hệ"
                value={formData.contactPhone}
                error={formData.contactPhoneError.hasError}
                errorLabel={formData.contactPhoneError.label}
                onChange={(e) =>
                  handleInputChange("contactPhone", e.target.value)
                }
              />
            </Grid>

            {/* COMPANY CODE */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Mã công ty"
                subtitle="Nhập mã số doanh nghiệp của công ty"
                value={formData.companyCode}
                error={formData.companyCodeError.hasError}
                errorLabel={formData.companyCodeError.label}
                onChange={(e) =>
                  handleInputChange("companyCode", e.target.value)
                }
              />
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                multiline
                rows={4}
                title="Mô tả"
                subtitle="Mô tả chi tiết"
                value={formData.description}
                error={formData.descriptionError.hasError}
                errorLabel={formData.descriptionError.label}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card
            variant="outlined"
            sx={{ p: 3, border: 1, borderColor: "gray" }}
          >
            <Typography variant="h5" sx={{ my: "auto" }}>
              Thông tin liên hệ
            </Typography>
            <UserCard
              sx={{ mt: 2 }}
              name={formData?.contactName || "Không tìm thấy"}
              email={formData?.contactEmail || "..."}
              phone={formData?.contactPhone || "..."}
            ></UserCard>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Box sx={{ my: "auto", mx: 2 }}>
                <Typography variant="h8">{formData.contactLocation}</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
