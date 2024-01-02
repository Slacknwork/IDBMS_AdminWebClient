"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import FileForm from "/components/shared/Forms/File";
import { createRoomType } from "/services/roomTypeServices";

export default function CreateRoomTypeModal({ success }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    image: null,
    imageError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    englishDescription: "",
    englishDescriptionError: { hasError: false, label: "" },
    pricePerArea: 0,
    pricePerAreaError: { hasError: false, label: "" },
    estimateDayPerArea: 0,
    estimateDayPerAreaError: { hasError: false, label: "" },
    isHidden: false,
    isHiddenError: { hasError: false, label: "" },
    iconImage: null,
    iconImageError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "pricePerArea":
      case "estimateDayPerArea":
      case "isHidden":
        if (
          value === null || value === undefined
          || (typeof value === "string" && value.trim() === "")
          || (typeof value === "number" && (field !== "estimateDayPerArea" || field !== "pricePerArea") && value <= 0)
          || (typeof value === "number" && (field === "estimateDayPerArea" || field === "pricePerArea") && value < 0) 
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
      const response = await createRoomType(formData);
      toast.success("Thêm thành công!");
      console.log(response);
      success(true);
      // router.push(`/roomTypes/${response?.id}`);
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
      title="Tạo loại phòng"
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
          subtitle="Nhập tên phòng"
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
          subtitle="Nhập mô tả cho phòng"
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

      {/* PRICE PER AREA */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Giá trên mỗi diện tích"
          required
          subtitle="Nhập giá trên mỗi diện tích"
          value={formData.pricePerArea}
          error={formData.pricePerAreaError.hasError}
          errorLabel={formData.pricePerAreaError.label}
          onChange={(value) => handleInputChange("pricePerArea", value)}
          endAdornment={<>VND/m²</>}
        ></NumberForm>
      </Grid>

      {/* ESTIMATE DAY PER AREA */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số ngày trên diện tích"
          required
          subtitle="Ước tính trên 1 m²"
          value={formData.estimateDayPerArea}
          error={formData.estimateDayPerAreaError.hasError}
          errorLabel={formData.estimateDayPerAreaError.label}
          onChange={(value) => handleInputChange("estimateDayPerArea", value)}
          endAdornment={<>Ngày/m²</>}
        ></NumberForm>
      </Grid>

      {/* IMAGE */}
      <Grid item xs={12} lg={6}>
        <FileForm
          title="Hình ảnh"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Chọn hình ảnh minh họa"
          value={formData.image}
          error={formData.imageError.hasError}
          errorLabel={formData.imageError.label}
          onChange={(file) => handleInputChange("image", file)}
        ></FileForm>
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

      {/* IS HIDDEN */}
      <Grid item xs={12} lg={6}>
        <CheckboxForm
          required
          title="Ẩn"
          subtitle="Check vào ô nếu muốn ẩn"
          value={formData.isHidden}
          onChange={(e) => handleInputChange("isHidden", e.target.checked)}
        ></CheckboxForm>
      </Grid>
    </FormModal>
  );
}
