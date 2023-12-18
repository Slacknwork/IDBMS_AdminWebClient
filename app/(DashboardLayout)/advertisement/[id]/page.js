"use client";

import { useParams } from "next/navigation";
import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getProjectById } from "/api/projectServices";
import { updateAdvertisementProjectDescription } from "/api/advertisementServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import RichTextForm from "/components/shared/Forms/RichText";
import FileForm from "/components/shared/Forms/File";
import UserCard from "/components/shared/UserCard";

export default function AdvertisementDetailsPage() {
  const params = useParams();

  const [formData, setFormData] = useState({
    advertisementDescription: "",
    advertisementDescriptionError: { hasError: false, label: "" },
    file: null,
    fileError: { hasError: false, label: "" },
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
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  // GET SITE DETAILS
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  // CONTACT
  const contactLabel = "Thông tin liên hệ chủ dự án";
  const priceLabel = "Thông tin về các giá trị";

  const [loading, setLoading] = useState(true);
  const [projectOwner, setProjectOwner] = useState("");

  useEffect(() => {
    const fetchDataFromApi = async () => {
      setLoading(true);
      try {
        const projectResponse = await getProjectById(params.id);
        const project = projectResponse.data;
        setFormData((prevData) => ({ ...prevData, ...project }));
        setPageName(project.name);
        setPageDescription(project.description);
        const participation = project?.projectParticipations.find(
          (par) => par.role === 0
        );
        setProjectOwner(participation?.user ?? "");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  const onSaveAdvertisementProject = async () => {
    try {
      await updateAdvertisementProjectDescription(params.id, {
        description: formData.advertisementDescription,
        representImage: formData.file,
      });
      setPageName(formData.name);
      setPageDescription(formData.description);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DetailsPage
        loading={loading}
        title="Thông tin dự án"
        saveMessage="Lưu thông tin dự án?"
        onSave={onSaveAdvertisementProject}
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
                value={formData.file}
                imgDisplay={formData.representImageUrl}
                error={formData.fileError.hasError}
                errorLabel={formData.fileError.label}
                onChange={(file) => handleInputChange("file", file)}
              ></FileForm>
            </Grid>

            {/* ADVERTISEMENT DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <RichTextForm
                title="Mô tả"
                titleSpan={2}
                fieldSpan={10}
                subtitle="Mô tả dự án"
                value={formData.advertisementDescription}
                error={formData.advertisementDescriptionError.hasError}
                errorLabel={formData.advertisementDescriptionError.label}
                onChange={(e) =>
                  handleInputChange("advertisementDescription", e)
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
              name={projectOwner?.name ?? "Không tìm thấy"}
              email={projectOwner?.email ?? "..."}
              phone={projectOwner?.phone ?? "..."}
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
                    Đã bảo hiểm:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {formData?.totalWarrantyPaid?.toLocaleString("en-US") ?? 0}{" "}
                    VND
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
