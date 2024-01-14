"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import languageOptions from "/constants/enums/language";

import projectDocumentCategoryOptions from "/constants/enums/projectDocumentCategory";
import { getAllProjectDocumentTemplates } from "/services/projectDocumentTemplateServices";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import DetailsPage from "/components/shared/DetailsPage";
import PageContainer from "/components/container/PageContainer";
import SelectForm from "/components/shared/Forms/Select";
import FileForm from "/components/shared/Forms/File";
import CheckForm from "/components/shared/Forms/Checkbox";
import TextForm from "/components/shared/Forms/Text";
import FormModal from "/components/shared/Modals/Form";
import { toast } from "react-toastify";

import {
  getDocumentById,
  updateProjectDocument,
  deleteProjectDocument,
} from "/services/projectDocumentServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import checkValidField from "/components/validations/field";
import checkValidUrl from "/components/validations/url";

export default function ProjectDocumentDetails(projectDocument) {
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
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "category":
      case "IsPublicAdvertisement":
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
      case "file":
        const validFile = checkValidUrl(value);
        if (validFile.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validFile.label,
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
      case "description":
      case "projectDocumentTemplateId":
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
          [`${field}Error`]: {
            hasError: false,
            label: "",
          },
        }));
        break;
      default:
    }
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [loading, setLoading] = useState(true);
  const [projectDocumentTemplates, setProjectDocumentTemplates] = useState([]);

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchProjectDocument = async () => {
      try {
        const response = await getDocumentById(params.documentId, params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân loại công việc' từ hệ thống");
      }
    };
    const fetchProjectDocumentTemplates = async () => {
      try {
        const response = await getAllProjectDocumentTemplates({
          projectId: params.id,
        });
        console.log(response);
        setProjectDocumentTemplates(response.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thiết kế tài liệu' từ hệ thống");
      }
    };
    await Promise.all([
      fetchProjectDocument(),
      fetchProjectDocumentTemplates(),
    ]);
    setLoading(false);
  };

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData, params.id);
    console.log(transformedValue);

    try {
      const response = await updateProjectDocument(
        params.documentId,
        transformedValue
      );
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteProjectDocument(
        params.documentId,
        params.id
      );
      console.log(response);
      toast.success("Xoá thành công!");
      router.push(`/projects/${params.id}/documents`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const transformData = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === null) {
        result[key] = "";
      }
    }

    return result;
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

    handleSave();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <PageContainer
      title={formData.name}
      description="Chi tiết thiết kế công việc"
    >
      <DetailsPage
        title="Thông tin thiết kế công việc"
        saveMessage="Lưu thông tin thiết kế công việc?"
        onSave={handleSubmit}
        deleteMessage={"Xoá thiết kế công việc này?"}
        deleteLabel={"Xoá"}
        hasDelete
        onDelete={handleDelete}
      >
        {/* NAME */}
        <Grid item xs={12} lg={12}>
          <TextForm
            title="Tên"
            required
            titleSpan={3}
            fieldSpan={9}
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
            subtitle="Chọn tệp đính kèm mới nếu có sai sót."
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
            titleSpan={6}
            fieldSpan={6}
            spacing={3}
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
            onChange={(value) =>
              handleInputChange("projectDocumentTemplateId", value)
            }
          ></AutocompleteForm>
        </Grid>

        {/* DESCRIPTION */}
        <Grid item xs={12} lg={12}>
          <TextForm
            fullWidth
            multiline
            titleSpan={3}
            fieldSpan={9}
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
            required
            checked={formData.IsPublicAdvertisement}
            onChange={(e) =>
              handleCheckboxChange("IsPublicAdvertisement", e.target.checked)
            }
          />
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
