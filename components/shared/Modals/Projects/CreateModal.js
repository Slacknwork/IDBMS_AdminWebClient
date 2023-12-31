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
import { useSelector } from "react-redux";

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

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    type: 0,
    typeError: { hasError: false, label: "" },
    status: 0,
    statusError: { hasError: false, label: "" },
    language: 0,
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
    switch (field) {
      case "name":
      case "projectCategoryId":
      case "type":
      case "status":
      case "language":
      case "advertisementStatus":
        if (
          value === null || value === undefined
          || (typeof value === "string" && value.trim() === "")
          || (typeof value === "number" && value < 0)
        ) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: "Không được để trống!",
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
    }
  };

  // SUBMIT FORM
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
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

    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

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
      toast.success("Thêm thành công!");
      router.push(`/projects/${response.id}`);
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
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit={formHasError}
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
          disableOptions={[3, 4, 5, 6, 7, 8]}
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
          onChange={(value) =>
            handleInputChange("advertisementStatus", value)
          }
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
