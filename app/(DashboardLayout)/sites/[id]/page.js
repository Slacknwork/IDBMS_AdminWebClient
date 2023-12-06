"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getSiteById, updateSite, deleteSiteById } from "/api/siteServices";

import UserCard from "/components/shared/UserCard";
import TextForm from "/components/shared/Forms/Text";
import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";

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
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    // Handle error here
    switch (field) {
      case "name":
      case "address":
      // add more cases as needed
      default:
        handleInputError(field, false, "");
    }
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  // FETCH DATA FROM API
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setLoading(true);
        const data = await getSiteById(params.id);
        console.log(data);
        setFormData((prevData) => ({
          ...prevData,
          ...data,
        }));
        setPageName(data?.name);
        setPageDescription(data?.pageDescription);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    fetchDataFromApi();
  }, [params.id]);

  const onSaveSite = async () => {
    try {
      await updateSite(params.id, formData);
      toast.success("Cập nhật thành công!");
      setPageName(formData?.name);
      setPageDescription(formData?.description);
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

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DetailsPage
        sx={{ mt: 0 }}
        title="Thông tin khu công trình"
        saveMessage="Lưu thông khu công trình?"
        deleteMessage="Xóa khu công trình?"
        onSave={onSaveSite}
        onDelete={onDeleteSite}
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
              name={formData.contactName}
              email={formData.contactEmail}
              phone={formData.contactPhone}
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
