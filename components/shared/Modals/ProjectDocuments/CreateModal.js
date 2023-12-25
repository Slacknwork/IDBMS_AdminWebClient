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

import projectDocumentCategoryOptions from "/constants/enums/projectDocumentCategory";
import {getAllProjectDocumentTemplates} from "../../../../api/projectDocumentTemplateServices";
import {createProjectDocument} from "../../../../api/projectDocumentServices";
import AutocompleteForm from "../../Forms/Autocomplete";
import SelectForm from "../../Forms/Select";
import FileForm from "../../Forms/File";
import CheckForm from "../../Forms/Checkbox";
import TextForm from "../../Forms/Text";
import FormModal from "../../Modals/Form";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

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

export default function DocumentModal({ success, projectDocument }) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const params = useParams();

  const [formData, setFormData] = useState({
    name: projectDocument?.name || "",
    nameError: { hasError: false, label: "" },
    description: projectDocument?.description || "",
    descriptionError: { hasError: false, label: "" },
    file: null,
    fileError: { hasError: false, label: "" },
    category: projectDocument?.category || -1,
    categoryError: { hasError: false, label: "" },
    projectId: params.id,
    projectDocumentTemplateId: "",
    projectDocumentTemplateIdError: { hasError: false, label: "" },
    IsPublicAdvertisement: projectDocument?.isPublicAdvertisement || false,
    isPublicAdvertisementError: { hasError: false, label: "" },
    // ... other fields if needed
  });

  const projectDocumentTemplateOptions = [
    { id: 1, name: "Template1" },
    { id: 2, name: "Template2" },
    // Add more template options as needed
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" }, // Reset error on change
    }));
    console.log(value);
  };

  const handleFileInputChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      file: file,
      fileError: { hasError: false, label: "" }, // Reset error on change
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: !formData[field],
      [`${field}Error`]: { hasError: false, label: "" }, // Reset error on change
    }));
    console.log(value);

  };

  const handleCreate = async () => {
    console.log(formData)
    try {
        const response = await createProjectDocument(formData);
        toast.success("Thêm thành công!");
        console.log(response);
        success(true);
    } catch (error) {
        console.error("Error :", error);
        toast.error("Lỗi!");
    }
};

  const [loading, setLoading] = useState(true);
  const [projectDocumentTemplates, setProjectDocumentTemplates] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
      const fetchProjectDocumentTemplates = async () => {
          try {
              const response = await getAllProjectDocumentTemplates();
              console.log(response);
              setProjectDocumentTemplates(response.list || []);
          } catch (error) {
              console.error("Error fetching data:", error);
              toast.error("Lỗi nạp dữ liệu từ hệ thống");
          }
      };
      await Promise.all([
          fetchProjectDocumentTemplates(),
      ]);
      setLoading(false);
  };

  useEffect(() => {
      fetchOptionsFromApi();
  }, []);
  
  return (
    <FormModal
            buttonLabel="Tạo"
            title="Tạo tài liệu"
            submitLabel="Tạo"
            onSubmit={handleCreate}
            size="big"
        >
        
            {/* NAME */}
            <Grid item xs={12} lg={12}>
                  <TextForm
                    title="Tên"
                    required
                    subtitle="Nhập tên danh mục"
                    value={formData.name}
                    error={formData.nameError.hasError}
                    errorLabel={formData.nameError.label}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                ></TextForm>
            </Grid>

            {/* FILE INPUT */}
            <Grid item xs={12} lg={12}>
                  <FileForm 
                  fullWidth
                  title="Tệp đính kèm"
                  required
                  subtitle="Chọn tệp"
                  titleSpan={3}
                  fieldSpan={9}
                  value={formData.file}
                  error={formData.fileError.hasError}
                  errorLabel={formData.fileError.label}
                  onChange={(file) => handleInputChange("file", file)}
                  ></FileForm>
            </Grid>

            {/* PROJECT DOCUMENT CATEGORY */}
            <Grid item xs={12} lg={6}>
                  <SelectForm
                    title="Danh mục tài liệu"
                    required
                    subtitle="Chọn danh mục tài liệu"
                    value={formData.category}
                    options={projectDocumentCategoryOptions}
                    error={formData.categoryError?.hasError}
                    errorLabel={formData.categoryError.label}
                    onChange={(value) => handleInputChange("category", value)}
                ></SelectForm>
            </Grid>

            {/* PROJECT DOCUMENT TEMPLATE */}
            <Grid item xs={12} lg={6}>
                  <AutocompleteForm
                    title="Mẫu tài liệu"
                    subtitle="Chọn mẫu tài liệu"
                    value={formData.projectDocumentTemplateId}
                    options={projectDocumentTemplates}
                    error={formData.projectDocumentTemplateIdError.hasError}
                    errorLabel={formData.projectDocumentTemplateIdError.label}
                    onChange={(value) => handleInputChange("projectDocumentTemplateId", value)}
                ></AutocompleteForm>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
                  <TextForm 
                    fullWidth
                    multiline
                    title="Mô tả"
                    subtitle="Nhập mô tả cho tài liệu"
                    value={formData.description}
                    error={formData.descriptionError.hasError}
                    errorLabel={formData.descriptionError.label}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                ></TextForm>
            </Grid>

            {/* IS PUBLIC ADVERTISEMENT */}
            <Grid item xs={12} lg={6}>
                  <CheckForm
                  title="Công khai"
                  checked={formData.IsPublicAdvertisement}
                  onChange={(e) =>
                  handleCheckboxChange("IsPublicAdvertisement", e.target.checked)
                  }
                  />
            </Grid>
    </FormModal>
  );
}
