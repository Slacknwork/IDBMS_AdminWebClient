"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import languageOptions from "/constants/enums/language";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import SelectForm from "/components/shared/Forms/Select";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import FileForm from "/components/shared/Forms/File";
import calculationUnitOptions from "../../../../../constants/enums/calculationUnit";
import { getAllTaskCategories } from "../../../../../services/taskCategoryServices";
import { getAllInteriorItemCategories } from "../../../../../services/interiorItemCategoryServices";
import checkValidField from "/components/validations/field"

import {
  getTaskDesignById,
  updateTaskDesign,
  deleteTaskDesign,
} from "../../../../../services/taskDesignServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AutocompleteForm from "../../../../../components/shared/Forms/Autocomplete";

export default function TaskDesignDetails() {
  const [formData, setFormData] = useState({
    code: "",
    codeError: { hasError: false, label: "" },
    name: "",
    nameError: { hasError: false, label: "" },
    englishName: "",
    englishNameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    englishDescription: "",
    englishDescriptionError: { hasError: false, label: "" },
    calculationUnit: -1,
    calculationUnitError: { hasError: false, label: "" },
    estimatePricePerUnit: 0,
    estimatePricePerUnitError: { hasError: false, label: "" },
    interiorItemCategoryId: null,
    interiorItemCategoryIdError: { hasError: false, label: "" },
    taskCategoryId: null,
    taskCategoryIdError: { hasError: false, label: "" },
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
      case "calculationUnit":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "estimatePricePerUnit":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          requred: true
        });

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
      case "interiorItemCategoryId":
      case "taskCategoryId":
        result = checkValidField({
          value: value,
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

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [loading, setLoading] = useState(true);
  const [taskCategories, setTaskCategories] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };
  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchTaskDesign = async () => {
      try {
        const response = await getTaskDesignById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thiết kế công việc' từ hệ thống");
      }
    };
    const fetchTaskCategories = async () => {
      try {
        const response = await getAllTaskCategories();
        console.log(response);
        setTaskCategories(response.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân loại công việc' từ hệ thống");
      }
    };
    const fetchItemCategories = async () => {
      try {
        const response = await getAllInteriorItemCategories();
        console.log(response);
        setItemCategories(response.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Phân loại sản phẩm' từ hệ thống");
      }
    };
    await Promise.all([
      fetchTaskDesign(),
      fetchTaskCategories(),
      fetchItemCategories(),
    ]);
    setLoading(false);
  };



  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateTaskDesign(params.id, transformedValue);
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
      const response = await deleteTaskDesign(params.id);
      console.log(response);
      toast.success("Xoá thành công!");
      window.location.replace("/system/task-designs");
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
        title={`Thông tin thiết kế công việc${formData.code ? ` mã ${formData.code}` : ''}`}
        saveMessage="Lưu thông tin thiết kế công việc?"
        onSave={handleSubmit}
        deleteMessage={"Xoá thiết kế công việc này?"}
        deleteLabel={"Xoá"}
        hasDelete
        onDelete={handleDelete}
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
            subtitle="Nhập mô tả cho thiết kế công việc"
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

        {/* CALCULATION UNIT */}
        <Grid item xs={12} lg={6}>
          <SelectForm
            title="Đơn vị tính"
            required
            subtitle="Chọn đơn vị tính"
            value={formData.calculationUnit}
            options={calculationUnitOptions}
            error={formData.calculationUnitError.hasError}
            errorLabel={formData.calculationUnitError.label}
            onChange={(value) => handleInputChange("calculationUnit", value)}
          ></SelectForm>
        </Grid>

        {/* ESTIMATE PRICE PER UNIT */}
        <Grid item xs={12} lg={6}>
          <NumberForm
            title="Ước tính giá mỗi đơn vị"
            required
            subtitle="Nhập số tiền"
            value={formData.estimatePricePerUnit}
            error={formData.estimatePricePerUnitError.hasError}
            errorLabel={formData.estimatePricePerUnitError.label}
            onChange={(value) =>
              handleInputChange("estimatePricePerUnit", value)
            }
            endAdornment={<>VND</>}
          ></NumberForm>
        </Grid>

        {/* TASK CATEGORY ID */}
        <Grid item xs={12} lg={6}>
          <AutocompleteForm
            title="Danh mục công việc"
            subtitle="Chọn danh mục công việc"
            value={formData.taskCategoryId}
            options={taskCategories}
            error={formData.taskCategoryIdError.hasError}
            errorLabel={formData.taskCategoryIdError.label}
            onChange={(value) => handleInputChange("taskCategoryId", value)}
          ></AutocompleteForm>
        </Grid>


        <Grid item xs={12} lg={4}>
          {/* Additional details can be added here */}
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
