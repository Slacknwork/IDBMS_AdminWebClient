"use client";

import { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DeleteModal from "./deleteModal";
import SaveModal from "./modal";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { getAllTaskDesigns } from "../../../../../../api/taskDesignServices";
import { getAllInteriorItems } from "../../../../../../api/interiorItemServices";
import { getAllTaskCategories } from "../../../../../../api/taskCategoryServices";
import { getPaymentStagesByProjectId } from "../../../../../../api/paymentStageServices";
import { getProjectTaskById, getProjectTasksByRoomId } from "../../../../../../api/projectTaskServices";

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

const taskDesignLabel = "Thiết kế công việc (Tùy chọn)";

const roomLabel = "Phòng";

const statusLabel = "Trạng thái";

export default function TaskOverview() {
  const params = useParams();
  const taskOptions = [
    { id: 0, name: "Task Option 1" },
    { id: 1, name: "Task Option 2" },
    { id: 2, name: "Task Option 3" },
    // Add more task options as needed
  ];

  const interiorItemOptions = [
    { id: 0, name: "Interior Item 1" },
    { id: 1, name: "Interior Item 2" },
    { id: 2, name: "Interior Item 3" },
    // Add more interior items as needed
  ];

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
    taskDesign: "",
    room: "",
    status: "",
    statusError: { hasError: false, label: "" },
    designCategoryId: "",
    taskCategoryId: "",
    paymentStage: null,
    taskCategory: null,
    roomName: ""
  });

  const validateInput = (field, value) => {
    // Implement validation logic for each field
    // ...

    return ""; // Return empty string if the field is valid
  };

  const handleInputChange = (field, value) => {
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  const [items, setItems] = useState([]);
  const [taskDesigns, setTaskDesigns] = useState([]);
  const [taskCategories, setTaskCategories] = useState([]);
  const [stages, setStages] = useState([]);
  const [task, setTask] = useState([]);
  const [listTask, setListTask] = useState([]);

  const fetchDataFromApi = async () => {
    if (!initialized.current) {
      try {
        const data = await getProjectTaskById(params.taskId)
        console.log(data)
        setTask(data)
        mapData(data)

        const listTasksInRoom = await getProjectTasksByRoomId(data.roomId)
        console.log(listTasksInRoom)
        setListTask(listTasksInRoom)

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

  const mapData = (data) => {
    console.log(data.calculationUnit)
    if (data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: data.name || "",
        description: data.description || "",
        percentage: data.percentage || 0,
        calculationUnit: data?.calculationUnit ?? "",
        pricePerUnit: data.pricePerUnit || "",
        unitInContract: data.unitInContract || 0,
        unitUsed: data.unitUsed || 0,
        isIncurred: data.isIncurred || false,
        startedDate: new Date(data.startedDate) || new Date(),
        endDate: data.endDate ? new Date(data.endDate) : null,
        noDate: data.noDate || 0,
        parentTask: data.parentTask || null,
        interiorItem: data.interiorItem || null,
        taskDesign: data.taskDesign || "",
        room: data.room || "",
        status: data.status || "",
        designCategoryId: data.designCategoryId || "",
        taskCategoryId: data.taskCategoryId || "",
        paymentStage: data.paymentStage || null,
        taskCategory: data.taskCategory || null,
        roomName: data?.room?.usePurpose || ""
      }));
    }
  };

  return (
    <PageContainer title="Task Details" description="Details of the task">
      <Box sx={{ overflow: "auto", mt: 3 }}>
        <Grid container columnSpacing={4} rowSpacing={4}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              borderBottom: 1,
              display: "flex",
              justifyContent: "space-between",
              borderColor: "grey.500",
              py: 3,
            }}
          >
            <Typography variant="h2" sx={{ my: "auto" }}>
              Công việc: {formData.name}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <DeleteModal>
                <span>Xóa</span>
              </DeleteModal>
              <SaveModal>
                <span>Lưu</span>
              </SaveModal>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container columnSpacing={2} rowSpacing={4}>
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
              {console.log(formData.calculationUnit)}
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
                        onChange={(e) =>
                          handleInputChange(
                            "percentage",
                            parseInt(e.target.value)
                          )
                        }
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
                        {calculationUnitOptions.map((unit, index) => (
                          <MenuItem key={index} value={index}>
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
                    <Typography variant="p">
                      {unitInContractSubLabel}
                    </Typography>
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
                    <Typography variant="h5">Mô tả</Typography>
                    <Typography variant="p">Mô tả chi tiết về công việc</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        error={formData.descriptionError.hasError}
                        variant="outlined"
                        value={formData.description}
                        helperText={formData.descriptionError.label}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                      />
                    </FormControl>
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
                      options={stages}
                      getOptionLabel={(option) => `${option.name}`}
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

              {/* TASK CATEGORY */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">Danh mục công việc</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <Autocomplete
                      options={taskCategories}
                      getOptionLabel={(option) => `${option.name}`}
                      value={formData.taskCategory}
                      onChange={(_, newValue) =>
                        handleInputChange("taskCategory", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Chọn danh mục công việc"
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
                    <Typography variant="h5">Ngày bắt đầu</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        label="Ngày bắt đầu"
                        type="date"
                        variant="outlined"
                        value={
                          formData.startedDate
                            ? formData.startedDate.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            "Chọn ngày bắt đầu",
                            e.target.value ? new Date(e.target.value) : null
                          )
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* END */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">End</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        label="Ngày kết thúc"
                        type="date"
                        variant="outlined"
                        value={
                          formData.endDate
                            ? formData.endDate.toISOString().split("T")[0]
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
                    </FormControl>
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
                        label="Số ngày làm việc"
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
                      options={listTask}
                      getOptionLabel={(option) => option.name}
                      value={formData.parentTask}
                      onChange={(_, newValue) =>
                        handleInputChange("parentTask", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Chọn công việc phụ thuộc"
                          variant="outlined"
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
                      onChange={(_, newValue) =>
                        handleInputChange("interiorItem", newValue)
                      }
                      filterOptions={(options, { inputValue }) => {
                        const inputValueLower = inputValue.toLowerCase();
                        return options.filter(
                          (option) =>
                            option.code.toLowerCase().includes(inputValueLower) ||
                            option.name.toLowerCase().includes(inputValueLower)
                        );

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

              {/* TASK DESIGN (OPTIONAL) */}
              {/* <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">{taskDesignLabel}</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <Select
                        variant="outlined"
                        value={formData.taskDesign}
                        onChange={(e) =>
                          handleInputChange("taskDesign", e.target.value)
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

              {/* ROOM (OPTIONAL) */}
              <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                  <Grid item xs={4} lg={4}>
                    <Typography variant="h5">{roomLabel}</Typography>
                  </Grid>
                  <Grid item xs={8} lg={8}>
                    <FormControl fullWidth>
                      <TextField
                        variant="outlined"
                        value={formData.roomName}
                        disabled

                        InputProps={{
                          style: {
                            backgroundColor: "#EFEFEF",
                          },
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

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
                          <MenuItem key={index} value={index}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Additional details can be added here */}
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
