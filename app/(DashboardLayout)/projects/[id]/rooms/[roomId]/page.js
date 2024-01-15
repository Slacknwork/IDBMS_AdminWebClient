"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getRoomById, updateRoom, deleteRoom } from "/services/roomServices";
import { getAllRoomTypes } from "/services/roomTypeServices";

import locales from "/constants/locales";
import { companyRoleConstants } from "/constants/enums/companyRole";
import { participationRoleIndex } from "/constants/enums/participationRole";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import checkValidField from "/components/validations/field";

export default function RoomDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const data = useSelector((state) => state.data);
  const participationRole = data?.projectRole;

  const [formData, setFormData] = useState({
    usePurpose: "",
    usePurposeError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    area: 0,
    areaError: { hasError: false, label: "" },
    pricePerArea: 0,
    pricePerAreaError: { hasError: false, label: "" },
    roomTypeId: "",
    roomTypeIdError: { hasError: false, label: "" },
    projectId: params.id,
    language: 0,
    tasks: [],
  });

  const validateInput = (field, value) => {
    switch (field) {
      case "usePurpose":
        return value.trim() === "" ? "Use Purpose cannot be empty" : "";
      case "description":
        return value.trim() === "" ? "Description cannot be empty" : "";
      case "area":
      case "pricePerArea":
      case "roomTypeId":
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "usePurpose":
      case "area":
      case "language":
      case "pricePerArea":
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
      case "floorNo":
      case "description":
      case "roomTypeId":
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
          [`${field}Error`]: {
            hasError: false,
            label: "",
          },
        }));
        break;
      default:
    }
  };

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [roomtypes, setRoomTypes] = useState([]);

  const fetchRooms = async () => {
    try {
      const data = await getRoomById(params.roomId, params.id);
      setFormData((prevData) => ({ ...prevData, ...data }));
      setTotal(
        data?.tasks?.reduce(
          (acc, task) => acc + task.pricePerUnit * task.unitInContract,
          0
        )
      );
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Phòng' từ hệ thống");
      console.log(error);
    }
  };
  const fetchRoomTypes = async () => {
    try {
      const rts = await getAllRoomTypes({});
      setRoomTypes(rts.list);
    } catch (error) {
      toast.error("Lỗi nạp dữ liệu 'Loại phòng' từ hệ thống");
      console.log(error);
    }
  };

  const fetchDataFromApi = async () => {
    setLoading(true);
    await Promise.all([fetchRooms(), fetchRoomTypes()]);
    setLoading(false);
  };

  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const onDeleteRoom = async () => {
    try {
      await deleteRoom(params.roomId, params.id);
      toast.success("Xoá thành công!");
      router.push(`/projects/${params.id}/floors/${params.floorId}/rooms`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const onSaveRoom = async () => {
    try {
      await updateRoom(params.roomId ?? "", formData, params.id);
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

    onSaveRoom();
    setSwitchSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchSubmit]);

  useEffect(() => {
    fetchDataFromApi();
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

  return (
    <PageContainer
      title="Thông tin phòng"
      description="Thông tin chi tiết của phòng"
    >
      <Grid container spacing={2}>
        <Grid item xs={2} lg={2}>
          <Button
            component={Link}
            disableElevation
            variant="contained"
            color="primary"
            href={`/projects/${params.id}/tasks?viewMode=1&floor=${formData.floorId}&room=${params.roomId}`}
            endIcon={<AssignmentIcon />}
          >
            Xem công việc
          </Button>
        </Grid>
        <Grid item xs={10} lg={10}>
          <DetailsPage
            loading={loading}
            title="Thông tin phòng"
            saveMessage="Lưu thông tin phòng?"
            onSave={handleSubmit}
            hasDelete={isManager}
            hideSave={!isManager}
            deleteMessage="Xoá phỏng?"
            onDelete={onDeleteRoom}
          >
            <Grid item xs={12} lg={8}>
              <Grid container columnSpacing={2} rowSpacing={4}>
                {/* USE PURPOSE */}
                <Grid item xs={12} lg={12}>
                  <TextForm
                    title="Mục đích"
                    required
                    disabled={!isManager}
                    subtitle="Mô đích sử dụng của tầng"
                    value={formData.usePurpose}
                    error={formData.usePurposeError.hasError}
                    errorLabel={formData.usePurposeError.label}
                    onChange={(e) =>
                      handleInputChange("usePurpose", e.target.value)
                    }
                  ></TextForm>
                </Grid>

                {/* AREA */}
                <Grid item xs={12} lg={12}>
                  <NumberSimpleForm
                    title="Diện tích"
                    required
                    inputProps={{
                      min: 0,
                    }}
                    disabled={!isManager}
                    subtitle="Tổng diện tích của phòng"
                    value={formData.area}
                    error={formData.areaError.hasError}
                    errorLabel={formData.areaError.label}
                    onChange={(value) => handleInputChange("area", value)}
                    endAdornment={
                      <>
                        m<sup>2</sup>
                      </>
                    }
                  ></NumberSimpleForm>
                </Grid>

                {/* PRICE PER AREA */}
                <Grid item xs={12} lg={12}>
                  <NumberForm
                    title="Đơn giá"
                    disabled
                    subtitle="Đơn giá trên 1 đơn vị diện tích của phòng"
                    value={formData.pricePerArea?.toLocaleString(locales.viVN)}
                    error={formData.pricePerAreaError.hasError}
                    errorLabel={formData.pricePerAreaError.label}
                    onChange={() => {}}
                    endAdornment={"VND/m²"}
                  ></NumberForm>
                </Grid>

                {/* ROOM TYPE */}
                <Grid item xs={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} lg={4}>
                      <Typography variant="h5">
                        Loại phòng<span style={{ color: "red" }}>*</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} lg={8}>
                      <FormControl fullWidth>
                        <TextField
                          disabled={!isManager}
                          select
                          variant="outlined"
                          value={formData.roomTypeId}
                          error={formData.roomTypeIdError.hasError}
                          helperText={formData.roomTypeIdError.label}
                          onChange={(e) =>
                            handleInputChange("roomTypeId", e.target.value)
                          }
                        >
                          {roomtypes.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {/* DESCRIPTION */}
                <Grid item xs={12} lg={12}>
                  <TextForm
                    disabled={!isManager}
                    title="Mô tả"
                    multiline
                    rows={4}
                    subtitle="Mô tả sơ lược về phòng"
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
            <Grid item xs={12} lg={4}>
              <Card
                variant="outlined"
                sx={{ p: 3, border: 1, borderColor: "gray" }}
              >
                <Typography variant="h5" sx={{ my: "auto" }}>
                  Bảng giá
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ my: "auto", mt: 1, borderTop: 1, borderColor: "gray" }}
                ></Typography>
                {formData?.tasks &&
                  formData?.tasks.length > 0 &&
                  formData?.tasks.map((task, index) => (
                    <Grid container key={index} sx={{ mt: 1, pt: 2 }}>
                      <Grid item xs={6} lg={5}>
                        <Typography variant="h6" sx={{ my: "auto" }}>
                          {task.name ?? ""}:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                        <Typography variant="p" sx={{ my: "auto" }}>
                          {(
                            task.unitInContract * task.pricePerUnit
                          ).toLocaleString("en-US") ?? 0}{" "}
                          VND
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                <Grid
                  container
                  sx={{ mt: 2, borderTop: 1, borderColor: "gray", pt: 2 }}
                >
                  <Grid item xs={6} lg={5}>
                    <Typography variant="h6" sx={{ my: "auto" }}>
                      Tổng cộng:
                    </Typography>
                  </Grid>
                  <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                    <Typography variant="h6" sx={{ my: "auto" }}>
                      {total.toLocaleString("en-US") ?? 0} VND
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </DetailsPage>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
