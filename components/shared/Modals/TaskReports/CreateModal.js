"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
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

import { createTaskReport } from "/services/taskReportServices";
import { getProjectTaskById } from "/services/projectTaskServices";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import checkValidField from "/components/validations/field";
import checkValidUrl from "/components/validations/url";

export default function CreateReportModal({ success }) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
  const [task, setTask] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    unitUsed: 0,
    unitUsedError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    documentList: [],
    projectTaskId: params.taskId,
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "percentage":
        if (value < task?.percentage) value = task?.percentage;
        setFormData((prevData) => ({
          ...prevData,
          unitUsed: (task?.unitInContract * (value / 100)).toFixed(2),
        }));
        break;
      case "name":
      case "unitUsed":
        const result = checkValidField(value);

        if (result.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: result.label,
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
      case "documentList":
        const validFile = checkValidUrl(value);
        if (validFile.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validFile.label,
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
      case "description":
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
          [`${field}Error`]: {
            hasError: false,
            label: "",
          },
        }));
        break;
      default:
    }
  };

  const handleFileInputChange = (files) => {
    const filesArray = Array.from(files).map((file) => ({
      name: file.name,
      document: file,
    }));
    setFormData((prevData) => ({
      ...prevData,
      documentList: [...prevData.documentList, ...filesArray],
    }));
  };
  const handleRemoveFile = (index) => {
    const newFiles = [...formData.documentList];
    newFiles.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      documentList: newFiles,
    }));
  };

  const handleFileButtonClick = () => {
    // Trigger click on the file input
    document.getElementById("fileInput").click();
  };

  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    try {
      if (!switchSubmit) return;
      const response = await createTaskReport(params.id, formData, params.id);
      toast.success("Thêm thành công!");
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const fetchTask = async () => {
    try {
      const task = await getProjectTaskById(params.taskId, params.id);
      setTask(task);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi nạp dữ liệu 'Công việc' từ hệ thống!");
    }
  };

  useEffect(() => {
    fetchTask();
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    setOpenModal(false);
    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Tạo"
      title="Tạo báo cáo"
      submitLabel="Tạo"
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit
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
              startAdornment={
                <>
                  {task?.unitUsed}
                  <Typography variant="p" sx={{ mx: 1 }}>
                    +
                  </Typography>
                </>
              }
              endAdornment={
                <>
                  <Typography variant="p" sx={{ mx: 1 }}>
                    =
                  </Typography>
                  {task?.unitUsed + formData.unitUsed}
                  <Typography variant="p" sx={{ mx: 1 }}>
                    /
                  </Typography>
                  {task?.unitInContract}
                  <Typography variant="p" sx={{ mx: 1 }}>
                    ({calculationUnitOptions[task?.calculationUnit]})
                  </Typography>
                </>
              }
            ></NumberSimpleForm>
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
          {formData.documentList && formData.documentList.length > 0 ? (
            <List>
              {formData.documentList?.map((file, index) => (
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
