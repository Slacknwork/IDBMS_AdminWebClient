"use client";

import { useEffect, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import { createAdmin } from "../../../../api/AdminServices";

import adminStatusOptions from "/constants/enums/adminStatus";

export default function CreateAdminModal({ success }) {
    const params = useParams();

    const [formData, setFormData] = useState({
        name: "",
        nameError: { hasError: false, label: "" },
        username: "",
        usernameError: { hasError: false, label: "" },
        email: "",
        emailError: { hasError: false, label: "" },
        password: "",
        passwordError: { hasError: false, label: "" },
        creatorId: "0a93a6c1-8267-4d60-8c6d-c8e25c8f8f22",
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
            const response = await createAdmin(formData);
            toast.success("Thêm thành công!");
            console.log(response)
            success(true);
        } catch (error) {
            console.error("Error :", error);
            toast.error("Lỗi!");
        }
    };

    return (
        <FormModal
            buttonLabel="Tạo"
            title="Tạo người quản lý"
            submitLabel="Tạo"
            onSubmit={handleCreate}
            size="big"
        >
            {/* TÊN */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Họ và Tên"
                    required
                    subtitle="Nhập họ và tên quản lý"
                    value={formData.name}
                    error={formData.nameError.hasError}
                    errorLabel={formData.nameError.label}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                ></TextForm>
            </Grid>

            {/* TÊN ĐĂNG NHẬP */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Tên đăng nhập"
                    required
                    subtitle="Nhập username quản lý"
                    value={formData.username}
                    error={formData.usernameError.hasError}
                    errorLabel={formData.usernameError.label}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                ></TextForm>
            </Grid>

            {/* EMAIL */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Email"
                    required
                    subtitle="Nhập email"
                    value={formData.email}
                    error={formData.emailError.hasError}
                    errorLabel={formData.emailError.label}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                ></TextForm>
            </Grid>

            {/* MẬT KHẨU */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Mật khẩu"
                    required
                    subtitle="Nhập mật khẩu"
                    value={formData.password}
                    error={formData.passwordError.hasError}
                    errorLabel={formData.passwordError.label}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                ></TextForm>
            </Grid>

            {/* TRẠNG THÁI */}
            {/* <Grid item xs={12} lg={6}>
                <SelectForm
                    title="Trạng thái"
                    required
                    subtitle="Nhập trạng thái"
                    value={formData.status}
                    options={adminStatusOptions}
                    defaultLabel="Chọn một..."
                    error={formData.statusError.hasError}
                    errorLabel={formData.statusError.label}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                ></SelectForm>
            </Grid> */}

        </FormModal>
    );
}