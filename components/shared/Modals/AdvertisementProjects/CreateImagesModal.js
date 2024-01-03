"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import { createAdvertisementImages } from "/services/advertisementServices";
import CheckboxForm from "/components/shared/Forms/Checkbox";

export default function CreateImagesModal({ success }) {
    const params = useParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        imageList: [],
        projectId: params.id,
        isPublicAdvertisement: true,
    });

    const handleInputChange = (field, value) => {
        switch (field) {
            case "imageList":
                if (!(Array.isArray(value) && value.length > 0)) {
                    setFormData((prevData) => ({
                        ...prevData,
                        [field]: value,
                        [`${field}Error`]: {
                            hasError: true,
                            label: "Không được để trống!",
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
            default:
        }
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleFileInputChange = (files) => {
        setFormData((prevData) => ({
            ...prevData,
            imageList: [...prevData.imageList, ...files],
        }));
    };
    const handleRemoveFile = (index) => {
        const newFiles = [...formData.imageList];
        newFiles.splice(index, 1);
        setFormData((prevData) => ({
            ...prevData,
            imageList: newFiles,
        }));
    };

    const handleFileButtonClick = () => {
        // Trigger click on the file input
        document.getElementById("fileInput").click();
    };

    const [formHasError, setFormHasError] = useState(true);
    const [switchSubmit, setSwitchSubmit] = useState(false);

    const handleSubmit = () => {
        for (const field in formData) {
            handleInputChange(field, formData[field]);
        }
        setSwitchSubmit(true);
    };

    const handleCreate = async () => {
        try {
            const response = await createAdvertisementImages(params.id, formData);
            toast.success("Thêm thành công!");
            success(true)
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

        handleCreate();
        setSwitchSubmit(false);
    }, [switchSubmit]);

    return (
        <FormModal
            buttonLabel="Tạo"
            title="Tạo hình ảnh minh họa"
            submitLabel="Tạo"
            onSubmit={handleSubmit}
            disableCloseOnSubmit={formHasError}
        >

            {/* IS PUBLIC */}
            <Grid item xs={12} lg={12}>
                <CheckboxForm
                    title="Trạng thái công khai"
                    subtitle="Check vào ô nếu muốn công khai hình ảnh này"
                    checked={formData.isPublicAdvertisement}
                    onChange={(e) =>
                        handleInputChange("isPublicAdvertisement", e.target.checked)
                    }
                ></CheckboxForm>
            </Grid>

            {/* ADVERTISEMENT IMAGE */}
            <Grid item xs={12} lg={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5">Hình ảnh minh họa</Typography>
                    <Button
                        disableElevation
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleFileButtonClick}
                        endIcon={<FileUploadIcon />}
                    >
                        Tải
                    </Button>
                    {/* Hiding the input */}
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => handleFileInputChange(e.target.files)}
                    />
                </Box>
                <Box sx={{ mt: 1, width: 1 }}>
                    {formData.imageList && formData.imageList.length > 0 ? (
                        <List>
                            {formData.imageList?.map((file, index) => (
                                <ListItem
                                    key={file.name}
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleRemoveFile(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon>
                                        <InsertDriveFileIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={file.name} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Stack sx={{ my: 5 }}>
                            <Typography variant="p" sx={{ textAlign: "center" }}>
                                Không có dữ liệu.
                            </Typography>
                        </Stack>
                    )}
                </Box>
            </Grid>
        </FormModal>
    );
}
