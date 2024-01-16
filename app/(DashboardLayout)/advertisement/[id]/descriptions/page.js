"use client";

import { useParams } from "next/navigation";
import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAdvertisementProjectById,
  updateAdvertisementProjectDescription,
} from "/services/advertisementServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import RichTextForm from "/components/shared/Forms/RichText";
import FileForm from "/components/shared/Forms/File";
import UserCard from "/components/shared/UserCard";
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

export default function AdvertisementDetailsPage() {
  const params = useParams();

  const [formData, setFormData] = useState({
    advertisementDescription: "",
    advertisementDescriptionError: { hasError: false, label: "" },
    englishAdvertisementDescription: "",
    englishAdvertisementDescriptionError: { hasError: false, label: "" },
    representImage: null,
    representImageError: { hasError: false, label: "" },
    representImageUrl: "",
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Không thể để trống" : "";
      // Add validation for other fields as needed
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    let result = { isValid: true, label: "" }

    switch (field) {
      
      case "advertisementDescription":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
      case "englishAdvertisementDescription":
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

  // GET SITE DETAILS
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  // CONTACT
  const contactLabel = "Thông tin liên hệ chủ dự án";
  const priceLabel = "Tổng quan";

  const [loading, setLoading] = useState(true);
  const [projectOwner, setProjectOwner] = useState("");

  const fetchDataFromApi = async () => {
    setLoading(true);
    try {
      const projectResponse = await getAdvertisementProjectById(params.id);
      const project = projectResponse;
      setFormData((prevData) => ({ ...prevData, ...project }));
      setPageName(project.name);
      setPageDescription(project.description);
      const participation = project?.projectParticipations.find(
        (par) => par.role === 0
      );
      setProjectOwner(participation?.user ?? "");
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu 'Dự án' từ hệ thống");
    } finally {
      setLoading(false);
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

  const onSaveAdvertisementProject = async () => {
    try {
      await updateAdvertisementProjectDescription(params.id, formData);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
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

    onSaveAdvertisementProject();
    setSwitchSubmit(false);
  }, [switchSubmit]);


  

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DetailsPage
        loading={loading}
        title="Mô tả dự án"
        saveMessage="Lưu thông tin mô tả dự án?"
        onSave={handleSubmit}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {/* REPRESENT IMAGE */}
            <Grid item xs={12} lg={12}>
              <FileForm
                title="Hình ảnh"
                titleSpan={2}
                fieldSpan={10}
                subtitle="Chọn hình ảnh minh họa"
                value={formData.representImage}
                imgDisplay={formData.representImageUrl}
                error={formData.representImageError.hasError}
                errorLabel={formData.representImageError.label}
                onChange={(file) => handleInputChange("representImage", file)}
              ></FileForm>
            </Grid>

            {/* ADVERTISEMENT DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <RichTextForm
                title="Mô tả tiếng Việt"
                titleSpan={2}
                fieldSpan={10}
                subtitle="Mô tả dự án viết bằng tiếng Việt"
                value={formData.advertisementDescription}
                error={formData.advertisementDescriptionError.hasError}
                errorLabel={formData.advertisementDescriptionError.label}
                onChange={(e) =>
                  handleInputChange("advertisementDescription", e)
                }
              ></RichTextForm>
            </Grid>


            {/* ENGLISH ADVERTISEMENT DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <RichTextForm
                title="Mô tả bằng tiếng Anh"
                titleSpan={2}
                fieldSpan={10}
                subtitle="Mô tả dự án viết bằng tiếng Anh"
                value={formData.englishAdvertisementDescription}
                error={formData.englishAdvertisementDescriptionError.hasError}
                errorLabel={formData.englishAdvertisementDescriptionError.label}
                onChange={(e) =>
                  handleInputChange("englishAdvertisementDescription", e)
                }
              ></RichTextForm>
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card
            variant="outlined"
            sx={{ p: 2, border: 1, borderColor: "gray" }}
          >
            <Typography variant="h5" sx={{ my: "auto" }}>
              {contactLabel}
            </Typography>
            <UserCard
              sx={{ mt: 2 }}
              name={projectOwner?.name || "Không tìm thấy"}
              email={projectOwner?.email || "..."}
              phone={projectOwner?.phone || "..."}
            ></UserCard>
          </Card>

          <Grid item xs={12} lg={12}>
            <Card
              variant="outlined"
              sx={{ p: 2, border: 1, borderColor: "gray", mt: 2 }}
            >
              <Typography variant="h5" sx={{ my: "auto" }}>
                {priceLabel}
              </Typography>
              <Typography
                variant="h5"
                sx={{ my: "auto", mt: 1, borderTop: 1, borderColor: "gray" }}
              ></Typography>

              <Grid container sx={{ mt: 1, pt: 2 }}>
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Giá ước tính:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {formData?.estimatedPrice?.toLocaleString("en-US") ?? 0} VND
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ mt: 1, pt: 2 }}>
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Giá thực tế:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {formData?.finalPrice?.toLocaleString("en-US") ?? 0} VND
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ mt: 1, pt: 2 }}>
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Tổng diện tích:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {formData?.area ?? 0} m²
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 1, pt: 2 }}>
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Ngày làm việc:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {formData.estimateBusinessDay ?? 0} ngày
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
