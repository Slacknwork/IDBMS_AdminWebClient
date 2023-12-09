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

import calculationUnitOptions from "/constants/enums/calculationUnit";

import { createTaskReport } from "/api/taskReportServices";
import { getProjectTaskById } from "/api/projectTaskServices";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import SliderForm from "/components/shared/Forms/Slider";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";

export default function CreateReportModal({ children }) {
  const params = useParams();
  const router = useRouter();

  const [project, setProject] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    percentage: 0,
    calculationUnit: "",
    calculationUnitError: { hasError: false, label: "" },
    unitUsed: 0,
    unitUsedError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    files: [],
    filesError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "percentage":
        if (value < project.percentage) value = project.percentage;
        setFormData((prevData) => ({
          ...prevData,
          unitUsed: (project.unitInContract * (value / 100)).toFixed(2),
        }));
        break;
      default:
    }
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFileInputChange = (files) => {
    const filesArray = Array.from(files);
    setFormData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...filesArray],
    }));
  };
  const handleRemoveFile = (index) => {
    const newFiles = [...formData.files];
    newFiles.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      files: newFiles,
    }));
  };

  const handleFileButtonClick = () => {
    // Trigger click on the file input
    document.getElementById("fileInput").click();
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleCreate = async () => {
    try {
      const response = await createTaskReport(formData);
      toast.success("Thêm thành công!");
      router.push(
        `/projects/${params.id}/tasks/${params.taskId}/reports/${response.data.id}`
      );
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const fetchProject = async () => {
    try {
      const project = await getProjectTaskById(params.taskId);
      setProject(project);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống!");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo báo cáo"
      submitLabel="Tạo"
      onSubmit={handleCreate}
      size="big"
    >
      <Grid item xs={12} lg={6}>
        <Grid container spacing={4}>
          {/* NAME */}
          <Grid item xs={12} lg={12}>
            <TextForm
              title="Tên"
              required
              subtitle="Nhập tên báo cáo"
              value={formData.name}
              error={formData.nameError.hasError}
              errorLabel={formData.nameError.label}
              onChange={(e) => handleInputChange("name", e.target.value)}
            ></TextForm>
          </Grid>

          {/* UNIT USED */}
          <Grid item xs={12} lg={12}>
            <NumberSimpleForm
              title="KL Thực hiện"
              required
              inputProps={{
                min: 0,
              }}
              subtitle="Khối lượng đã sử dụng"
              value={formData.unitUsed}
              error={formData.unitUsedError.hasError}
              errorLabel={formData.unitUsedError.label}
              onChange={(value) => handleInputChange("unitUsed", value)}
              endAdornment={
                <>{calculationUnitOptions[project.calculationUnit]}</>
              }
            ></NumberSimpleForm>
          </Grid>

          <Grid item xs={12} lg={12}>
            <SliderForm
              title="Phần trăm công việc"
              required
              subtitle="Khối lượng đã sử dụng"
              value={formData.percentage}
              onChange={(value) => handleInputChange("percentage", value)}
            ></SliderForm>
          </Grid>

          {/* DESCRIPTION */}
          <Grid item xs={12} lg={12}>
            <TextForm
              title="Mô tả"
              multiline
              rows={4}
              subtitle="Mô tả sơ lược nội dung báo cáo"
              value={formData.description}
              error={formData.descriptionError.hasError}
              errorLabel={formData.descriptionError.label}
              onChange={(e) => handleInputChange("description", e.target.value)}
            ></TextForm>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Tài liệu đính kèm</Typography>
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
          {formData.files && formData.files.length > 0 ? (
            <List>
              {formData.files?.map((file, index) => (
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
                Chưa có tài liệu.
              </Typography>
            </Stack>
          )}
        </Box>
      </Grid>
    </FormModal>
  );
}
