"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import FileForm from "/components/shared/Forms/File";
import { createTaskCategory } from "../../../../services/taskCategoryServices";
import projectTypeOptions from "../../../../constants/enums/projectType";
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

export default function CreateTaskCategoryModal({ success }) {
  const params = useParams();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    englishDescription: "",
    englishDescriptionError: { hasError: false, label: "" },
    projectType: 0,
    projectTypeError: { hasError: false, label: "" },
    iconImage: null,
    iconImageError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "projectType":
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
      case "iconImage":
        const validFile = checkValidUrl(value);
        console.log(field)
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
        break;
      case "englishName":
      case "description":
      case "englishDescription":
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
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
    try {
      const response = await createTaskCategory(formData);
      toast.success("Thêm thành công!");
      console.log(response);
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
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

    setOpenModal(false);
    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Tạo"
      title="Tạo phân loại công việc"
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
          subtitle="Nhập tên danh mục"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/* ENGLISH NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên tiếng Anh"
          subtitle="Nhập tên tiếng Anh (nếu có)"
          value={formData.englishName}
          error={formData.englishNameError.hasError}
          errorLabel={formData.englishNameError.label}
          onChange={(e) => handleInputChange("englishName", e.target.value)}
        ></TextForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mô tả"
          subtitle="Nhập mô tả cho thiết kế dự án"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>

      {/* ENGLISH DESCRIPTION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mô tả tiếng Anh"
          subtitle="Nhập mô tả tiếng Anh (nếu có)"
          value={formData.englishDescription}
          error={formData.englishDescriptionError.hasError}
          errorLabel={formData.englishDescriptionError.label}
          onChange={(e) =>
            handleInputChange("englishDescription", e.target.value)
          }
        ></TextForm>
      </Grid>

      {/* PROJECT TYPE */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Loại dự án"
          required
          subtitle="Nhập loại dự án"
          value={formData.projectType}
          options={projectTypeOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.projectTypeError.hasError}
          errorLabel={formData.projectTypeError.label}
          onChange={(value) => handleInputChange("projectType", value)}
        ></SelectForm>
      </Grid>

      {/* ICON IMAGE */}
      <Grid item xs={12} lg={6}>
        <FileForm
          title="Biểu tượng"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Chọn biểu tượng minh họa"
          value={formData.iconImage}
          error={formData.iconImageError.hasError}
          errorLabel={formData.iconImageError.label}
          onChange={(file) => handleInputChange("iconImage", file)}
        ></FileForm>
      </Grid>
    </FormModal>
  );
}
