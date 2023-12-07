"use client";

import { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";

import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import languageOptions from "/constants/enums/language";
import advertisementStatusOptions from "/constants/enums/advertisementStatus";
import { createProject, getProjectsBySiteId } from "/api/projectServices";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getProjectCategories } from "/api/projectCategoryServices";

import PageContainer from "/components/container/PageContainer";
import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";

export default function CreateModal({ onSubmit }) {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    type: -1,
    typeError: { hasError: false, label: "" },
    status: 0,
    statusError: { hasError: false, label: "" },
    language: -1,
    languageError: { hasError: false, label: "" },
    projectCategoryId: null,
    projectCategory: null,
    projectCategoryError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    advertisementStatus: 0,
    advertisementStatusError: { hasError: false, label: "" },
    basedOnDecorProjectId: null,
    basedOnDecorProject: null,
    basedOnDecorProjectError: { hasError: false, label: "" },
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
    createdAdminUsername: "admin.username",
    createdByAdminId: "7C2B4371-E768-4D01-9E15-648091A7D9B7",
    siteId: params.id,
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
    switch (field) {
      case "projectCategory":
      case "basedOnDecorProject":
        setFormData((prevData) => ({ ...prevData, [`${field}Id`]: value }));
        console.log(value)
        break;
      default:
        break;
    }
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  const [decorProjects, setDecorProjects] = useState([]);
  const initialized = useRef(false);

  const [loading, setLoading] = useState(true);
  const [projectCategories, setProjectCategories] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const listCategories = await getProjectCategories();
          console.log(listCategories);
          setProjectCategories(listCategories);

          const projects = await getProjectsBySiteId(params.id);
          console.log(projects);
          setDecorProjects(projects.filter((project) => project.type === 0));

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateProject = async () => {
    console.log(formData);
    try {
      const response = await createProject(formData);
      console.log(response);
      if (response.data != null) {
        toast.success("Thêm thành công!");
        router.push(`/projects/${response.data.id}`);
      } else {
        throw new Error("Create failed!");
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <PageContainer title="Tạo dự án mới" description="Tạo dự án mới">
      <FormModal
        buttonLabel="Tạo"
        title="Tạo dự án"
        submitLabel="Tạo"
        onSubmit={handleCreateProject}
        size="big"
      >
        {/* NAME */}
        <Grid item xs={12} lg={6}>
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
        <Grid item xs={12} lg={6}>
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
          ></SelectForm>
        </Grid>

        {/* PROJECT STATUS */}
        <Grid item xs={12} lg={6}>
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
        <Grid item xs={12} lg={6}>
          <AutocompleteForm
            title="Phân loại"
            subtitle="Chọn phân loại dự án"
            value={formData.projectCategory}
            options={projectCategories}
            error={formData.projectCategoryError.hasError}
            errorLabel={formData.projectCategoryError.label}
            onChange={(value) => handleInputChange("projectCategory", value)}
          ></AutocompleteForm>
        </Grid>

        {/* ESTIMATED PRICE */}
        {/* <Grid item xs={12} lg={6}>
          <NumberForm
            title="Giá ước tính"
            required
            subtitle="Nhập giá tiền ước tính của dự án"
            value={formData.estimatedPrice}
            error={formData.estimatedPriceError.hasError}
            errorLabel={formData.estimatedPriceError.label}
            onChange={(value) => handleInputChange("estimatedPrice", value)}
            endAdornment={<>VND</>}
          ></NumberForm>
        </Grid> */}

        {/* FINAL PRICE */}
        {/* <Grid item xs={12} lg={6}>
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
        {/* <Grid item xs={12} lg={6}>
          <NumberForm
            title="Bảo hiểm đã trả"
            subtitle="Nhập số tiền bảo hiểm khách đã trả"
            value={formData.totalWarrantyPaid}
            error={formData.totalWarrantyPaidError.hasError}
            errorLabel={formData.totalWarrantyPaidError.label}
            onChange={(value) => handleInputChange("totalWarrantyPaid", value)}
            endAdornment={<>VND</>}
          ></NumberForm>
        </Grid> */}

        {/* AREA */}
        {/* <Grid item xs={12} lg={6}>
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
        {/* <Grid item xs={12} lg={6}>
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
        <Grid item xs={12} lg={6}>
          <SelectForm
            title="Ngôn ngữ"
            required
            subtitle="Chọn ngôn ngữ của dự án"
            value={formData.language}
            options={languageOptions}
            defaultValue={-1}
            defaultLabel="Chọn một..."
            error={formData.languageError.hasError}
            errorLabel={formData.languageError.label}
            onChange={(value) => handleInputChange("language", value)}
          ></SelectForm>
        </Grid>

        {/* ADVERTISEMENT STATUS */}
        <Grid item xs={12} lg={6}>
          <SelectForm
            title="Quảng cáo"
            required
            subtitle="Cho phép hệ thống quảng cáo dự án này"
            value={formData.advertisementStatus}
            options={advertisementStatusOptions}
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
          <Grid item xs={12} lg={6}>
            <AutocompleteForm
              title="Thiết kế"
              subtitle="Chọn dự án thiết kế cho dự án thi công này"
              value={formData.basedOnDecorProject}
              options={decorProjects}
              error={formData.basedOnDecorProjectError.hasError}
              errorLabel={formData.basedOnDecorProjectError.label}
              onChange={(value) =>
                handleInputChange("basedOnDecorProject", value)
              }
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
            onChange={(e) => handleInputChange("description", e.target.value)}
          ></TextForm>
        </Grid>
      </FormModal>
    </PageContainer>
  );
}
