"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import projectAdvertisementStatusOptions from "/constants/enums/advertisementStatus";
import { companyRoleConstants } from "/constants/enums/companyRole";
import locales from "/constants/locales";

import { getProjectById, updateProject } from "/services/projectServices";
import { getProjectCategories } from "/services/projectCategoryServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import UserCard from "/components/shared/UserCard";
import checkValidField from "/components/validations/field";

export default function ProjectDetails() {
  const params = useParams();
  const user = useSelector((state) => state.user);

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
    basedOnDecorProject: null,
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

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "projectCategoryId":
      case "type":
      case "status":
      case "language":
      case "advertisementStatus":
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
      default:
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
          [`${field}Error`]: {
            hasError: false,
            label: "",
          },
        }));
    }
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
  const [projectOwner, setProjectOwner] = useState("");

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    try {
      const project = await getProjectById(params.id);
      setFormData((prevData) => ({ ...prevData, ...project }));
      setPageName(project.name);
      setPageDescription(project.description);

      const listCategories = await getProjectCategories({});
      setProjectCategories(listCategories.list);
      console.log(project);
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

  useEffect(() => {
    if (!switchSubmit) return;
    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    onSaveProject();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const onSaveProject = async () => {
    try {
      await updateProject(params.id, formData);
      setPageName(formData.name);
      setPageDescription(formData.description);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    setIsAdmin(user?.role && user?.role === companyRoleConstants.ADMIN);
  }, [user?.role]);

  const vatAmount = formData?.finalPrice * 0.1 ?? 0;
  const totalIncludeVat = vatAmount + formData?.finalPrice ?? 0;

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DetailsPage
        extraButtons={
          <Button component={Link} href={`${process.env.NEXT_PUBLIC_USER_URL}/${locales.viVN}/project/${params.id}`} disableElevation variant="contained">
            Xem trang người dùng
          </Button>
        }
        hideSave={!isAdmin}
        loading={loading}
        title="Thông tin dự án"
        saveMessage="Lưu thông tin dự án?"
        onSave={handleSubmit}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Tên"
                disabled={!isAdmin}
                required
                subtitle="Nhập tên dự án"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              ></TextForm>
            </Grid>

            {/* PROJECT CATEGORY */}
            <Grid item xs={12} lg={12}>
              <AutocompleteForm
                title="Phân loại"
                subtitle="Chọn phân loại dự án"
                disabled={!isAdmin}
                required
                value={formData.projectCategoryId}
                options={projectCategories}
                error={formData.projectCategoryIdError.hasError}
                errorLabel={formData.projectCategoryIdError.label}
                onChange={(value) =>
                  handleInputChange("projectCategoryId", value)
                }
              ></AutocompleteForm>
            </Grid>

            {/* ADVERTISEMENT STATUS */}
            <Grid item xs={12} lg={12}>
              <SelectForm
                title="Quảng cáo"
                required
                disabled={!isAdmin}
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
                disableOptions={[2]}
              ></SelectForm>
            </Grid>

            {/* BASED ON DECOR PROJECT */}
            {formData.type && formData.type === 1 ? (
              <Grid item xs={12} lg={12}>
                <TextForm
                  title="Thiết kế"
                  subtitle="Chọn dự án thiết kế cho dự án thi công này"
                  value={formData?.basedOnDecorProject?.name}
                  disabled
                ></TextForm>
              </Grid>
            ) : null}

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Mô tả"
                multiline
                disabled={!isAdmin}
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
                    VAT (10%):
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {vatAmount.toLocaleString("en-US") ?? 0} VND
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ mt: 1, pt: 2 }}>
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Tổng (kèm VAT):
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {totalIncludeVat.toLocaleString("en-US") ?? 0} VND
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

              <Grid container sx={{ mt: 1, pt: 2 }}>
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Tổng tiền phạt:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {formData?.totalPenaltyFee?.toLocaleString("en-US") ?? 0}{" "}
                    VND
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ mt: 1, pt: 2 }}>
                <Grid item xs={6} lg={5}>
                  <Typography variant="h6" sx={{ my: "auto" }}>
                    Tổng đã trả:
                  </Typography>
                </Grid>
                <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                  <Typography variant="p" sx={{ my: "auto" }}>
                    {formData?.amountPaid?.toLocaleString("en-US") ?? 0} VND
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
