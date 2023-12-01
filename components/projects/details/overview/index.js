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

import projectLanguageOptions from "/constants/enums/language";
import projectTypeOptions from "/constants/enums/projectType";
import projectStatusOptions from "/constants/enums/projectStatus";
import projectAdvertisementStatusOptions from "/constants/enums/advertisementStatus";
import { getProjectById, getProjectsBySiteId, updateProject } from "../../../../api/projectServices";
import { getProjectCategories } from "../../../../api/projectCategoryServices";
import { toast } from "react-toastify";

export default function ProjectDetails() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // NAME
  const nameLabel = "Tên dự án";
  const nameSubLabel = "Tên của dự án";
  const nameMin = 8;
  const nameMax = 50;
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState({
    hasError: false,
    label: "",
  });
  const handleNameError = (value) => {
    if (value?.length <= 0) {
      setNameError({
        hasError: true,
        label: "Tên dự án là cần thiết.",
      });
    } else if (value?.length < nameMin || value?.length > nameMax) {
      setNameError({
        hasError: true,
        label: `Tên phải từ ${nameMin} đến ${nameMax} ký tự`,
      });
    } else {
      setNameError({ hasError: false, label: "" });
    }
  };
  const onNameChange = (e) => {
    setName(e.target.value);
    handleNameError(e.target.value);
  };

  // PROJECT TYPE
  const projectTypeLabel = "Loại dự án";
  const [projectType, setProjectType] = useState("");
  const [projectTypeError, setProjectTypeError] = useState({
    hasError: false,
    label: "",
  });
  const handleProjectTypeError = (value) => {
    if (parseInt(value < 0)) {
      setProjectTypeError({
        hasError: true,
        label: "Loại dự án là cần thiết.",
      });
    } else {
      setProjectTypeError({ hasError: false, label: "" });
    }
  };
  const onProjectTypeChange = (e) => {
    setProjectType(e.target.value);
    handleProjectTypeError(e.target.value);
  };

  // PROJECT CATEGORY
  const projectCategoryLabel = "Hạng mục dự án";
  const [projectCategory, setProjectCategory] = useState([]);
  const [projectCategoryError, setProjectCategoryError] = useState({
    hasError: false,
    label: "",
  });

  const handleProjectCategoryError = (value) => {
    if (!value) {
      setProjectCategoryError({
        hasError: true,
        label: "Hạng mục dự án là cần thiết.",
      });
    } else {
      setProjectCategoryError({ hasError: false, label: "" });
    }
  };
  const onProjectCategoryChange = (e) => {
    setProjectCategory(e.target.value);
    handleProjectCategoryError(e.target.value);
  };

  // ESTIMATED PRICE
  const estimatedPriceLabel = "Ước tính giá";
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [estimatedPriceError, setEstimatedPriceError] = useState({
    hasError: false,
    label: "",
  });
  const handleEstimatedPriceError = (value) => {
    if (!value) {
      setEstimatedPriceError({
        hasError: true,
        label: "Ước tính giá là cần thiết.",
      });
    } else if (isNaN(value) || +value <= 0) {
      setEstimatedPriceError({
        hasError: true,
        label: "Nhập một giá trị hợp lệ.",
      });
    } else {
      setEstimatedPriceError({ hasError: false, label: "" });
    }
  };
  const onEstimatedPriceChange = (e) => {
    setEstimatedPrice(parseFloat(e.target.value));
    handleEstimatedPriceError(e.target.value);
  };

  // FINAL PRICE
  const finalPriceLabel = "Giá cuối cùng";
  const [finalPrice, setFinalPrice] = useState(0);
  const [finalPriceError, setFinalPriceError] = useState({
    hasError: false,
    label: "",
  });
  const handleFinalPriceError = (value) => {
    if (!value) {
      setFinalPriceError({
        hasError: true,
        label: "Giá cuối cùng là cần thiết.",
      });
    } else if (isNaN(value) || +value <= 0) {
      setFinalPriceError({
        hasError: true,
        label: "Nhập một giá trị hợp lệ.",
      });
    } else {
      setFinalPriceError({ hasError: false, label: "" });
    }
  };
  const onFinalPriceChange = (e) => {
    setFinalPrice(parseFloat(e.target.value));
    handleFinalPriceError(e.target.value);
  };

  // TOTAL WARRANTY PAID
  const totalWarrantyPaidLabel = "Tổng số tiền bảo hành đã thanh toán";
  const [totalWarrantyPaid, setTotalWarrantyPaid] = useState(0);
  const [totalWarrantyPaidError, setTotalWarrantyPaidError] = useState({
    hasError: false,
    label: "",
  });
  const handleTotalWarrantyPaidError = (value) => {
    if (!value) {
      setTotalWarrantyPaidError({
        hasError: true,
        label: "Tổng số tiền bảo hành đã thanh toán là cần thiết.",
      });
    } else if (isNaN(value) || +value < 0) {
      setTotalWarrantyPaidError({
        hasError: true,
        label: "Nhập một giá trị không âm.",
      });
    } else {
      setTotalWarrantyPaidError({ hasError: false, label: "" });
    }
  };
  const onTotalWarrantyPaidChange = (e) => {
    setTotalWarrantyPaid(parseFloat(e.target.value));
    handleTotalWarrantyPaidError(e.target.value);
  };

  // AREA
  const areaLabel = "Diện tích";
  const [area, setArea] = useState(0);
  const [areaError, setAreaError] = useState({
    hasError: false,
    label: "",
  });
  const handleAreaError = (value) => {
    if (!value) {
      setAreaError({
        hasError: true,
        label: "Diện tích là cần thiết.",
      });
    } else if (isNaN(value) || +value <= 0) {
      setAreaError({
        hasError: true,
        label: "Nhập một giá trị hợp lệ.",
      });
    } else {
      setAreaError({ hasError: false, label: "" });
    }
  };
  const onAreaChange = (e) => {
    setArea(parseFloat(e.target.value));
    handleAreaError(e.target.value);
  };

  // ESTIMATE BUSINESS DAY
  const estimateBusinessDayLabel = "Số ngày ước tính";
  const [estimateBusinessDay, setEstimateBusinessDay] = useState(0);
  const [estimateBusinessDayError, setEstimateBusinessDayError] = useState({
    hasError: false,
    label: "",
  });
  const handleEstimateBusinessDayError = (value) => {
    if (!value) {
      setEstimateBusinessDayError({
        hasError: true,
        label: "Số ngày ước tính là cần thiết.",
      });
    } else if (isNaN(value) || +value <= 0) {
      setEstimateBusinessDayError({
        hasError: true,
        label: "Nhập một giá trị hợp lệ.",
      });
    } else {
      setEstimateBusinessDayError({ hasError: false, label: "" });
    }
  };
  const onEstimateBusinessDayChange = (e) => {
    setEstimateBusinessDay(parseInt(e.target.value, 10));
    handleEstimateBusinessDayError(e.target.value);
  };

  // LANGUAGE
  const languageLabel = "Ngôn ngữ";
  const [language, setLanguage] = useState("");
  const [languageError, setLanguageError] = useState({
    hasError: false,
    label: "",
  });

  const handleLanguageError = (value) => {
    if (!value) {
      setLanguageError({
        hasError: true,
        label: "Chọn một ngôn ngữ.",
      });
    } else {
      setLanguageError({ hasError: false, label: "" });
    }
  };

  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    handleLanguageError(e.target.value);
  };

  // PROJECT STATUS
  const projectStatusLabel = "Trạng thái dự án";
  const [projectStatus, setProjectStatus] = useState("");
  const [projectStatusError, setProjectStatusError] = useState({
    hasError: false,
    label: "",
  });

  const handleProjectStatusError = (value) => {
    if (value === "") {
      setProjectStatusError({
        hasError: true,
        label: "Chọn một trạng thái dự án.",
      });
    } else {
      setProjectStatusError({ hasError: false, label: "" });
    }
  };

  const onProjectStatusChange = (e) => {
    setProjectStatus(e.target.value);
    handleProjectStatusError(e.target.value);
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
  const advertisementStatusLabel = "Trạng thái quảng cáo";
  const [advertisementStatus, setAdvertisementStatus] = useState("");
  const [advertisementStatusError, setAdvertisementStatusError] = useState({
    hasError: false,
    label: "",
  });
  const handleAdvertisementStatusError = (value) => {
    if (!value) {
      setAdvertisementStatusError({
        hasError: true,
        label: "Chọn một trạng thái quảng cáo.",
      });
    } else {
      setAdvertisementStatusError({ hasError: false, label: "" });
    }
  };
  const onAdvertisementStatusChange = (e) => {
    setAdvertisementStatus(e.target.value);
    handleAdvertisementStatusError(e.target.value);
  };

  // BASED ON DECOR PROJECT
  const basedOnDecorProjectLabel = "Dựa trên dự án thiết kế nội thất";
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

  // GET SITE DETAILS
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  // CONTACT
  const contactLabel = "Thông tin liên hệ chủ dự án";

  // const [projectId, setProjectId] = useState("FF090F51-E6E7-4854-8F3F-0402EE32C9F8");
  const [projectId, setProjectId] = useState(params.id);
  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const [projectCategories, setProjectCategories] = useState([]);
  const [decorProjects, setDecorProjects] = useState([]);

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

          const listProjectsBySiteId = await getProjectsBySiteId(project?.siteId);
          console.log(listProjectsBySiteId);
          setDecorProjects(listProjectsBySiteId.filter(project => project.type === 0));

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

    setName(data.name ?? "")
    setProjectType(data.type ?? "")
    setDescription(data.description ?? "")
    setAdvertisementStatus(data.advertisementStatus ?? "")
    setArea(data.area ?? "")
    setBasedOnDecorProject(data?.basedOnDecorProject?.id ?? "")
    setEstimateBusinessDay(data.estimateBusinessDay ?? 0)
    setEstimatedPrice(data.estimatedPrice ?? 0)
    setFinalPrice(data.finalPrice ?? 0)
    setProjectCategory(data.projectCategory.id ?? "")
    setProjectStatus(data.status ?? "")
    setTotalWarrantyPaid(data.totalWarrantyPaid ?? 0)
    setLanguage(data.language ?? "")
    setSiteId(data.siteId ?? "")

  };

  const admin = {
    id: "7C2B4371-E768-4D01-9E15-648091A7D9B7",
    username: "tuantn2235",
  };

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <Box sx={{ overflow: "auto" }}>
        <Grid container columnSpacing={4} rowSpacing={4} sx={{ mt: 1 }}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{ borderBottom: 1, borderColor: "grey.500", py: 3 }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between" }}
              spacing={2}
            >
              <Typography variant="h2" sx={{ my: "auto" }}>
                Tên
              </Typography>
              <SaveModal
                request={{
                  name: name,
                  description: description,
                  type: projectType,
                  projectCategoryId: projectCategory,
                  createdAdminUsername: admin.username,
                  createdByAdminId: admin.id,
                  estimatedPrice: estimatedPrice,
                  finalPrice: finalPrice,
                  totalWarrantyPaid: totalWarrantyPaid,
                  area: area,
                  estimateBusinessDay: estimateBusinessDay,
                  language: language,
                  status: projectStatus,
                  advertisementStatus: advertisementStatus,
                  basedOnDecorProjectId: basedOnDecorProject?.id ?? "",
                  siteId: siteId
                }}
              >Lưu</SaveModal>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container columnSpacing={2} rowSpacing={4}>
              {/* NAME */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      {nameLabel} <span style={{ color: "red" }}>*</span>
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
                    <Typography variant="h5">
                      {projectTypeLabel} <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        value={projectType}
                        onChange={onProjectTypeChange}
                        error={projectTypeError.hasError}
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem disabled value="">
                          Chọn loại dự án
                        </MenuItem>
                        {projectTypeOptions.map((type, index) => (
                          <MenuItem key={type} value={index}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {projectTypeError.hasError && (
                        <FormHelperText>
                          {projectTypeError.label}
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
                      {projectStatusLabel}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        value={projectStatus}
                        onChange={onProjectStatusChange}
                        error={projectStatusError.hasError}
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem disabled value="">
                          Chọn trạng thái
                        </MenuItem>
                        {projectStatusOptions.map((status, index) => (
                          <MenuItem key={status} value={index}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                      {projectStatusError.hasError && (
                        <FormHelperText>
                          {projectStatusError.label}
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
                      {projectCategoryLabel}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        value={projectCategory}
                        onChange={onProjectCategoryChange}
                        error={projectCategoryError.hasError}
                        displayEmpty
                        variant="outlined"
                      >
                        <MenuItem disabled value="">
                          Chọn hạng mục
                        </MenuItem>
                        {projectCategories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {projectCategoryError.hasError && (
                        <FormHelperText>
                          {projectCategoryError.label}
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
                      {estimatedPriceLabel}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        error={estimatedPriceError.hasError}
                        variant="outlined"
                        value={estimatedPrice}
                        helperText={estimatedPriceError.label}
                        onChange={onEstimatedPriceChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">VND</InputAdornment>
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
                      {finalPriceLabel} <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        error={finalPriceError.hasError}
                        variant="outlined"
                        value={finalPrice}
                        helperText={finalPriceError.label}
                        onChange={onFinalPriceChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">VND</InputAdornment>
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
                      {totalWarrantyPaidLabel}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        error={totalWarrantyPaidError.hasError}
                        variant="outlined"
                        value={totalWarrantyPaid}
                        helperText={totalWarrantyPaidError.label}
                        onChange={onTotalWarrantyPaidChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">VND</InputAdornment>
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
                      {areaLabel} <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        error={areaError.hasError}
                        variant="outlined"
                        value={area}
                        helperText={areaError.label}
                        onChange={onAreaChange}
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
                      {estimateBusinessDayLabel}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        type="number"
                        error={estimateBusinessDayError.hasError}
                        variant="outlined"
                        value={estimateBusinessDay}
                        helperText={estimateBusinessDayError.label}
                        onChange={onEstimateBusinessDayChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">days</InputAdornment>
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
                      {languageLabel} <span style={{ color: "red" }}>*</span>
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
                        <MenuItem disabled value="">
                          Chọn ngôn ngữ
                        </MenuItem>
                        {projectLanguageOptions.map((label, value) => (
                          <MenuItem key={label} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* ADVERTISEMENT STATUS */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      {advertisementStatusLabel}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={advertisementStatus}
                        onChange={onAdvertisementStatusChange}
                        error={advertisementStatusError.hasError}
                      >
                        <MenuItem disabled value="">
                          Chọn trạng thái quảng cáo
                        </MenuItem>
                        {projectAdvertisementStatusOptions.map((label, value) => (
                          <MenuItem key={label} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* BASED ON DECOR PROJECT (Autocomplete) */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      {basedOnDecorProjectLabel}{" "}
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

              {/* PROJECT DESIGN (Select) 
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">
                      {projectDesignLabel}{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={projectDesign}
                        onChange={onProjectDesignChange}
                        error={projectDesignError.hasError}
                      >
                        <MenuItem disabled value={-1}>
                          Chọn dự án thiết kế
                        </MenuItem>
                        {projectDesignList.map((design) => (
                          <MenuItem key={design.id} value={design.id}>
                            {design.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              */}

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
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card
              variant="outlined"
              sx={{ p: 3, border: 1, borderColor: "gray" }}
            >
              <Typography variant="h5" sx={{ my: "auto" }}>
                {contactLabel}
              </Typography>
              <Box sx={{ display: "flex", mt: 2 }}>
                <Avatar sx={{ bgcolor: deepOrange[500], my: "auto" }}>N</Avatar>
                <Box sx={{ my: "auto", mx: 2 }}>
                  <Typography variant="h6">Anthony N</Typography>
                  <Typography variant="p">anthony@gmail.com</Typography>
                  <br />
                  <Typography variant="p">0123456789</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
