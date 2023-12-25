"use client";

import { useState } from "react";
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
import { createTaskCategory } from "../../../../api/taskCategoryServices";
import projectTypeOptions from "../../../../constants/enums/projectType";

export default function CreateTaskCategoryModal({ success }) {
    const params = useParams();

    const [formData, setFormData] = useState({
        name: "",
        nameError: { hasError: false, label: "" },
        englishName: "",
        englishNameError: { hasError: false, label: "" },
        description: "",
        descriptionError: { hasError: false, label: "" },
        englishDescription: "",
        englishDescriptionError: { hasError: false, label: "" },
        projectType: -1,
        projectTypeError: { hasError: false, label: "" },
        iconImage: null,
        iconImageError: { hasError: false, label: "" },
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
        console.log(formData)
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

    return (
        <FormModal
            buttonLabel="Tạo"
            title="Tạo phân loại công việc"
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
                    onChange={(e) => handleInputChange("englishDescription", e.target.value)}
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
                    required
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