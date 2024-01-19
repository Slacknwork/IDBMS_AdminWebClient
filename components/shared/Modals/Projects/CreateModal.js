"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

import { createProject, getProjectsBySiteId } from "/services/projectServices";
import { getProjectCategories } from "/services/projectCategoryServices";

import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import languageOptions from "/constants/enums/language";
import advertisementStatusOptions from "/constants/enums/advertisementStatus";

import AutocompleteForm from "../../Forms/Autocomplete";
import SelectForm from "../../Forms/Select";
import TextForm from "../../Forms/Text";
import FormModal from "../../Modals/Form";
import checkValidField from "/components/validations/field";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
};

export default function CreateProjectModal({ children }) {
  const params = useParams();
  const router = useRouter();
  const admin = useSelector((state) => state.user);
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    type: 0,
    typeError: { hasError: false, label: "" },
    status: 2,
    statusError: { hasError: false, label: "" },
    language: 1,
    languageError: { hasError: false, label: "" },
    projectCategoryId: null,
    projectCategoryIdError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    advertisementStatus: 0,
    advertisementStatusError: { hasError: false, label: "" },
    basedOnDecorProjectId: null,
    basedOnDecorProjectIdError: { hasError: false, label: "" },
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
    createdAdminUsername: admin?.username || "",
    createdByAdminId: admin?.id || "",
    siteId: params.id,
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
      case "projectCategoryId":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "type":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "status":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "language":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "advertisementStatus":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "description":
      case "basedOnDecorProjectId":
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
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const [decorProjects, setDecorProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [projectCategories, setProjectCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchDecorProjects = async () => {
      try {
        const response = await getProjectsBySiteId({
          siteId: params.id,
          type: 0,
        });
        setDecorProjects(response?.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Dự án' từ hệ thống");
      }
    };
    const fetchProjectCategories = async () => {
      try {
        const response = await getProjectCategories();
        setProjectCategories(response?.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân loại dự án' từ hệ thống");
      }
    };
    await Promise.all([fetchDecorProjects(), fetchProjectCategories()]);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
    try {
      const response = await createProject(formData);
      console.log(response);
      toast.success("Thêm thành công!");
      router.push(`/projects/${response.id}`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  useEffect(() => {
    fetchOptionsFromApi();

    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

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
      title="Tạo dự án"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
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

      {/* PROJECT CATEGORY */}
      <Grid item xs={12} lg={6}>
        <AutocompleteForm
          required
          title="Phân loại"
          subtitle="Chọn phân loại dự án"
          value={formData.projectCategoryId}
          options={projectCategories}
          error={formData.projectCategoryIdError.hasError}
          errorLabel={formData.projectCategoryIdError.label}
          onChange={(value) => handleInputChange("projectCategoryId", value)}
        ></AutocompleteForm>
      </Grid>

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
          onChange={(value) => handleInputChange("advertisementStatus", value)}
          disableOptions={[2]}
        ></SelectForm>
      </Grid>

      {/* BASED ON DECOR PROJECT */}
      {formData.type && formData.type === 1 ? (
        <Grid item xs={12} lg={6}>
          <AutocompleteForm
            title="Thiết kế"
            subtitle="Chọn dự án thiết kế cho dự án thi công này"
            value={formData.basedOnDecorProjectId}
            options={decorProjects}
            error={formData.basedOnDecorProjectIdError.hasError}
            errorLabel={formData.basedOnDecorProjectIdError.label}
            onChange={(value) =>
              handleInputChange("basedOnDecorProjectId", value)
            }
          ></AutocompleteForm>
        </Grid>
      ) : null}

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Mô tả"
          multiline
          titleSpan={2}
          fieldSpan={10}
          rows={4}
          subtitle="Mô tả dự án"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
