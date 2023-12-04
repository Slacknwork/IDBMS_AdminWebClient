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
import calculationUnit from "/constants/enums/calculationUnit";
import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";
import { getAllInteriorItems } from "../../../../../../api/interiorItemServices";
import { toast } from "react-toastify";
import { getAllTaskDesigns } from "../../../../../../api/taskDesignServices";
import { createProjectTask } from "../../../../../../api/projectTaskServices";
import { useParams } from "next/navigation";
import { getAllTaskCategories } from "../../../../../../api/taskCategoryServices";
import { getPaymentStagesByProjectId } from "../../../../../../api/paymentStageServices";

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

const nameLabel = "Tên công việc";
const nameSubLabel = "Tên của công việc";

const percentageLabel = "Phần trăm";
const percentageSubLabel = "Tiến độ công việc tính theo %";

const calculationUnitLabel = "Đơn vị tính";

const pricePerUnitLabel = "Đơn giá";
const pricePerUnitSubLabel = "Đơn giá của 1 đơn vị tính";

const unitInContractLabel = "Số đơn vị trong hợp đồng";
const unitInContractSubLabel = "Số đơn vị trong hợp đồng sublabel";

const unitUsedLabel = "Số đơn vị đã sử dụng";
const unitUsedSubLabel = "Số đơn vị đã sử dụng sublabel";

const isIncurredLabel = "Phát sinh";
const isIncurredSubLabel = "Đây là công việc phát sinh";

const startedLabel = "Ngày bắt đầu";

const endLabel = "Ngày kết thúc";

const noDateLabel = "Số ngày";

const parentTaskLabel = "Thuộc công việc";

const interiorItemLabel = "Nội thất";

const taskDesignLabel = "Thiết kế công việc";

const roomLabel = "Phòng";

const statusLabel = "Trạng thái";

const modalTitle = "Tạo công việc mới";

