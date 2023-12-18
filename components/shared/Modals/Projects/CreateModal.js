"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IconPencil } from "@tabler/icons-react";

import AutocompleteForm from "../../Forms/Autocomplete";
import SelectForm from "../../Forms/Select";
import FileForm from "../../Forms/File";
import CheckForm from "../../Forms/Checkbox";
import TextForm from "../../Forms/Text";
import FormModal from "../../Modals/Form";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { createProject, getProjectsBySiteId } from "/api/projectServices";
import { getProjectCategories } from "/api/projectCategoryServices";

import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import languageOptions from "/constants/enums/language";
import advertisementStatusOptions from "/constants/enums/advertisementStatus";

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
        console.log(value);
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

  const [loading, setLoading] = useState(true);
  const [projectCategories, setProjectCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchDecorProjects = async () => {
      try {
        const response = await getProjectsBySiteId({ siteId: params.id, type: 0 });
        setDecorProjects(response?.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Dự án thiết kế' từ hệ thống");
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
    await Promise.all([
      fetchDecorProjects(),
      fetchProjectCategories(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);


  const handleCreate = async () => {
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
    <FormModal
      buttonLabel="Tạo"
      title="Tạo dự án"
      submitLabel="Tạo"
      onSubmit={handleCreate}
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
