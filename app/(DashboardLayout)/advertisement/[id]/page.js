"use client";

import { useParams } from "next/navigation";
import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getProjectById,
  getProjectsBySiteId,
  updateProject,
} from "/api/projectServices";
import { getProjectCategories } from "/api/projectCategoryServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import RichTextForm from "/components/shared/Forms/RichText";
import UserCard from "/components/shared/UserCard";

export default function AdvertisementDetailsPage() {
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    type: -1,
    typeError: { hasError: false, label: "" },
    status: -1,
    statusError: { hasError: false, label: "" },
    language: -1,
    languageError: { hasError: false, label: "" },
    projectCategoryId: null,
    projectCategoryIdError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    advertisementStatus: -1,
    advertisementStatusError: { hasError: false, label: "" },
    basedOnDecorProjectId: null,
    basedOnDecorProjectErrorId: { hasError: false, label: "" },
    estimatedPrice: 0,
    estimatedPriceError: { hasError: false, label: "" },
    finalPrice: 0,
    finalPriceError: { hasError: false, label: "" },
    totalWarrantyPaid: 0,
    totalWarrantyPaidError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
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
  const priceLabel = "Tổng quan";

  const [loading, setLoading] = useState(true);

  const [projectCategories, setProjectCategories] = useState([]);
  const [decorProjects, setDecorProjects] = useState([]);
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

        const listCategories = await getProjectCategories({});
        setProjectCategories(listCategories.list);
        console.log(project);
        const listProjectsBySiteId = await getProjectsBySiteId({
          siteId: project.siteId,
        });
        setDecorProjects(
          listProjectsBySiteId.list
            .filter((project) => project.type === 0 && project.id !== params.id)
            .map(({ id, name }) => ({ id, name }))
        );
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

  const onSaveProject = async () => {
    try {
      const project = await updateProject(params.id, formData);
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
        onSave={onSaveProject}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <RichTextForm
                title="Mô tả"
                titleSpan={2}
                fieldSpan={10}
                subtitle="Mô tả dự án"
                value={formData.description}
                error={formData.descriptionError.hasError}
                errorLabel={formData.descriptionError.label}
                onChange={(e) => handleInputChange("description", e)}
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
