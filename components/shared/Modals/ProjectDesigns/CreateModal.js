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
import { createProjectDesign } from "../../../../api/ProjectDesignServices";
import projectTypeOptions from "../../../../constants/enums/projectType";

export default function CreateProjectDesignModal({ onCreate }) {
    const params = useParams();

    const [formData, setFormData] = useState({
        minBudget: 0,
        minBudgetError: { hasError: false, label: "" },
        maxBudget: 0,
        maxBudgetError: { hasError: false, label: "" },
        estimateBusinessDay: 0,
        estimateBusinessDayError: { hasError: false, label: "" },
        name: "",
        nameError: { hasError: false, label: "" },
        description: "",
        descriptionError: { hasError: false, label: "" },
        projectType: "",
        projectTypeError: { hasError: false, label: "" },
        isHidden: false,
        isHiddenError: { hasError: false, label: "" },
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
            const response = await createProjectDesign(formData);
            toast.success("Thêm thành công!");
            console.log(response)
            // router.push(`/roomTypes/${response?.id}`);
        } catch (error) {
            console.error("Error :", error);
            toast.error("Lỗi!");
        }
    };

    return (
        <FormModal
            buttonLabel="Tạo"
            title="Tạo phân loại dự án"
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

            {/* MIN BUDGET */}
            <Grid item xs={12} lg={6}>
                <NumberForm
                    title="Ngân sách tối thiểu"
                    required
                    subtitle="Nhập số tiền tối thiểu"
                    value={formData.minBudget}
                    error={formData.minBudgetError.hasError}
                    errorLabel={formData.minBudgetError.label}
                    onChange={(value) => handleInputChange("minBudget", value)}
                    endAdornment={<>VND</>}
                ></NumberForm>
            </Grid>

            {/* MAX BUDGET */}
            <Grid item xs={12} lg={6}>
                <NumberForm
                    title="Ngân sách tối đa"
                    required
                    subtitle="Nhập số tiền tối đa"
                    value={formData.maxBudget}
                    error={formData.maxBudgetError.hasError}
                    errorLabel={formData.maxBudgetError.label}
                    onChange={(value) => handleInputChange("maxBudget", value)}
                    endAdornment={<>VND</>}
                ></NumberForm>
            </Grid>

            {/* ESTIMATE BUSINESS DAY */}
            <Grid item xs={12} lg={6}>
                <NumberForm
                    title="Ngày hoàn thành dự kiến"
                    required
                    subtitle="Nhập số ngày"
                    value={formData.estimateBusinessDay}
                    error={formData.estimateBusinessDayError.hasError}
                    errorLabel={formData.estimateBusinessDayError.label}
                    onChange={(value) => handleInputChange("estimateBusinessDay", value)}
                    endAdornment={<>Ngày</>}
                ></NumberForm>
            </Grid>

            {/* IS HIDDEN */}
            <Grid item xs={12} lg={6}>
                <CheckboxForm
                    title="Ẩn"
                    subtitle="Check vào ô nếu muốn ẩn"
                    value={formData.isHidden}
                    onChange={(e) => handleInputChange("isHidden", e.target.checked)}
                ></CheckboxForm>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
                <TextForm
                    titleSpan={3}
                    fieldSpan={9}
                    title="Mô tả"
                    subtitle="Nhập mô tả cho thiết kế dự án"
                    value={formData.description}
                    error={formData.descriptionError.hasError}
                    errorLabel={formData.descriptionError.label}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                ></TextForm>
            </Grid>

        </FormModal>
    );
}