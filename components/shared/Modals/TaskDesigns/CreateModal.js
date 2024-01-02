"use client";

import { useEffect, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import FileForm from "/components/shared/Forms/File";
import { createTaskDesign } from "../../../../services/taskDesignServices";
import projectTypeOptions from "../../../../constants/enums/projectType";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import { getAllTaskCategories } from "../../../../services/taskCategoryServices";
import { getAllInteriorItemCategories } from "../../../../services/interiorItemCategoryServices";

export default function CreateTaskDesignModal({ success }) {
  const params = useParams();

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
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    handleInputError(field, false, "");
  };
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleCreate = async () => {
    console.log(formData);
    try {
      const response = await createTaskDesign(formData);
      toast.success("Thêm thành công!");
      console.log(response);
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [loading, setLoading] = useState(true);
  const [taskCategories, setTaskCategories] = useState([]);
  const [itemCategories, setItemCategories] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchTaskCategories = async () => {
      try {
        const response = await getAllTaskCategories();
        console.log(response);
        setTaskCategories(response.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    const fetchItemCategories = async () => {
      try {
        const response = await getAllInteriorItemCategories();
        console.log(response);
        setItemCategories(response.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    };
    await Promise.all([fetchTaskCategories(), fetchItemCategories()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo thiết kế công việc"
      submitLabel="Tạo"
      onSubmit={handleCreate}
      size="big"
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
          onChange={(value) => handleInputChange("estimatePricePerUnit", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
      </Grid>

      {/* INTERIOR ITEM CATEGORY ID */}
      <Grid item xs={12} lg={6}>
        <AutocompleteForm
          title="Danh mục nội thất"
          subtitle="Chọn danh mục nội thất"
          value={formData.interiorItemCategoryId}
          options={itemCategories}
          error={formData.interiorItemCategoryIdError.hasError}
          errorLabel={formData.interiorItemCategoryIdError.label}
          onChange={(value) =>
            handleInputChange("interiorItemCategoryId", value)
          }
        ></AutocompleteForm>
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

      {/* CODE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mã"
          required
          subtitle="Nhập mã"
          value={formData.code}
          error={formData.codeError.hasError}
          errorLabel={formData.codeError.label}
          onChange={(e) => handleInputChange("code", e.target.value)}
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
