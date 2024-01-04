"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import FileForm from "/components/shared/Forms/File";
import { createProjectCategory } from "/services/projectCategoryServices";
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

export default function CreateProjectCategoryModal({ success }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    iconImage: null,
    iconImageError: { hasError: false, label: "" },
    isHidden: false,
    isHiddenError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
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
      case "englishName":
      case "isHidden":
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

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    console.log(formData);
    try {
      const response = await createProjectCategory(formData);
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

    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo phân loại dự án"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      disableCloseOnSubmit={formHasError}
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

      {/* ENGLISH NAME */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Tên tiếng Anh"
          subtitle="Nhập tên tiếng Anh (nếu có)"
          value={formData.englishName}
          error={formData.englishNameError.hasError}
          errorLabel={formData.englishNameError.label}
          onChange={(e) => handleInputChange("englishName", e.target.value)}
        ></TextForm>
      </Grid>

      {/* IS HIDDEN */}
      <Grid item xs={12} lg={12}>
        <CheckboxForm
          required
          title="Ẩn"
          subtitle="Check vào ô nếu muốn ẩn"
          value={formData.isHidden}
          onChange={(e) => handleInputChange("isHidden", e.target.checked)}
        ></CheckboxForm>
      </Grid>

      {/* ICON IMAGE */}
      <Grid item xs={12} lg={12}>
        <FileForm
          title="Biểu tượng"
          titleSpan={4}
          fieldSpan={8}
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
