"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import moment from "moment-timezone";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import calculationUnitOptions from "/constants/enums/calculationUnit";
import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";

import { getAllTaskDesigns } from "/services/taskDesignServices";
import { getFloorsByProjectId } from "/services/floorServices";
import {
  createProjectTask,
  getProjectTasksByProjectId,
} from "/services/projectTaskServices";
import { getAllTaskCategories } from "/services/taskCategoryServices";
import { getPaymentStagesByProjectId } from "/services/paymentStageServices";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import NumberForm from "/components/shared/Forms/Number";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import AutocompleteGroupForm from "/components/shared/Forms/AutocompleteGroup";
import checkValidField from "/components/validations/field"

export default function CreateTaskModal({ hasCallback, onCallback }) {
  // CONSTANTS
  const roomQuery = "room";
  const stageQuery = "stage";

  // INIT
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    code: null,
    name: "",
    nameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    percentage: 0,
    percentageError: { hasError: false, label: "" },
    calculationUnit: 0,
    calculationUnitError: { hasError: false, label: "" },
    pricePerUnit: 0,
    pricePerUnitError: { hasError: false, label: "" },
    unitInContract: 0,
    unitInContractError: { hasError: false, label: "" },
    unitUsed: 0,
    unitUsedError: { hasError: false, label: "" },
    isIncurred: false,
    startedDate: moment(),
    startedDateError: { hasError: false, label: "" },
    estimateBusinessDay: 0,
    estimateBusinessDayError: { hasError: false, label: "" },
    parentTaskId: null,
    parentTaskIdError: { hasError: false, label: "" },
    interiorItem: null,
    taskDesign: null,
    taskDesignId: null,
    taskDesignIdError: { hasError: false, label: "" },
    roomId: searchParams.get(roomQuery) ?? null,
    roomIdError: { hasError: false, label: "" },
    status: 0,
    statusError: { hasError: false, label: "" },
    designCategoryId: "",
    taskCategoryId: "",
    taskCategoryIdError: { hasError: false, label: "" },
    paymentStageId: searchParams.get(stageQuery) ?? null,
    paymentStageIdError: { hasError: false, label: "" },
    taskCategory: null,
    projectId: params.id,
  });

  const onModalOpen = () => {
    setFormData((prevData) => ({
      ...prevData,
      roomId: searchParams.get(roomQuery) ?? null,
      paymentStageId: searchParams.get(stageQuery) ?? null,
    }));
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "calculationUnit":
      case "pricePerUnit":
      case "unitInContract":
      case "isIncurred":
      case "status":
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
      default:
    }
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskDesigns, setTaskDesigns] = useState([]);
  const [taskCategories, setTaskCategories] = useState([]);
  const [stages, setStages] = useState([]);

  const fetchDataFromApi = async () => {
    try {
      const floors = await getFloorsByProjectId({ projectId: params.id });
      setRooms(
        floors.list.flatMap((floor) =>
          floor.rooms?.map((room) => ({
            ...room,
            floorUsePurpose: floor.usePurpose,
          }))
        )
      );
      const listTask = await getProjectTasksByProjectId({
        projectId: params.id,
      });
      setTasks(listTask.list);
      const listTaskDesign = await getAllTaskDesigns({});
      setTaskDesigns(listTaskDesign.list);
      const listTaskCategory = await getAllTaskCategories({});
      setTaskCategories(listTaskCategory.list);
      const listStagesByProjectId = await getPaymentStagesByProjectId({
        projectId: params.id,
      });
      setStages(listStagesByProjectId.list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    }
  };

  const updateFormFields = (selectedTaskDesign) => {
    if (selectedTaskDesign) {
      setFormData((prevData) => ({
        ...prevData,
        code: selectedTaskDesign.code || null,
        name: selectedTaskDesign.name || "",
        description: selectedTaskDesign.description || "",
        percentage: 0,
        calculationUnit: selectedTaskDesign?.calculationUnit ?? -1,
        pricePerUnit: selectedTaskDesign.estimatePricePerUnit || 0,
        designCategoryId: selectedTaskDesign.interiorItemCategoryId || null,
        taskCategoryId: selectedTaskDesign.taskCategoryId || null,
        taskCategory: selectedTaskDesign.taskCategory || "",
      }));
    }
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  useEffect(() => {
    fetchDataFromApi();
    if (!switchSubmit) return;

    const hasErrors = Object.values(formData).some((field) => field?.hasError);
    setFormHasError(hasErrors);

    if (hasErrors) {
      toast.error("Dữ liệu nhập không đúng yêu cầu!");
      setSwitchSubmit(false);
      return;
    }

    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  const handleCreate = async () => {
    try {
      const response = await createProjectTask(formData);
      console.log(response);
      toast.success("Thêm thành công!");
      hasCallback && onCallback();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <FormModal
      buttonLabel="Tạo"
      title="Tạo công việc"
      submitLabel="Tạo"
      hasOpenEvent
      onOpen={onModalOpen}
      onSubmit={handleSubmit}
      size="big"
      disableCloseOnSubmit={formHasError}
    >
      {/* TASK DESIGN (OPTIONAL) */}
      <Grid item xs={12} lg={12}>
        <AutocompleteForm
          title="Mẫu công việc"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Chọn mẫu công việc"
          value={formData.taskDesignId}
          options={taskDesigns}
          error={formData.taskDesignIdError.hasError}
          errorLabel={formData.taskDesignIdError.label}
          onChange={(value) => {
            handleInputChange("taskDesignId", value);
            if (value === null) {
              setFormData((prevData) => ({
                ...prevData,
                designCategoryId: null,
              }));
            } else {
              updateFormFields(
                taskDesigns.find((design) => design.id === value)
              );
            }
          }}
        ></AutocompleteForm>
      </Grid>

      {/* NAME */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Tên"
          required
          titleSpan={3}
          fieldSpan={9}
          subtitle="Nhập tên giai đoạn"
          value={formData.name}
          error={formData.nameError.hasError}
          errorLabel={formData.nameError.label}
          onChange={(e) => handleInputChange("name", e.target.value)}
        ></TextForm>
      </Grid>

      {/* PERCENTAGE
      <Grid item xs={12} lg={6}>
        <NumberSimpleForm
          title="Tiến độ"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          inputProps={{
            min: 0,
            max: 100,
          }}
          subtitle="Tiến độ công việc tính theo phần trăm"
          value={formData.percentage}
          error={formData.percentageError.hasError}
          errorLabel={formData.percentageError.label}
          onChange={(value) => handleInputChange("percentage", value)}
          endAdornment={<>%</>}
        ></NumberSimpleForm>
      </Grid> */}

      {/* CALCULATION UNIT */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Đơn vị tính"
          titleSpan={6}
          fieldSpan={6}
          required
          spacing={5}
          subtitle="Đơn vị tính của công việc"
          value={formData.calculationUnit}
          options={calculationUnitOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.statusError.hasError}
          errorLabel={formData.statusError.label}
          onChange={(value) => handleInputChange("calculationUnit", value)}
        ></SelectForm>
      </Grid>

      {/* PRICE PER UNIT */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Đơn giá"
          required
          titleSpan={6}
          fieldSpan={6}
          subtitle="Đơn giá trên một đơn vị tính"
          value={formData.pricePerUnit}
          error={formData.pricePerUnitError.hasError}
          errorLabel={formData.pricePerUnitError.label}
          onChange={(value) => handleInputChange("pricePerUnit", value)}
          endAdornment={<>VND</>}
        ></NumberForm>
      </Grid>

      {/* UNIT IN CONTRACT */}
      <Grid item xs={12} lg={6}>
        <NumberSimpleForm
          title="KL Hợp đồng"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          inputProps={{
            min: 0,
          }}
          subtitle="Khối lượng ước tính ghi trong hợp đồng"
          value={formData.unitInContract}
          error={formData.unitInContractError.hasError}
          errorLabel={formData.unitInContractError.label}
          onChange={(value) => handleInputChange("unitInContract", value)}
          endAdornment={<>{calculationUnitOptions[formData.calculationUnit]}</>}
        ></NumberSimpleForm>
      </Grid>

      {/* TASK CATEGORY */}
      <Grid item xs={12} lg={6}>
        <AutocompleteForm
          title="Danh mục"
          titleSpan={6}
          fieldSpan={6}
          subtitle="Chọn danh mục công việc"
          value={formData.taskCategoryId}
          options={taskCategories}
          error={formData.taskCategoryIdError.hasError}
          errorLabel={formData.taskCategoryIdError.label}
          onChange={(value) => {
            handleInputChange("taskCategoryId", value);
          }}
        ></AutocompleteForm>
      </Grid>

      {/* STARTED */}
      <Grid item xs={12} lg={6}>
        <DateForm
          datetime
          title="Ngày bắt đầu"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Ngày bắt đầu thực hiện công việc"
          value={formData.startedDate}
          error={formData.startedDateError.hasError}
          errorLabel={formData.startedDateError.label}
          onChange={(value) => handleInputChange("startedDate", value)}
        ></DateForm>
      </Grid>

      {/* ESTIMATE BUSINESS DAY */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Ước tính số ngày làm việc"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Nhập số ngày"
          value={formData.estimateBusinessDay}
          error={formData.estimateBusinessDayError.hasError}
          errorLabel={formData.estimateBusinessDayError.label}
          onChange={(value) => handleInputChange("estimateBusinessDay", value)}
          endAdornment={<></>}
        ></NumberForm>
      </Grid>

      {/* PAYMENT STAGE */}
      <Grid item xs={12} lg={6}>
        <AutocompleteForm
          title="Giai đoạn"
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Chọn giai đoạn cho công việc này"
          value={formData.paymentStageId}
          options={stages}
          error={formData.paymentStageIdError.hasError}
          errorLabel={formData.paymentStageIdError.label}
          onChange={(value) => {
            handleInputChange("paymentStageId", value);
          }}
        ></AutocompleteForm>
      </Grid>

      {/* STATUS */}
      <Grid item xs={12} lg={6}>
        <SelectForm
          title="Trạng thái"
          titleSpan={6}
          fieldSpan={6}
          required
          subtitle="Trạng thái của công việc"
          value={formData.status}
          options={projectTaskStatusOptions}
          defaultValue={-1}
          defaultLabel="Chọn một..."
          error={formData.statusError.hasError}
          errorLabel={formData.statusError.label}
          onChange={(value) => handleInputChange("status", value)}
        ></SelectForm>
      </Grid>

      {/* START DATE - END DATE
      <Grid item xs={12} lg={12}>
        <DateRangeForm
          title="Thời gian"
          required
          titleSpan={3}
          fieldSpan={9}
          subtitle="Thời gian ước tính thực hiện công việc"
          valueStart={formData.startedDate}
          valueEnd={formData.endDate}
          errorStart={formData.startedDateError.hasError}
          errorEnd={formData.endDateError.hasError}
          errorStartLabel={formData.startedDateError.label}
          errorEndLabel={formData.endDateError.label}
          onChange={(value) => {
            handleInputChange("startedDate", value?.start);
            handleInputChange("endDate", value?.end);
          }}
        ></DateRangeForm>
      </Grid> */}

      {/* UNIT USED
      <Grid item xs={12} lg={6}>
        <NumberSimpleForm
          title="Thực hiện"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          inputProps={{
            min: 0,
          }}
          subtitle="Khối lượng thực tế tính theo đơn vị"
          value={formData.unitUsed}
          error={formData.unitUsedError.hasError}
          errorLabel={formData.unitUsedError.label}
          onChange={(value) => handleInputChange("unitUsed", value)}
          endAdornment={<>{calculationUnitOptions[formData.calculationUnit]}</>}
        ></NumberSimpleForm>
      </Grid> */}

      {/* IS INCURRED
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
      </Grid> */}

      {/* ROOM */}
      <Grid item xs={12} lg={12}>
        <AutocompleteGroupForm
          title="Phòng"
          titleSpan={3}
          fieldSpan={9}
          groupBy="floorUsePurpose"
          subtitle="Chọn phòng của công việc này"
          value={formData.roomId}
          options={rooms}
          error={formData.roomIdError.hasError}
          errorLabel={formData.roomIdError.label}
          onChange={(value) => {
            handleInputChange("roomId", value);
          }}
        ></AutocompleteGroupForm>
      </Grid>

      {/* PARENT TASK */}
      <Grid item xs={12} lg={12}>
        <AutocompleteForm
          title="Công việc phụ thuộc"
          titleSpan={3}
          fieldSpan={9}
          subtitle="Chọn công việc phụ thuộc"
          value={formData.parentTaskId}
          options={tasks}
          error={formData.parentTaskIdError.hasError}
          errorLabel={formData.parentTaskIdError.label}
          onChange={(value) => {
            handleInputChange("parentTaskId", value);
          }}
        ></AutocompleteForm>
      </Grid>

      {/* DESCRIPTION */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Mô tả"
          multiline
          rows={4}
          titleSpan={3}
          fieldSpan={9}
          subtitle="Mô tả công việc"
          value={formData.description}
          error={formData.descriptionError.hasError}
          errorLabel={formData.descriptionError.label}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></TextForm>
      </Grid>

      {/* NO DATE
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
                  handleInputChange("noDate", parseInt(e.target.value, 10))
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid> */}

      {/* INTERIOR ITEM
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

                if (formData.designCategoryId) {
                  console.log(formData.designCategoryId);
                  return options.filter(
                    (option) =>
                      (option.code.toLowerCase().includes(inputValueLower) ||
                        option.name.toLowerCase().includes(inputValueLower)) &&
                      option.interiorItemCategoryId ===
                        formData.designCategoryId
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
      </Grid> */}

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
    </FormModal>
  );
}