export default function CreateModal({ children, request, tasks }) {
  const params = useParams();
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    percentage: 0,
    percentageError: { hasError: false, label: "" },
    calculationUnit: "",
    calculationUnitError: { hasError: false, label: "" },
    pricePerUnit: "",
    pricePerUnitError: { hasError: false, label: "" },
    unitInContract: 0,
    unitInContractError: { hasError: false, label: "" },
    unitUsed: 0,
    unitUsedError: { hasError: false, label: "" },
    isIncurred: false,
    started: new Date(),
    end: null,
    noDate: 0,
    parentTask: null,
    interiorItem: null,
    taskDesign: null,
    room: "",
    status: "",
    statusError: { hasError: false, label: "" },
    designCategoryId: "",
    taskCategoryId: "",
    paymentStage: null,
    taskCategory: null,
  });

  const calculationUnitOptions = ["Option1", "Option2", "Option3"];

  const taskOptions = [
    { id: 1, name: "Task 1", code: "asgfh" },
    { id: 2, name: "Task 2", code: "asefee" },
  ];
  const interiorItemOptions = [
    { id: 1, name: "Interior Item 1" },
    { id: 2, name: "Interior Item 2" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const onPercentageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    handleInputChange("percentage", value);
    handleInputError(
      "percentage",
      isNaN(value) || value < 0 || value > 100,
      "Vui lòng nhập trong khoảng (0-100)"
    );
  };

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const [items, setItems] = useState([]);
  const [taskDesigns, setTaskDesigns] = useState([]);
  const [taskCategories, setTaskCategories] = useState([]);
  const [stages, setStages] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      try {
        const listItems = await getAllInteriorItems();
        const furniture = listItems.filter(item => item?.interiorItemCategory?.interiorItemType === 0);
        console.log(furniture)
        setItems(furniture)

        const listTaskDesign = await getAllTaskDesigns();
        setTaskDesigns(listTaskDesign)
        console.log(listTaskDesign)

        const listTaskCategory = await getAllTaskCategories();
        setTaskCategories(listTaskCategory)
        console.log(listTaskCategory)

        const listStagesByProjectId = await getPaymentStagesByProjectId(params.id);
        setStages(listStagesByProjectId)
        console.log(listStagesByProjectId)

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu từ hệ thống");
      }
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const updateFormFields = (selectedTaskDesign) => {
    if (selectedTaskDesign) {
      console.log(selectedTaskDesign)

      setFormData((prevData) => ({
        ...prevData,
        name: selectedTaskDesign.name || "",
        description: selectedTaskDesign.description || "",
        percentage: 0,
        pricePerUnit: selectedTaskDesign.estimatePricePerUnit || "",
        designCategoryId: selectedTaskDesign.interiorItemCategoryId || null,
        taskCategoryId: selectedTaskDesign.taskCategoryId || null,
        taskCategory: selectedTaskDesign.taskCategory || ""
      }));
    }
  };

  const transformEmptyToNull = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === "") {
        result[key] = null;
      }
    }
    return result;
  };

  const handleCreate = async () => {
    console.log(formData)
    const request = {
      code: formData?.taskDesign?.code ?? null,
      name: formData.name,
      description: formData.description,
      percentage: formData.percentage,
      calculationUnit: formData.calculationUnit,
      pricePerUnit: formData.pricePerUnit,
      unitInContract: parseInt(formData.unitInContract, 10) || 0,
      unitUsed: parseInt(formData.unitUsed, 10) || 0,
      isIncurred: formData.isIncurred,
      startedDate: formData.started ? formData.started.toISOString() : null,
      endDate: formData.end ? formData.end.toISOString() : null,
      noDate: formData.noDate,
      parentTaskId: formData?.parentTask?.id ?? null,
      taskCategoryId: formData.taskCategoryId,
      projectId: params.id,
      paymentStageId: formData?.paymentStage?.id ?? null,
      interiorItemId: formData?.interiorItem?.id ?? null,
      taskDesignId: formData?.taskDesign?.id ?? null,
      roomId: params.roomId,
      status: formData.status,
    };
    const transformedValue = transformEmptyToNull(request);
    console.log(transformedValue)
    try {
      const response = await createProjectTask(transformedValue);
      console.log(response);
      toast.success("Thêm thành công!");
      handleClose()
      router.push(`/projects/${params.id}/rooms/${response.data.id}`);

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
              {modalTitle}
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

            {/* TASK DESIGN (OPTIONAL) */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{taskDesignLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <Autocomplete
                    options={taskDesigns}
                    getOptionLabel={(option) => `${option.code} - ${option.name}`}
                    value={formData.taskDesign}
                    onChange={(_, newValue) => {
                      handleInputChange("taskDesign", newValue);
                      if (newValue === null) {
                        setFormData((prevData) => ({
                          ...prevData,
                          designCategoryId: null,
                        }));
                      } else {
                        updateFormFields(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn thiết kế"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{nameLabel}</Typography>
                  <Typography variant="p">{nameSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.nameError.hasError}
                      variant="outlined"
                      value={formData.name}
                      helperText={formData.nameError.label}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PERCENTAGE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{percentageLabel}</Typography>
                  <Typography variant="p">{percentageSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.percentageError.hasError}
                      variant="outlined"
                      type="number"
                      inputProps={{
                        min: 0,
                        max: 100,
                      }}
                      value={formData.percentage}
                      helperText={formData.percentageError.label}
                      onChange={onPercentageChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* CALCULATION UNIT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{calculationUnitLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.calculationUnit}
                      onChange={(e) =>
                        handleInputChange("calculationUnit", e.target.value)
                      }
                      error={formData.calculationUnitError.hasError}
                    >
                      <MenuItem disabled value={-1}>
                        {formData.calculationUnitDefaultOptionLabel}
                      </MenuItem>
                      {calculationUnit.map((unit, index) => (
                        <MenuItem key={unit} value={index}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PRICE PER UNIT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{pricePerUnitLabel}</Typography>
                  <Typography variant="p">{pricePerUnitSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.pricePerUnitError.hasError}
                      variant="outlined"
                      type="number"
                      value={formData.pricePerUnit}
                      helperText={formData.pricePerUnitError.label}
                      onChange={(e) =>
                        handleInputChange("pricePerUnit", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* UNIT IN CONTRACT */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{unitInContractLabel}</Typography>
                  <Typography variant="p">{unitInContractSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.unitInContractError.hasError}
                      variant="outlined"
                      type="number"
                      value={formData.unitInContract}
                      helperText={formData.unitInContractError.label}
                      onChange={(e) =>
                        handleInputChange("unitInContract", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* UNIT USED */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{unitUsedLabel}</Typography>
                  <Typography variant="p">{unitUsedSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      error={formData.unitUsedError.hasError}
                      variant="outlined"
                      type="number"
                      value={formData.unitUsed}
                      helperText={formData.unitUsedError.label}
                      onChange={(e) =>
                        handleInputChange("unitUsed", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* IS INCURRED */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{isIncurredLabel}</Typography>
                  <Typography variant="p">{isIncurredSubLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isIncurred}
                        onChange={(e) =>
                          handleInputChange("isIncurred", e.target.checked)
                        }
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Mô tả công việc</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      rows={4}
                      variant="outlined"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* TASK CATEGORY */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Loại công việc</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <Autocomplete
                    options={taskCategories}
                    getOptionLabel={(option) => `${option?.name}`}
                    value={formData.taskCategory}
                    onChange={(_, newValue) =>
                      handleInputChange("taskCategory", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn loại công việc"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* PAYMENT STAGE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Giai đoạn thanh toán</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <Autocomplete
                    options={stages ?? []}
                    getOptionLabel={(option) => option ? `${option.name}` : ''}
                    value={formData.paymentStage}
                    onChange={(_, newValue) =>
                      handleInputChange("paymentStage", newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn giai đoạn thanh toán"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* STARTED */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{startedLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <TextField
                    label="Ngày bắt đầu"
                    type="date"
                    variant="outlined"
                    value={formData.started.toISOString().split("T")[0]}
                    onChange={(e) =>
                      handleInputChange("started", new Date(e.target.value))
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* END (OPTIONAL) */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{endLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <TextField
                    label="Ngày kết thúc"
                    type="date"
                    variant="outlined"
                    value={
                      formData.end
                        ? formData.end.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "end",
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* NO DATE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{noDateLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      label="Số ngày"
                      type="number"
                      variant="outlined"
                      value={formData.noDate}
                      onChange={(e) =>
                        handleInputChange(
                          "noDate",
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* PARENT TASK */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{parentTaskLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <Autocomplete
                    options={tasks}
                    getOptionLabel={(option) => `${option.code} - ${option.name}`}
                    value={formData.parentTask}
                    onChange={(_, newValue) => handleInputChange("parentTask", newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Công việc phụ thuộc"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* INTERIOR ITEM */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{interiorItemLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <Autocomplete
                    options={items}
                    getOptionLabel={(option) => `${option.code} - ${option.name}`}
                    value={formData.interiorItem}
                    onChange={(_, newValue) => handleInputChange("interiorItem", newValue)}
                    filterOptions={(options, { inputValue }) => {
                      const inputValueLower = inputValue.toLowerCase();

                      if (formData.designCategoryId) {
                        console.log(formData.designCategoryId)
                        return options.filter(
                          (option) =>
                            (option.code.toLowerCase().includes(inputValueLower) ||
                              option.name.toLowerCase().includes(inputValueLower)) &&
                            option.interiorItemCategoryId === formData.designCategoryId
                        );
                      } else {
                        return options.filter(
                          (option) =>
                            option.code.toLowerCase().includes(inputValueLower) ||
                            option.name.toLowerCase().includes(inputValueLower)
                        );
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn nội thất"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>


            {/* ROOM (OPTIONAL) */}
            {/* <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">
                    {roomLabel}
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.room}
                      style={{ backgroundColor: "#EFEFEF" }}
                      disabled
                      onChange={(e) =>
                        handleInputChange("room", e.target.value)
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Option1">Option1</MenuItem>
                      <MenuItem value="Option2">Option2</MenuItem>
                      <MenuItem value="Option3">Option3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid> */}

            {/* STATUS */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">{statusLabel}</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.status}
                      onChange={(e) =>
                        handleInputChange("status", e.target.value)
                      }
                    >
                      {projectTaskStatusOptions.map((status, index) => (
                        <MenuItem key={status} value={index}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
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
        </Box>
      </Modal>
    </Box>
  );
}
