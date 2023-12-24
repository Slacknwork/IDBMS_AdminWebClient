import { useEffect, useState } from "react";
import { Autocomplete, FormControl, Grid, TextField, Typography } from "@mui/material";
import TextForm from "../../Forms/Text";
import SelectForm from "../../Forms/Select";
import FormModal from "../Form";
import { } from "/api/notificationServices";
import { toast } from "react-toastify";
import notificationCategoryOptions from "/constants/enums/notificationCategory";
import { createNotificationForProject } from "/api/notificationServices";
import { getUsersByParticipationInProject } from "/api/projectParticipationServices";
import { useParams } from "next/navigation";
import participationRoleOptions from "../../../../constants/enums/participationRole";

export default function CreateNotificationModalForProject() {

    const params = useParams();

    const [formData, setFormData] = useState({
        category: "",
        categoryError: { hasError: false, label: "" },
        content: "",
        contentError: { hasError: false, label: "" },
        listUserId: [],
        listUserIdError: { hasError: false, label: "" },
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

        const userIds = formData.listUserId.map((participation) => participation?.user?.id);

        try {
            const response = await createNotificationForProject(params.id, { ...formData, listUserId: userIds });
            toast.success("Gửi thành công!");
            console.log(response);
            handleClose();
        } catch (error) {
            console.error("Error :", error);
            toast.error("Lỗi!");
        }
    };

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    // FETCH OPTIONS
    const fetchOptionsFromApi = async () => {
        const fetchUsers = async () => {
            try {
                const response = await getUsersByParticipationInProject({ projectId: params.id });
                console.log(response);
                setUsers(response || []);

            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Lỗi nạp dữ liệu 'Thành viên' từ hệ thống");
            }
        };
        await Promise.all([
            fetchUsers(),
        ]);
        setLoading(false);
    };

    useEffect(() => {
        fetchOptionsFromApi();
    }, []);

    return (
        <FormModal
            buttonLabel="Gửi thông báo"
            title="Gửi thông báo cho thành viên dự án"
            submitLabel="Gửi"
            onSubmit={handleCreate}
        >
            {/* CATEGORY */}
            <Grid item xs={12} lg={12}>
                <SelectForm
                    title="Loại thông báo"
                    subtitle="Chọn loại thông báo"
                    value={formData.category}
                    options={notificationCategoryOptions}
                    error={formData.categoryError.hasError}
                    errorLabel={formData.categoryError.label}
                    onChange={(value) => handleInputChange("category", value)}
                ></SelectForm>
            </Grid>

            {/* CONTENT */}
            <Grid item xs={12} lg={12}>
                <TextForm
                    fullWidth
                    multiline
                    title="Nội dung"
                    subtitle="Nhập nội dung thông báo"
                    value={formData.content}
                    error={formData.content.hasError}
                    errorLabel={formData.contentError.label}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                ></TextForm>
            </Grid>

            {/* USER */}
            <Grid item xs={12} lg={12}>
                <Grid container>
                    <Grid item xs={4} lg={4}>
                        <Typography variant="h5">
                            Thành viên
                            <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Typography variant="p">Chọn người tham gia dự án</Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                        <FormControl fullWidth>
                            <Autocomplete
                                multiple
                                options={users}
                                getOptionLabel={(option) => `${option?.user?.name} - ${participationRoleOptions[option?.role]}`}
                                noOptionsText="Không tìm thấy"
                                value={formData.listUserId}
                                onChange={(event, values) => handleInputChange("listUserId", values)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Danh sách thành viên trong dự án.."
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

        </FormModal>
    );
}
