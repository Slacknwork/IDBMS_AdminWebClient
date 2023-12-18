"use client";

import { useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import { createSite } from "/api/siteServices";

export default function CreateSiteModal({ onCreate }) {
    const params = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        nameError: { hasError: false, label: "" },
        address: "",
        addressError: { hasError: false, label: "" },
        contactName: "",
        contactNameError: { hasError: false, label: "" },
        contactLocation: "",
        contactLocationError: { hasError: false, label: "" },
        contactPhone: "",
        contactPhoneError: { hasError: false, label: "" },
        contactEmail: "",
        contactEmailError: { hasError: false, label: "" },
        companyCode: "",
        companyCodeError: { hasError: false, label: "" },
        description: "",
        descriptionError: { hasError: false, label: "" },
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
        try {
            const response = await createSite(formData);
            console.log(response);
            if (response.data != null) {
                toast.success("Thêm thành công!");
                router.push(`/sites/${response.data.id}`);
            } else {
                throw new Error("Create failed!");
            }
        } catch (error) {
            console.error("Error :", error);
            toast.error("Lỗi!");
        }
    };

    return (
        <FormModal
            buttonLabel="Tạo"
            title="Tạo khu công trình"
            submitLabel="Tạo"
            onSubmit={handleCreate}
            size="big"
        >
            {/* NAME */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Tên"
                    required
                    subtitle="Tên khu công trình"
                    value={formData.name}
                    error={formData.nameError.hasError}
                    errorLabel={formData.nameError.label}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                />
            </Grid>

            {/* CONTACT NAME */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Tên người đại diện"
                    required
                    subtitle="Nhập họ và tên người đại diện"
                    value={formData.contactName}
                    error={formData.contactNameError.hasError}
                    errorLabel={formData.contactNameError.label}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                />
            </Grid>

            {/* ADDRESS */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Địa chỉ"
                    required
                    subtitle="Nhập địa chỉ công trình"
                    value={formData.address}
                    error={formData.addressError.hasError}
                    errorLabel={formData.addressError.label}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                />
            </Grid>

            {/* CONTACT EMAIL */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Email"
                    required
                    subtitle="Nhập email liên hệ"
                    value={formData.contactEmail}
                    error={formData.contactEmailError.hasError}
                    errorLabel={formData.contactEmailError.label}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                />
            </Grid>

            {/* CONTACT LOCATION */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Địa chỉ liên hệ"
                    required
                    subtitle="Nhập địa chỉ liên hệ với người đại diện"
                    value={formData.contactLocation}
                    error={formData.contactLocationError.hasError}
                    errorLabel={formData.contactLocationError.label}
                    onChange={(e) => handleInputChange("contactLocation", e.target.value)}
                />
            </Grid>

            {/* CONTACT PHONE */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Số điện thoại"
                    required
                    subtitle="Nhập số điện thoại liên hệ"
                    value={formData.contactPhone}
                    error={formData.contactPhoneError.hasError}
                    errorLabel={formData.contactPhoneError.label}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                />
            </Grid>

            {/* COMPANY CODE */}
            <Grid item xs={12} lg={6}>
                <TextForm
                    title="Mã công ty"
                    subtitle="Nhập mã số doanh nghiệp của công ty"
                    value={formData.companyCode}
                    error={formData.companyCodeError.hasError}
                    errorLabel={formData.companyCodeError.label}
                    onChange={(e) => handleInputChange("companyCode", e.target.value)}
                />
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
                <TextForm
                    multiline
                    rows={4}
                    title="Mô tả"
                    subtitle="Mô tả chi tiết"
                    value={formData.description}
                    error={formData.descriptionError.hasError}
                    errorLabel={formData.descriptionError.label}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                />
            </Grid>
        </FormModal>
    );
}
