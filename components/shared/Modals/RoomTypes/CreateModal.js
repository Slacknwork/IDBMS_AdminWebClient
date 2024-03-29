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
import { createRoomType } from "/services/roomTypeServices";
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

export default function CreateRoomTypeModal({ success }) {
  const params = useParams();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
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
    let result = { isValid: true, label: "" }

    switch (field) {
      case "name":
        result = checkValidField({
          value: value,
          maxLength: 50,
          required: true
        });

        break;
      case "pricePerArea":
      case "estimateDayPerArea":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "isHidden":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "iconImage":
      case "image":
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
        result = checkValidField({
          value: value,
          maxLength: 50,
        });

        break;
      case "description":
      case "englishDescription":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
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
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    if (!switchSubmit) return;
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

    setOpenModal(false);
    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Tạo"
      title="Tạo loại phòng"
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
