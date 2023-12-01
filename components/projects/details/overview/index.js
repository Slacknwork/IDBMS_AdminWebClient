"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Avatar,
  Autocomplete,
  Box,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";

import PageContainer from "/components/container/PageContainer";
import SaveModal from "./modal";
import DashboardCard from "/components/shared/DashboardCard";

import projectLanguageOptions from "/constants/enums/language";
import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import projectAdvertisementStatusOptions from "/constants/enums/advertisementStatus";
import {
  getProjectById,
  getProjectsBySiteId,
  updateProject,
} from "/api/projectServices";
import { getProjectCategories } from "/api/projectCategoryServices";
import { toast } from "react-toastify";

export default function ProjectDetails() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    projectType: -1,
    projectTypeError: { hasError: false, label: "" },
    projectStatus: -1,
    projectStatusError: { hasError: false, label: "" },
    language: -1,
    languageError: { hasError: false, label: "" },
    projectCategory: -1,
    projectCategoryError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    advertisementStatus: -1,
    advertisementStatusError: { hasError: false, label: "" },
    basedOnDecorProject: [],
    basedOnDecorProjectError: { hasError: false, label: "" },
    estimatedPrice: 0,
    estimatedPriceError: { hasError: false, label: "" },
    finalPrice: 0,
    finalPriceError: { hasError: false, label: "" },
    totalWarrantyPaid: 0,
    totalWarrantyPaidError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Tên không thể để trống" : "";
      // Add validation for other fields as needed
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  // GET SITE DETAILS
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  // CONTACT
  const contactLabel = "Thông tin liên hệ chủ dự án";

  const [projectId, setProjectId] = useState(params.id);
  const [siteId, setSiteId] = useState("");
  const [adminId, setAdminId] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const [projectCategories, setProjectCategories] = useState([]);
  const [decorProjects, setDecorProjects] = useState([]);
  const [projectOwner, setProjectOwner] = useState("");

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const project = await getProjectById(projectId);
          console.log(project);
          mapData(project);

          const listCategories = await getProjectCategories();
          console.log(listCategories);
          setProjectCategories(listCategories);

          const listProjectsBySiteId = await getProjectsBySiteId(
            project?.siteId
          );
          console.log(listProjectsBySiteId);

          setDecorProjects(
            listProjectsBySiteId.filter((project) => project.type === 0)
          );
          const participation = project?.projectParticipations.find(
            (par) => par.role === 0
          );
          setProjectOwner(participation.user ?? "");

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, [projectId]);

  const mapData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      name: data.name ?? prevData.name,
      projectType: data.type ?? prevData.projectType,
      description: data.description ?? prevData.description,
      advertisementStatus:
        data.advertisementStatus ?? prevData.advertisementStatus,
      area: data.area ?? prevData.area,
      basedOnDecorProject:
        data?.basedOnDecorProject?.id ?? prevData.basedOnDecorProject,
      estimateBusinessDay:
        data.estimateBusinessDay ?? prevData.estimateBusinessDay,
      estimatedPrice: data.estimatedPrice ?? prevData.estimatedPrice,
      finalPrice: data.finalPrice ?? prevData.finalPrice,
      projectCategory: data.projectCategory.id ?? prevData.projectCategory,
      projectStatus: data.status ?? prevData.projectStatus,
      totalWarrantyPaid: data.totalWarrantyPaid ?? prevData.totalWarrantyPaid,
      language: data.language ?? prevData.language,
      siteId: data.siteId ?? prevData.siteId,
      adminId: data.CreatedByAdminId ?? prevData.adminId,
      adminUsername: data.CreatedAdminUsername ?? prevData.adminUsername,
      nameError: { ...prevData.nameError },
      projectTypeError: { ...prevData.projectTypeError },
      descriptionError: { ...prevData.descriptionError },
      basedOnDecorProjectError: { ...prevData.basedOnDecorProjectError },
      projectCategoryError: { ...prevData.projectCategoryError },
      projectStatusError: { ...prevData.projectStatusError },
      totalWarrantyPaidError: { ...prevData.totalWarrantyPaidError },
      languageError: { ...prevData.languageError },
    }));
  };

  const getAvatarContent = (name) => {
    const words = name.split(" ");
    const lastWord = words.length > 0 ? words[words.length - 1] : "";
    const firstCharacter = lastWord.charAt(0).toUpperCase();

    return firstCharacter;
  };
  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DashboardCard>
        <Box sx={{ overflow: "auto" }}>
          <Grid container columnSpacing={4} rowSpacing={4}>
            <Grid
              item
              xs={12}
              lg={12}
              sx={{ borderBottom: 1, borderColor: "grey.500", py: 3, mt: 1 }}
            >
              <Typography variant="h2" sx={{ my: "auto" }}>
                Tên
              </Typography>
              <SaveModal
                request={{
                  name: formData.name,
                  description: formData.description,
                  type: formData.projectType,
                  projectCategoryId: formData.projectCategory,
                  createdAdminUsername: adminUsername,
                  createdByAdminId: adminId,
                  estimatedPrice: formData.estimatedPrice,
                  finalPrice: formData.finalPrice,
                  totalWarrantyPaid: formData.totalWarrantyPaid,
                  area: formData.area,
                  estimateBusinessDay: formData.estimateBusinessDay,
                  language: formData.language,
                  status: formData.projectStatus,
                  advertisementStatus: formData.advertisementStatus,
                  basedOnDecorProjectId: formData.basedOnDecorProject?.id ?? "",
                  siteId: siteId,
                }}
              >
                Lưu
              </SaveModal>
            </Grid>

            <Grid item xs={12} lg={8}>
              <Grid container columnSpacing={2} rowSpacing={4}>
                {/* PROJECT TYPE */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Project Type <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <Select
                          value={formData.projectType}
                          onChange={(e) =>
                            handleInputChange("projectType", e.target.value)
                          }
                          error={formData.projectTypeError.hasError}
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem disabled value="">
                            Select project type
                          </MenuItem>
                          {projectTypeOptions.map((type, index) => (
                            <MenuItem key={type} value={index}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                        {formData.projectTypeError.hasError && (
                          <FormHelperText>
                            {formData.projectTypeError.label}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* PROJECT STATUS */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Project Status <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <Select
                          value={formData.projectStatus}
                          onChange={(e) =>
                            handleInputChange("projectStatus", e.target.value)
                          }
                          error={formData.projectStatusError.hasError}
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem disabled value="">
                            Select project status
                          </MenuItem>
                          {projectStatusOptions.map((status, index) => (
                            <MenuItem key={status} value={index}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                        {formData.projectStatusError.hasError && (
                          <FormHelperText>
                            {formData.projectStatusError.label}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* PROJECT CATEGORY */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Project Category <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <Select
                          value={formData.projectCategory}
                          onChange={(e) =>
                            handleInputChange("projectCategory", e.target.value)
                          }
                          error={formData.projectCategoryError.hasError}
                          displayEmpty
                          variant="outlined"
                        >
                          <MenuItem disabled value="">
                            Select project category
                          </MenuItem>
                          {projectCategories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {formData.projectCategoryError.hasError && (
                          <FormHelperText>
                            {formData.projectCategoryError.label}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* ESTIMATED PRICE */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Estimated Price <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          error={formData.estimatedPriceError.hasError}
                          variant="outlined"
                          value={formData.estimatedPrice}
                          helperText={formData.estimatedPriceError.label}
                          onChange={(e) =>
                            handleInputChange("estimatedPrice", e.target.value)
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                VND
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* FINAL PRICE */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Final Price <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          error={formData.finalPriceError.hasError}
                          variant="outlined"
                          value={formData.finalPrice}
                          helperText={formData.finalPriceError.label}
                          onChange={(e) =>
                            handleInputChange("finalPrice", e.target.value)
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                VND
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* TOTAL WARRANTY PAID */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Total Warranty Paid{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          error={formData.totalWarrantyPaidError.hasError}
                          variant="outlined"
                          value={formData.totalWarrantyPaid}
                          helperText={formData.totalWarrantyPaidError.label}
                          onChange={(e) =>
                            handleInputChange(
                              "totalWarrantyPaid",
                              e.target.value
                            )
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                VND
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* AREA */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Area <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          error={formData.areaError.hasError}
                          variant="outlined"
                          value={formData.area}
                          helperText={formData.areaError.label}
                          onChange={(e) =>
                            handleInputChange("area", e.target.value)
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">m²</InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* ESTIMATE BUSINESS DAY */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Estimate Business Day{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          error={formData.estimateBusinessDayError.hasError}
                          variant="outlined"
                          value={formData.estimateBusinessDay}
                          helperText={formData.estimateBusinessDayError.label}
                          onChange={(e) =>
                            handleInputChange(
                              "estimateBusinessDay",
                              e.target.value
                            )
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                days
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* LANGUAGE */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Language <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <Select
                          variant="outlined"
                          value={formData.language}
                          onChange={(e) =>
                            handleInputChange("language", e.target.value)
                          }
                          error={formData.languageError.hasError}
                        >
                          <MenuItem disabled value="">
                            Select language
                          </MenuItem>
                          {projectLanguageOptions.map((lang) => (
                            <MenuItem key={lang} value={lang}>
                              {lang}
                            </MenuItem>
                          ))}
                        </Select>
                        {formData.languageError.hasError && (
                          <FormHelperText>
                            {formData.languageError.label}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* ADVERTISEMENT STATUS */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Advertisement Status{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <Select
                          variant="outlined"
                          value={formData.advertisementStatus}
                          onChange={(e) =>
                            handleInputChange(
                              "advertisementStatus",
                              e.target.value
                            )
                          }
                          error={formData.advertisementStatusError.hasError}
                        >
                          <MenuItem disabled value="">
                            Select advertisement status
                          </MenuItem>
                          {projectAdvertisementStatusOptions.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                        {formData.advertisementStatusError.hasError && (
                          <FormHelperText>
                            {formData.advertisementStatusError.label}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* BASED ON DECOR PROJECT (Autocomplete) */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Based on Decor Project
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <Autocomplete
                          options={decorProjects}
                          getOptionLabel={(option) => option?.name ?? ""}
                          value={formData.basedOnDecorProject}
                          onChange={(e, newValue) =>
                            handleInputChange("basedOnDecorProject", newValue)
                          }
                          noOptionsText="Not found"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={formData.basedOnDecorProjectError.hasError}
                              variant="outlined"
                              helperText={
                                formData.basedOnDecorProjectError.label
                              }
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                {/* DESCRIPTION */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">Description</Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <TextField
                          multiline
                          rows={4}
                          variant="outlined"
                          value={formData.description}
                          error={formData.descriptionError.hasError}
                          helperText={formData.descriptionError.label}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card
                variant="outlined"
                sx={{ p: 3, border: 1, borderColor: "gray" }}
              >
                <Typography variant="h5" sx={{ my: "auto" }}>
                  {contactLabel}
                  {console.log(projectOwner)}
                </Typography>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>
                    {getAvatarContent(projectOwner?.name ?? "E")}
                  </Avatar>
                  <Box sx={{ my: "auto", mx: 2 }}>
                    <Typography variant="h6">
                      {projectOwner?.name ?? "Không tìm thấy"}
                    </Typography>
                    <Typography variant="p">
                      {projectOwner?.email ?? "..."}
                    </Typography>
                    <br />
                    <Typography variant="p">
                      {projectOwner?.phone ?? "..."}
                    </Typography>
                    <br />
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
}
