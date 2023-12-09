"use client";

import { useParams } from "next/navigation";
import { Avatar, Box, Card, Grid, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import projectLanguageOptions from "/constants/enums/language";
import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import projectAdvertisementStatusOptions from "/constants/enums/advertisementStatus";

import {
  getProjectById,
  getProjectsBySiteId,
  updateProject,
} from "/api/projectServices";
import { getProjectCategories } from "/api/projectCategoryServices";

import PageContainer from "/components/container/PageContainer";
import DashboardCard from "/components/shared/DashboardCard";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";

export default function ProjectDetails() {
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
    projectCategoryId: { id: 0, name: "" },
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
  const priceLabel = "Thông tin về các giá trị";

  const [projectId, setProjectId] = useState(params.id);
  const [siteId, setSiteId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const [projectCategories, setProjectCategories] = useState([]);
  const [decorProjects, setDecorProjects] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const project = await getProjectById(projectId);
          setFormData((prevData) => ({ ...prevData, ...project }));
          setPageName(project.name);
          setPageDescription(project.description);

          const listCategories = await getProjectCategories();
          setProjectCategories(listCategories.list);

          const listProjectsBySiteId = await getProjectsBySiteId(
            project?.siteId
          );
          setDecorProjects(
            listProjectsBySiteId.list
              .filter(
                (project) => project.type === 0 && project.id !== projectId
              )
              .map(({ id, name }) => ({ id, name }))
          );
          const participation = project?.projectParticipations.find(
            (par) => par.role === 0
          );
          setProjectOwner(participation?.user ?? "");

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, [projectId]);

  const onSaveProject = async () => {
    try {
      const project = await updateProject(projectId, formData);
      setPageName(formData.name);
      setPageDescription(formData.description);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const getAvatarContent = (name) => {
    const words = name.split(" ");
    const lastWord = words.length > 0 ? words[words.length - 1] : "";
    const firstCharacter = lastWord.charAt(0).toUpperCase();
    return firstCharacter;
  };

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DetailsPage
        title="Thông tin dự án"
        saveMessage="Lưu thông tin dự án?"
        onSave={onSaveProject}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Tên"
                required
                subtitle="Nhập tên dự án"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              ></TextForm>
            </Grid>

            {/* PROJECT TYPE */}
            <Grid item xs={12} lg={12}>
              <SelectForm
                title="Kiểu dự án"
                required
                subtitle="Chọn kiểu dự án"
                value={formData.type}
                options={projectTypeOptions}
                defaultValue={-1}
                defaultLabel="Chọn kiểu dự án"
                error={formData.typeError.hasError}
                errorLabel={formData.typeError.label}
                onChange={(value) => handleInputChange("type", value)}
                disabled
              ></SelectForm>
            </Grid>

            {/* PROJECT STATUS */}
            <Grid item xs={12} lg={12}>
              <SelectForm
                title="Trạng thái"
                required
                subtitle="Chọn trạng thái của dự án"
                value={formData.status}
                options={projectStatusOptions}
                defaultValue={-1}
                defaultLabel="Chọn trạng thái"
                error={formData.statusError.hasError}
                errorLabel={formData.statusError.label}
                onChange={(value) => handleInputChange("status", value)}
              ></SelectForm>
            </Grid>

            {/* PROJECT CATEGORY */}
            <Grid item xs={12} lg={12}>
              <AutocompleteForm
                title="Phân loại"
                subtitle="Chọn phân loại dự án"
                value={formData.projectCategoryId}
                options={projectCategories}
                error={formData.projectCategoryIdError.hasError}
                errorLabel={formData.projectCategoryIdError.label}
                onChange={(value) =>
                  handleInputChange("projectCategoryId", value)
                }
              ></AutocompleteForm>
            </Grid>

            {/* ESTIMATED PRICE */}
            {/* <Grid item xs={12} lg={12}>
                <NumberForm
                  title="Giá ước tính"
                  required
                  subtitle="Nhập giá tiền ước tính của dự án"
                  value={formData.estimatedPrice}
                  error={formData.estimatedPriceError.hasError}
                  errorLabel={formData.estimatedPriceError.label}
                  onChange={(value) =>
                    handleInputChange("estimatedPrice", value)
                  }
                  endAdornment={<>VND</>}
                ></NumberForm>
              </Grid> */}

            {/* FINAL PRICE */}
            {/* <Grid item xs={12} lg={12}>
                <NumberForm
                  title="Giá thực tế"
                  required
                  subtitle="Nhập giá tiền quyết toán của dự án"
                  value={formData.finalPrice}
                  error={formData.finalPriceError.hasError}
                  errorLabel={formData.finalPriceError.label}
                  onChange={(value) => handleInputChange("finalPrice", value)}
                  endAdornment={<>VND</>}
                ></NumberForm>
              </Grid> */}

            {/* TOTAL WARRANTY PAID */}
            {/* <Grid item xs={12} lg={12}>
                <NumberForm
                  title="Bảo hiểm đã trả"
                  subtitle="Nhập số tiền bảo hiểm khách đã trả"
                  value={formData.totalWarrantyPaid}
                  error={formData.totalWarrantyPaidError.hasError}
                  errorLabel={formData.totalWarrantyPaidError.label}
                  onChange={(value) =>
                    handleInputChange("totalWarrantyPaid", value)
                  }
                  endAdornment={<>VND</>}
                ></NumberForm>
              </Grid> */}

            {/* AREA */}
            {/* <Grid item xs={12} lg={12}>
                <NumberForm
                  title="Tổng diện tích"
                  required
                  subtitle="Tổng diện tích của dự án"
                  value={formData.area}
                  error={formData.areaError.hasError}
                  errorLabel={formData.areaError.label}
                  onChange={(value) => handleInputChange("area", value)}
                  endAdornment={<>m²</>}
                ></NumberForm>
              </Grid> */}

            {/* ESTIMATE BUSINESS DAY */}
            {/* <Grid item xs={12} lg={12}>
                <NumberForm
                  title="Ước tính thời gian"
                  required
                  subtitle="Ước tính số ngày làm việc để hoàn thành dự án"
                  value={formData.estimateBusinessDay}
                  error={formData.estimateBusinessDayError.hasError}
                  errorLabel={formData.estimateBusinessDayError.label}
                  onChange={(value) =>
                    handleInputChange("estimateBusinessDay", value)
                  }
                  endAdornment={<>ngày</>}
                ></NumberForm>
              </Grid> */}

            {/* LANGUAGE */}
            <Grid item xs={12} lg={12}>
              <SelectForm
                title="Ngôn ngữ"
                required
                subtitle="Chọn ngôn ngữ của dự án"
                value={formData.language}
                options={projectLanguageOptions}
                defaultValue={-1}
                defaultLabel="Chọn một..."
                error={formData.languageError.hasError}
                errorLabel={formData.languageError.label}
                onChange={(value) => handleInputChange("language", value)}
              ></SelectForm>
            </Grid>

            {/* ADVERTISEMENT STATUS */}
            <Grid item xs={12} lg={12}>
              <SelectForm
                title="Quảng cáo"
                required
                subtitle="Cho phép hệ thống quảng cáo dự án này"
                value={formData.advertisementStatus}
                options={projectAdvertisementStatusOptions}
                defaultValue={-1}
                defaultLabel="Chọn một..."
                error={formData.advertisementStatusError.hasError}
                errorLabel={formData.advertisementStatusError.label}
                onChange={(value) =>
                  handleInputChange("advertisementStatus", value)
                }
              ></SelectForm>
            </Grid>

            {/* BASED ON DECOR PROJECT */}
            {formData.type && formData.type === 1 ? (
              <Grid item xs={12} lg={12}>
                <AutocompleteForm
                  title="Thiết kế"
                  subtitle="Chọn dự án thiết kế cho dự án thi công này"
                  value={formData.basedOnDecorProjectId}
                  options={decorProjects}
                  getOptionLabel={(option) => option.name}
                  error={formData.basedOnDecorProjectErrorId.hasError}
                  errorLabel={formData.basedOnDecorProjectErrorId.label}
                  onChange={(value) =>
                    handleInputChange("basedOnDecorProjectId", value)
                  }
                  disabled={true}
                ></AutocompleteForm>
              </Grid>
            ) : null}

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Mô tả"
                multiline
                rows={4}
                subtitle="Mô tả dự án"
                value={formData.description}
                error={formData.descriptionError.hasError}
                errorLabel={formData.descriptionError.label}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              ></TextForm>
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
            <Box sx={{ display: "flex", mt: 2 }}>
              <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>
                {getAvatarContent(projectOwner?.name ?? "E")}
              </Avatar>
              <Box sx={{ my: "auto", mx: 2 }}>
                <Typography variant="h6">
                  {projectOwner?.name ?? "Không tìm thấy"}
                </Typography>
                <Typography variant="p">
                  {projectOwner?.email ?? "..."}
                </Typography>
                <br />
                <Typography variant="p">
                  {projectOwner?.phone ?? "..."}
                </Typography>
                <br />
              </Box>
            </Box>
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
