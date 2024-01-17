"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
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
import { createAdvertisementProject } from "/services/advertisementServices"
import NumberForm from "/components/shared/Forms/Number";
import checkValidField from "/components/validations/field"
import checkValidEmail from "/components/validations/email"
import checkValidPhone from "/components/validations/phone"

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
    language: 0,
    languageError: { hasError: false, label: "" },
    projectCategoryId: null,
    projectCategoryIdError: { hasError: false, label: "" },
    finalPrice: 0,
    finalPriceError: { hasError: false, label: "" },
    estimatedPrice: 0,
    estimatedPriceError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
    createdAdminUsername: admin?.username || "",
    createdByAdminId: admin?.id || "",
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
      case "area":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "language":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "finalPrice":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "estimatedPrice":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
        });

        break;
      case "estimateBusinessDay":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
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

  // SUBMIT FORM
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
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

  const [loading, setLoading] = useState(true);
  const [projectCategories, setProjectCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchProjectCategories = async () => {
      try {
        const response = await getProjectCategories();
        setProjectCategories(response?.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân loại dự án' từ hệ thống");
      }
    };
    await Promise.all([fetchProjectCategories()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  const handleCreate = async () => {
    console.log(formData);
    try {
      const response = await createAdvertisementProject(formData);
      console.log(response);
      toast.success("Thêm thành công!");
      router.push(`/advertisement/${response.id}`);
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

      {/* ESTIMATE PRICE */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Giá ước tính"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          subtitle="Nhập giá ước tính của dự án"
          value={formData.estimatedPrice}
          error={formData.estimatedPriceError.hasError}
          errorLabel={formData.estimatedPriceError.label}
          onChange={(value) => handleInputChange("estimatedPrice", value)}
          endAdornment={<>₫</>}
        ></NumberForm>
      </Grid>

      {/* FINAL PRICE */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Giá cuối cùng"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          subtitle="Nhập giá cuối cùng của dự án"
          value={formData.finalPrice}
          error={formData.finalPriceError.hasError}
          errorLabel={formData.finalPriceError.label}
          onChange={(value) => handleInputChange("finalPrice", value)}
          endAdornment={<>₫</>}
        ></NumberForm>
      </Grid>

      {/* AREA */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Diện tích"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          subtitle="Nhập diện tích của sản phẩm"
          value={formData.area}
          error={formData.areaError.hasError}
          errorLabel={formData.areaError.label}
          onChange={(value) => handleInputChange("area", value)}
          endAdornment={<>m²</>}
        ></NumberForm>
      </Grid>

      {/* ESTIMATE BUSINESS DAY */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Ngày làm việc ước tính"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          required
          subtitle="Nhập số ngày làm việc ước tính để hoàn thành"
          value={formData.estimateBusinessDay}
          error={formData.estimateBusinessDayError.hasError}
          errorLabel={formData.estimateBusinessDayError.label}
          onChange={(value) => handleInputChange("estimateBusinessDay", value)}
          endAdornment={<>ngày</>}
        ></NumberForm>
      </Grid>

    </FormModal>
  );
}
