"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import moment from "moment-timezone";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";
import { participationRoleIndex } from "/constants/enums/participationRole";
import { companyRoleConstants } from "/constants/enums/companyRole";
import timezone from "/constants/timezone";

import { getAllTaskCategories } from "/services/taskCategoryServices";
import { getPaymentStagesByProjectId } from "/services/paymentStageServices";
import {
  getProjectTaskById,
  updateProjectTask,
  getProjectTasksByProjectId,
} from "/services/projectTaskServices";
import { getFloorsByProjectId } from "/services/floorServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import NumberForm from "/components/shared/Forms/Number";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import AutocompleteGroupForm from "/components/shared/Forms/AutocompleteGroup";
import checkValidField from "/components/validations/field";

moment.tz.setDefault(timezone.momentDefault);

export default function TaskOverviewPage() {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const participationRole = data?.projectRole;

  const projectId = params.id;
  const taskId = params.taskId;

  const [formData, setFormData] = useState({
    code: null,
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
    startedDate: null,
    startedDateError: { hasError: false, label: "" },
    endDate: null,
    endDateError: { hasError: false, label: "" },
    noDate: 0,
    interiorItem: null,
    taskDesign: null,
    taskDesignId: null,
    taskDesignIdError: { hasError: false, label: "" },
    roomId: null,
    roomIdError: { hasError: false, label: "" },
    parentTaskId: null,
    parentTaskIdError: { hasError: false, label: "" },
    status: -1,
    statusError: { hasError: false, label: "" },
    designCategoryId: "",
    taskCategoryId: "",
    taskCategoryIdError: { hasError: false, label: "" },
    paymentStageId: null,
    paymentStageIdError: { hasError: false, label: "" },
    taskCategory: null,
    projectId: params.id,
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
      case "calculationUnit":
        result = checkValidField({
          value: value,
          required: true,
        });

        break;
      case "pricePerUnit":
      case "unitInContract":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true,
        });

        break;
      case "status":
        result = checkValidField({
          value: value,
          required: true,
        });

        break;
      case "description":
        result = checkValidField({
          value: value,
          maxLength: 750,
        });

        break;
      case "startedDate":
        result = checkValidField({
          value: value,
        });

        break;
      case "estimateBusinessDay":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
        });

        break;
      case "taskDesignId":
      case "taskCategoryId":
      case "designCategoryId":
      case "paymentStageId":
      case "parentTaskId":
      case "roomId":
        result = checkValidField({
          value: value,
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

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  // PAGE METADATA
  const [pageName, setPageName] = useState("Tên khu công trình");
  const [pageDescription, setPageDescription] = useState(
    "Mô tả khu công trình"
  );

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskCategories, setTaskCategories] = useState([]);
  const [stages, setStages] = useState([]);

  const fetchDataFromApi = async () => {
    setLoading(true);
    const fetchFloors = async () => {
      try {
        const floors = await getFloorsByProjectId({ projectId });
        setRooms(
          floors.list.flatMap((floor) =>
            floor.rooms?.map((room) => ({
              ...room,
              floorUsePurpose: floor.usePurpose,
            }))
          )
        );
      } catch (error) {
        toast.error("Lỗi nạp dữ liệu 'Tầng' từ hệ thống");
        console.log(error);
      }
    };
    const fetchTasks = async () => {
      try {
        const listTask = await getProjectTasksByProjectId({ projectId });
        setTasks(listTask.list);
        const task = await getProjectTaskById(taskId, params.id);
        setFormData((prevData) => ({ ...prevData, ...task }));
      } catch (error) {
        toast.error("Lỗi nạp dữ liệu 'Công việc' từ hệ thống");
        console.log(error);
      }
    };
    const fetchTaskCategories = async () => {
      try {
        const listTaskCategory = await getAllTaskCategories({
          projectId: params.id,
        });
        setTaskCategories(listTaskCategory.list);
      } catch (error) {
        toast.error("Lỗi nạp dữ liệu 'Loại công việc' từ hệ thống");
        console.log(error);
      }
    };
    const fetchStages = async () => {
      try {
        const listStagesByProjectId = await getPaymentStagesByProjectId({
          projectId,
        });
        setStages(listStagesByProjectId.list);
      } catch (error) {
        toast.error("Lỗi nạp dữ liệu 'Giai đoạn thanh toán' từ hệ thống");
        console.log(error);
      }
    };
    await Promise.all([
      fetchFloors(),
      fetchTasks(),
      fetchTaskCategories(),
      fetchStages(),
    ]);
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

  const onSaveTask = async () => {
    try {
      await updateProjectTask(params.taskId, formData, params.id);
      setPageName(formData.name);
      setPageDescription(formData.description);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
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

    onSaveTask();
    setSwitchSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchSubmit]);

  useEffect(() => {
    fetchDataFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isManager, setIsManager] = useState(false);
  useEffect(() => {
    setIsManager(
      (user?.role && user?.role === companyRoleConstants.ADMIN) ||
        (participationRole?.role &&
          participationRole?.role === participationRoleIndex.ProjectManager)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participationRole?.role, user?.role]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <PageContainer title="Task Details" description="Details of the task">
      <DetailsPage
        title="Thông tin công việc"
        saveMessage="Lưu thông tin công việc?"
        onSave={handleSubmit}
        hideSave={!isManager}
        loading={loading}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={4}>
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Tên"
                required
                disabled={!isManager}
                titleSpan={3}
                fieldSpan={9}
                subtitle="Nhập tên giai đoạn"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              ></TextForm>
            </Grid>

            {/* CALCULATION UNIT */}
            <Grid item xs={12} lg={6}>
              <SelectForm
                title="Đơn vị tính"
                titleSpan={6}
                fieldSpan={6}
                disabled={!isManager}
                required
                spacing={5}
                subtitle="Đơn vị tính của công việc"
                value={formData.calculationUnit}
                options={calculationUnitOptions}
                defaultValue={-1}
                defaultLabel="Chọn một..."
                error={formData.statusError.hasError}
                errorLabel={formData.statusError.label}
                onChange={(value) =>
                  handleInputChange("calculationUnit", value)
                }
              ></SelectForm>
            </Grid>

            {/* PRICE PER UNIT */}
            <Grid item xs={12} lg={6}>
              <NumberForm
                title="Đơn giá"
                required
                disabled={!isManager}
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
                disabled={!isManager}
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
                endAdornment={
                  <>{calculationUnitOptions[formData.calculationUnit]}</>
                }
              ></NumberSimpleForm>
            </Grid>

            {/* TASK CATEGORY */}
            <Grid item xs={12} lg={6}>
              <AutocompleteForm
                title="Danh mục"
                titleSpan={6}
                fieldSpan={6}
                disabled={!isManager}
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
                required
                titleSpan={6}
                fieldSpan={6}
                disabled={!isManager}
                spacing={5}
                subtitle="Ngày bắt đầu thực hiện công việc"
                value={formData.startedDate}
                error={formData.startedDateError.hasError}
                errorLabel={formData.startedDateError.label}
                onChange={(value) => handleInputChange("startedDate", value)}
              ></DateForm>
            </Grid>

            {/* END (OPTIONAL) */}
            <Grid item xs={12} lg={6}>
              <DateForm
                datetime
                title="Ngày kết thúc"
                titleSpan={6}
                fieldSpan={6}
                disabled={!isManager}
                subtitle="Ngày hoàn thành công việc"
                value={formData.endDate}
                error={formData.endDateError.hasError}
                errorLabel={formData.endDateError.label}
                onChange={(value) => handleInputChange("endDate", value)}
              ></DateForm>
            </Grid>

            {/* PAYMENT STAGE */}
            <Grid item xs={12} lg={6}>
              <AutocompleteForm
                title="Giai đoạn"
                titleSpan={6}
                fieldSpan={6}
                spacing={5}
                disabled={!isManager}
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
                disabled={!isManager}
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

            {/* ROOM */}
            <Grid item xs={12} lg={12}>
              <AutocompleteGroupForm
                title="Phòng"
                titleSpan={3}
                fieldSpan={9}
                disabled={!isManager}
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
                disabled={!isManager}
                subtitle="Chọn công việc phụ thuộc"
                value={formData.parentTaskId}
                options={tasks}
                error={formData.parentTaskIdError.hasError}
                errorLabel={formData.parentTaskIdError.label}
                onChange={(value) => {
                  handleInputChange("parentTaskId", value);
                }}
                disableOptions={formData.id}
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
                disabled={!isManager}
                subtitle="Mô tả công việc"
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
      </DetailsPage>
    </PageContainer>
  );
}
