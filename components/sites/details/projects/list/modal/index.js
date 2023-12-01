"use client";

import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import languageOptions from "/constants/enums/language";
import advertisementStatusOptions from "/constants/enums/advertisementStatus";
import { createProject, getProjectsBySiteId } from "../../../../../../api/projectServices";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { getProjectCategories } from "../../../../../../api/projectCategoryServices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
};

const modalTitle = "Tạo dự án mới";

export default function CreateModal({ children }) {
  const params = useParams();
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // NAME
  const nameLabel = "Tên";
  const nameSubLabel = "Họ và tên của bạn";
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({
    hasError: false,
    label: "",
  });
  const handleNameError = (value) => {
    setNameError({ hasError: false, label: "" });
  };
  const onNameChange = (e) => {
    setName(e.target.value);
    handleNameError(e.target.value);
  };

  // PROJECT TYPE
  const projectTypeLabel = "Loại dự án";
  const projectTypeDefaultOptionLabel = "Chọn loại dự án";
  const [projectType, setProjectType] = useState(-1);
  const [projectTypeError, setProjectTypeError] = useState({
    hasError: false,
    label: "",
  });
  const handleProjectTypeError = (value) => {
    setProjectTypeError({ hasError: false, label: "" });
  };
  const onProjectTypeChange = (e) => {
    setProjectType(e.target.value);
    handleProjectTypeError(e.target.value);
  };

  // PROJECT STATUS
  const projectStatusLabel = "Trạng thái dự án";
  const projectStatusDefaultOptionLabel = "Chọn trạng thái";
  const [projectStatus, setProjectStatus] = useState(0);
  const [projectStatusError, setProjectStatusError] = useState({
    hasError: false,
    label: "",
  });
  const handleProjectStatusError = (value) => {
    setProjectStatusError({ hasError: false, label: "" });
  };
  const onProjectStatusChange = (e) => {
    setProjectStatus(e.target.value);
    handleProjectStatusError(e.target.value);
  };

  // LANGUAGE
  const languageLabel = "Ngôn ngữ";
  const languageDefaultOptionLabel = "Chọn ngôn ngữ";
  const [language, setLanguage] = useState(-1);
  const [languageError, setLanguageError] = useState({
    hasError: false,
    label: "",
  });
  const handleLanguageError = (value) => {
    setLanguageError({ hasError: false, label: "" });
  };
  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    handleLanguageError(e.target.value);
  };

  // PROJECT CATEGORY
  const projectCategoryLabel = "Danh mục";
  const projectCategoryDefaultOptionLabel = "Chọn danh mục";
  const [projectCategory, setProjectCategory] = useState(-1); // Use -1 for the default disabled option
  const [projectCategoryError, setProjectCategoryError] = useState({
    hasError: false,
    label: "",
  });

  const handleProjectCategoryError = (value) => {
    setProjectCategoryError({ hasError: false, label: "" });
  };

  const onProjectCategoryChange = (e) => {
    setProjectCategory(e.target.value);
    handleProjectCategoryError(e.target.value);
  };

  // DESCRIPTION
  const descriptionLabel = "Mô tả";
  const descriptionSubLabel = "Mô tả chi tiết";
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState({
    hasError: false,
    label: "",
  });
  const handleDescriptionError = (value) => {
    setDescriptionError({ hasError: false, label: "" });
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
    handleDescriptionError(e.target.value);
  };

  // ADVERTISEMENT STATUS
  const advertisementStatusLabel = "Quảng cáo dự án";
  const advertisementStatusSubLabel =
    "Quảng cáo trên trang chủ";
  const advertisementStatusOptionLabel = "Trạng thái quảng cáo";
  const [advertisementStatus, setAdvertisementStatus] = useState(0);

  const handleAdvertisementStatusChange = (e) => {
    setAdvertisementStatus(e.target.checked);
  };

  // BASED ON DECOR PROJECT
  const basedOnDecorProjectLabel = "Dự án thiết kế";
  const basedOnDecorProjectSubLabel = "Dự án thiết kế nội thất dựa vào làm mẫu"
  const [basedOnDecorProject, setBasedOnDecorProject] = useState([]);
  const [basedOnDecorProjectError, setBasedOnDecorProjectError] = useState({
    hasError: false,
    label: "",
  });
  const handleBasedOnDecorProjectError = (value) => {
    if (!value) {
      setBasedOnDecorProjectError({
        hasError: true,
        label: "Chọn một dự án thiết kế nội thất.",
      });
    } else {
      setBasedOnDecorProjectError({ hasError: false, label: "" });
    }
  };
  const onBasedOnDecorProjectChange = (event, value) => {
    setBasedOnDecorProject(value);
    handleBasedOnDecorProjectError(value);
  };

  const [decorProjects, setDecorProjects] = useState([]);
  const [siteId, setSiteId] = useState(params.id);
  const initialized = useRef(false);

  const [loading, setLoading] = useState(true);
  const [projectCategories, setProjectCategories] = useState([]);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const listCategories = await getProjectCategories();
          console.log(listCategories);
          setProjectCategories(listCategories);

          const projects = await getProjectsBySiteId(siteId);
          console.log(projects)
          setDecorProjects(projects.filter(project => project.type === 0))

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, []);

  const handleCreate = async () => {
    const createRequest = {
      name: name,
      description: description,
      type: projectType,
      projectCategoryId: projectCategory,
      createdAdminUsername: "admin.username",
      createdByAdminId: "7C2B4371-E768-4D01-9E15-648091A7D9B7",
      estimatedPrice: null,
      finalPrice: null,
      totalWarrantyPaid: null,
      area: 0,
      estimateBusinessDay: null,
      language: language,
      status: projectStatus,
      advertisementStatus: advertisementStatus,
      basedOnDecorProjectId: basedOnDecorProject?.id ?? null,
      siteId: siteId
    };
    console.log(createRequest);

    try {
      const response = await createProject(createRequest);
      console.log(response);
      if (response.data != null) {
        toast.success("Thêm thành công!");
        // handleClose();
      } else {
        throw new Error("Create failed!");
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };


  return (
    <Box>
      <Button variant="contained" disableElevation onClick={handleOpen}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} component="div">
          <Box
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
              mx: 3,
              height: "5rem",
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              borderBottom: 1,
              zIndex: 1,
            }}
          >
            <Typography variant="h4" id="child-modal-title" sx={{ py: 2 }}>
              Tạo dự án mới
            </Typography>
            <IconButton
              aria-label="close"
              sx={{
                my: "auto",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid
            sx={{ px: 3, my: 1, maxHeight: "30rem", overflowY: "auto" }}
            component={"div"}
            container
            spacing={3}
          >
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{nameLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">{nameSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={nameError.hasError}
                      variant="outlined"
                      value={name}
                      helperText={nameError.label}
                      onChange={onNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT TYPE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{projectTypeLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={projectType}
                      onChange={onProjectTypeChange}
                      error={projectTypeError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {projectTypeDefaultOptionLabel}
                      </MenuItem>
                      {projectTypeOptions.map((type, index) => (
                        <MenuItem key={type} value={index}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT STATUS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{projectStatusLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={projectStatus}
                      onChange={onProjectStatusChange}
                      error={projectStatusError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {projectStatusDefaultOptionLabel}
                      </MenuItem>
                      {projectStatusOptions.map((status, index) => (
                        <MenuItem key={status} value={index}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* LANGUAGE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{languageLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={language}
                      onChange={onLanguageChange}
                      error={languageError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {languageDefaultOptionLabel}
                      </MenuItem>
                      {languageOptions.map((option, index) => (
                        <MenuItem key={option} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PROJECT CATEGORY */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{projectCategoryLabel}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={projectCategory}
                      onChange={onProjectCategoryChange}
                      error={projectCategoryError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {projectCategoryDefaultOptionLabel}
                      </MenuItem>
                      {projectCategories.map((category, index) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{descriptionLabel}</Typography>
                  <Typography variant="p">{descriptionSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      rows={4} // You can adjust the number of rows as needed
                      variant="outlined"
                      value={description}
                      error={descriptionError.hasError}
                      helperText={descriptionError.label}
                      onChange={onDescriptionChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* BASED ON DECOR PROJECT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {basedOnDecorProjectLabel}
                  </Typography>
                  <Typography variant="p">
                    {basedOnDecorProjectSubLabel}
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={decorProjects}
                      getOptionLabel={(option) => option?.name ?? ""}
                      value={basedOnDecorProject}
                      onChange={onBasedOnDecorProjectChange}
                      noOptionsText="Không tìm thấy"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={basedOnDecorProjectError.hasError}
                          variant="outlined"
                          helperText={basedOnDecorProjectError.label}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* ADVERTISEMENT STATUS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {advertisementStatusLabel}<span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Typography variant="p">
                    {advertisementStatusSubLabel}
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={advertisementStatus}
                      onChange={handleAdvertisementStatusChange}
                    >
                      <MenuItem disabled value={-1}>
                        {advertisementStatusOptionLabel}
                      </MenuItem>
                      {advertisementStatusOptions.map((option, index) => (
                        <MenuItem key={option} value={index}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>



              {/* SUBMIT */}
              <Grid item xs={12} lg={12}>
                <Box
                  sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={handleCreate}
                  >
                    Tạo
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
