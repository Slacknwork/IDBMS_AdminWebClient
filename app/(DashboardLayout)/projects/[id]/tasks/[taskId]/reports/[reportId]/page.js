"use client";

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
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import DetailsPage from "/components/shared/DetailsPage";
import PageContainer from "/components/container/PageContainer";
import TextForm from "/components/shared/Forms/Text";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";

import { toast } from "react-toastify";

import {
  getTaskReportById,
  updateTaskReport,
  deleteTaskReport,
} from "/services/taskReportServices";
import { downloadFileByUrl } from "/services/downloadServices";
import {
  createTaskDocument,
  deleteTaskDocument,
} from "/services/taskDocumentServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import checkValidField from "/components/validations/field";
import checkValidUrl from "/components/validations/url";
import MessageModal from "/components/shared/Modals/Message";

export default function ProjectDocumentDetails(projectDocument) {
  const params = useParams();
  const [task, setTask] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    unitUsed: 0,
    unitUsedError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    taskDocuments: [],
    projectTaskId: params.taskId,
  });

  const handleInputChange = (field, value) => {
    let result = { isValid: true, label: "" };

    switch (field) {
      case "name":
        result = checkValidField({
          value: value,
          maxLength: 50,
          required: true,
        });

        break;
      case "unitUsed":
        result = checkValidField({
          value: value,
          minValue: 0,
          required: true,
        });

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
        result = checkValidField({
          value: value,
          maxLength: 750,
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

  const router = useRouter();
  const searchParams = useSearchParams();

  // INIT CONST
  const [loading, setLoading] = useState(true);
  const [projectDocumentTemplates, setProjectDocumentTemplates] = useState([]);

  // FETCH DATA
  const fetchTaskReport = async () => {
    try {
      const response = await getTaskReportById(params.reportId, params.id);
      setFormData((prevData) => ({ ...prevData, ...response }));
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Phân loại công việc' từ hệ thống");
    }
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    await Promise.all([fetchTaskReport()]);
    setLoading(false);
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    try {
      await updateTaskReport(params.reportId, transformedValue);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      toast.error("Lỗi!");
    }
  };
  const handleDelete = async () => {
    try {
      await deleteTaskReport(params.reportId);
      toast.success("Xoá thành công!");
      router.push(`/projects/${params.id}/tasks/${params.taskId}/reports`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const transformData = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === null) {
        result[key] = "";
      }
    }

    return result;
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

    handleSave();
    setSwitchSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchSubmit]);

  useEffect(() => {
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [downloading, setDownloading] = useState(false);
  const onDownloadDocument = async (taskDocument) => {
    setDownloading(true);
    try {
      toast.loading(`Đang tải ${taskDocument.name}`);
      await downloadFileByUrl({
        imageUrl: taskDocument.document,
        name: taskDocument.name,
      });
      toast.dismiss();
    } catch (error) {
      toast.error("Lỗi tải file!");
    }
    setDownloading(false);
  };

  const uploadFile = async (file) => {
    try {
      const taskReportId = params.reportId;
      const projectId = params.id;
      toast.loading(`Đang tải ${file.name}...`);
      await createTaskDocument(
        { name: file.name, document: file },
        taskReportId,
        projectId
      );
      toast.dismiss();
      toast.success("Tải thành công!");
      await fetchDataFromApi();
    } catch (error) {
      toast.dismiss();
      toast.error("Lỗi tải file!");
    }
  };

  const onDeleteDocument = async (document) => {
    try {
      await deleteTaskDocument(document.id, params.id);
      toast.success("Xóa thành công!");
      await fetchDataFromApi();
    } catch (error) {
      toast.dismiss();
      toast.error("Lỗi xóa file!");
    }
  };

  return (
    <PageContainer title={formData.name} description="Báo cáo công việc">
      <DetailsPage
        loading={loading}
        title="Thông tin báo cáo"
        saveMessage="Lưu báo cáo"
        onSave={handleSubmit}
        deleteMessage={"Xoá báo cáo này?"}
        deleteLabel={"Xoá"}
        hasDelete
        onDelete={handleDelete}
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
              onChange={(e) => uploadFile(e.target.files[0])}
            />
          </Box>
          <Box sx={{ mt: 1, width: 1 }}>
            {formData.taskDocuments && formData.taskDocuments.length > 0 ? (
              <List>
                {formData.taskDocuments?.map((file) => (
                  <ListItem
                    key={file.name}
                    secondaryAction={
                      <Box sx={{ display: "flex" }}>
                        <IconButton
                          sx={{ mr: 1 }}
                          disabled={downloading}
                          onClick={() => onDownloadDocument(file)}
                          edge="end"
                          aria-label="delete"
                        >
                          <DownloadIcon />
                        </IconButton>
                        <MessageModal
                          title="Xóa file"
                          iconButton={<DeleteIcon />}
                          onSubmit={() => onDeleteDocument(file)}
                          edge="end"
                          aria-label="delete"
                        >
                          Xóa {file.name}?
                        </MessageModal>
                      </Box>
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
      </DetailsPage>
    </PageContainer>
  );
}
