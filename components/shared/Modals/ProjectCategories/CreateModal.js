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
import { createProjectCategory } from "../../../../api/projectCategoryServices";

export default function CreateProjectCategoryModal({ onCreate }) {
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
            const response = await createProjectCategory(formData);
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

            {/* IS HIDDEN */}
            <Grid item xs={12} lg={6}>
                <CheckboxForm
                    title="Ẩn"
                    subtitle="Check vào ô nếu muốn ẩn"
                    value={formData.isHidden}
                    onChange={(e) => handleInputChange("isHidden", e.target.checked)}
                ></CheckboxForm>
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