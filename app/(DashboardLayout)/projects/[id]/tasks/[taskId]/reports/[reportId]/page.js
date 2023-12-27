"use client";

import { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import projectDocumentCategoryOptions from "/constants/enums/projectDocumentCategory";
import {getAllProjectDocumentTemplates} from "/api/projectDocumentTemplateServices";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import DetailsPage from "/components/shared/DetailsPage";
import PageContainer from "/components/container/PageContainer";
import SelectForm from "/components/shared/Forms/Select";
import FileForm from "/components/shared/Forms/File";
import CheckForm from "/components/shared/Forms/Checkbox";
import TextForm from "/components/shared/Forms/Text";
import FormModal from "/components/shared/Modals/Form";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";

import { toast } from "react-toastify";

import {
  getTaskReportById,
  updateTaskReport,
  deleteTaskReport,
} from "/api/taskReportServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";


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
      documentList: [],
      projectTaskId: params.taskId,
    });

    const handleInputChange = (field, value) => {
      switch (field) {
        case "percentage":
          if (value < task.percentage) value = task.percentage;
          setFormData((prevData) => ({
            ...prevData,
            unitUsed: (task.unitInContract * (value / 100)).toFixed(2),
          }));
          break;
        default:
      }
      setFormData((prevData) => ({ ...prevData, [field]: value }));
      handleInputError(field, false, "");
    };

    const handleInputError = (field, hasError, label) => {
        setFormData((prevData) => ({
            ...prevData,
            [`${field}Error`]: { hasError, label },
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
    const fetchDataFromApi = async () => {
        const fetchTaskReport = async () => {
            try {
                const response = await getTaskReportById(params.reportId);
                console.log(response);
                setFormData((prevData) => ({ ...prevData, ...response }));
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Lỗi nạp dữ liệu 'phân loại công việc' từ hệ thống");
            }
        };
        
        await Promise.all([
          fetchTaskReport(),
        ]);
        setLoading(false);
    };

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    // HANDLE BUTTON CLICK
    const handleSave = async () => {
        const transformedValue = transformData(formData);
        console.log(transformedValue);

        try {
            const response = await updateTaskReport(params.reportId, transformedValue);
            console.log(response);
            toast.success("Cập nhật thành công!");
        } catch (error) {
            console.error("Error :", error);
            toast.error("Lỗi!");
        }
    };
    const handleDelete = async () => {
        try {
            const response = await deleteTaskReport(
              params.reportId
            );
            console.log(response);
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

    return (
        <PageContainer title={formData.name} description="Chi tiết thiết kế công việc">
            <DetailsPage
                title="Thông tin thiết kế công việc"
                saveMessage="Lưu thông tin thiết kế công việc?"
                onSave={handleSave}
                deleteMessage={"Xoá thiết kế công việc này?"}
                deleteLabel={"Xoá"}
                hasDelete
                onDelete={handleDelete}
            >
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
                  {task.unitUsed + formData.unitUsed}
                  <Typography variant="p" sx={{ mx: 1 }}>
                    /
                  </Typography>
                  {task.unitInContract}
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
            </DetailsPage>
        </PageContainer>
    );
}
