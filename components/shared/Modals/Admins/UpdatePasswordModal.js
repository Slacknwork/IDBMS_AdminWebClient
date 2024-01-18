"use client";

import { useEffect, useState } from "react";
import {
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";

import { useSelector } from "react-redux";
import { updateAdminPassword } from "/services/authenticationServices";
import checkValidField from "/components/validations/field";

export default function UpdateAdminPasswordModal({ success }) {
    const user = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        userId: user.id,
        oldPassword: "",
        oldPasswordError: { hasError: false, label: "" },
        newPassword: "",
        newPasswordError: { hasError: false, label: "" },
    });

    const handleInputChange = (field, value) => {
        let result = { isValid: true, label: "" }

        switch (field) {
            case "newPassword":
                result = checkValidField({
                    value: value,
                    minLength: 6,
                    maxLength: 20,
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

    const handleUpdate = async () => {
        try {
            await updateAdminPassword(formData);
            toast.success("Cập nhật thành công!");
            typeof success === "function" && success();
        } catch (error) {
            console.error("Error :", error);
            toast.error("Lỗi!");
        }
    };

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

        handleUpdate();
        setSwitchSubmit(false);
    }, [switchSubmit]);

    return (
        <FormModal
            buttonLabel="Cập nhật mật khẩu"
            title="Cập nhật mật khẩu quản lý"
            submitLabel="Cập nhật"
            onSubmit={handleSubmit}
            disableCloseOnSubmit={formHasError}
        >
            {/* PASSWORD */}
            <Grid item xs={12} lg={12}>
                <TextForm
                    title="Mật khẩu mới"
                    required
                    subtitle="Nhập mật khẩu mới"
                    value={formData.newPassword}
                    error={formData.newPasswordError.hasError}
                    errorLabel={formData.newPasswordError.label}
                    onChange={(e) => handleInputChange("newPassword", e.target.value)}
                    password={true}
                ></TextForm>
            </Grid>

        </FormModal>
    );
}
