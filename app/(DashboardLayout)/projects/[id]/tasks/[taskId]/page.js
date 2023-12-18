"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import calculationUnitOptions from "/constants/enums/calculationUnit";
import projectTaskStatusOptions from "/constants/enums/projectTaskStatus";

import { getAllTaskCategories } from "/api/taskCategoryServices";
import { getPaymentStagesByProjectId } from "/api/paymentStageServices";
import {
  getProjectTaskById,
  updateProjectTask,
  getProjectTasksByProjectId,
} from "/api/projectTaskServices";
import { getFloorsByProjectId } from "/api/floorServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import NumberForm from "/components/shared/Forms/Number";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import AutocompleteGroupForm from "/components/shared/Forms/AutocompleteGroup";

export default function TaskOverviewPage() {
  const params = useParams();

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
    parentTaskId: null,
    parentTaskIdError: { hasError: false, label: "" },
    interiorItem: null,
    taskDesign: null,
    taskDesignId: null,
    taskDesignIdError: { hasError: false, label: "" },
    roomId: null,
    roomIdError: { hasError: false, label: "" },
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
    setFormData((prevData) => ({ ...prevData, [field]: value }));
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
      const listTask = await getProjectTasksByProjectId({ projectId });
      setTasks(listTask.list);
      const listTaskCategory = await getAllTaskCategories({});
      setTaskCategories(listTaskCategory.list);
      const listStagesByProjectId = await getPaymentStagesByProjectId({
        projectId,
      });
      setStages(listStagesByProjectId.list);
      const task = await getProjectTaskById(taskId);
      setFormData((prevData) => ({ ...prevData, ...task }));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu từ hệ thống");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const onSaveTask = async () => {
    try {
      await updateProjectTask(params.taskId, formData);
      setPageName(formData.name);
      setPageDescription(formData.description);
      toast.success("Cập nhật thành công!");
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <PageContainer title="Task Details" description="Details of the task">
      <DetailsPage
        title="Thông tin công việc"
        saveMessage="Lưu thông tin công việc?"
        onSave={onSaveTask}
        loading={loading}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={4}>
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
