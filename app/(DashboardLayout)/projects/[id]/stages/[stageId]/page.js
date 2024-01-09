"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import stageStatusOptions from "/constants/enums/stageStatus";
import {
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import {
  getPaymentStagesById,
  updatePaymentStage,
  deletePaymentStage,
} from "/services/paymentStageServices";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import moment from "moment-timezone";

export default function StageOverview() {
  const params = useParams();
  const router = useRouter();
  moment.tz.setDefault("Asia/Ho_Chi_Minh");

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    description: "",
    descriptionError: { hasError: false, label: "" },
    isPrepaid: false,
    isWarrantyStage: false,
    pricePercentage: 0,
    pricePercentageError: { hasError: false, label: "" },
    endTimePayment: null,
    endTimePaymentError: { hasError: false, label: "" },
    status: 0,
    statusError: { hasError: false, label: "" },
    projectId: params.id,
  });

  const [pageName, setPageName] = useState("Giai đoạn");
  const [pageDescription, setPageDescription] = useState("Giai đoạn");
  const [loading, setLoading] = useState(true);

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "isPrepaid":
      case "isWarrantyStage":
      case "pricePercentage":
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
      case "endTimePayment":
      case "description":
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
  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const fetchDataFromApi = async () => {
    try {
      setLoading(true);
      const stage = await getPaymentStagesById(params.stageId);
      setFormData((prevData) => ({ ...prevData, ...stage }));
      setPageName(stage.name);
      setPageDescription(stage.description);
      setLoading(false);
      console.log(stage);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi nạp dữ liệu 'Giai đoạn thanh toán' từ hệ thống");
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

  

  const onSaveStage = async () => {
    try {
      await updatePaymentStage(params.stageId, formData);
      toast.success("Lưu thành công!");
      setPageName(formData.name);
      setPageDescription(formData.description);
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi!");
    }
  };
  const onDeleteStage = async () => {
    try {
      await deletePaymentStage(params.stageId);
      toast.success("Xóa thành công!");
      router.push(`/projects/${params.id}/stages`);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Lỗi!");
    }
  };

// FETCH DATA FROM API
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

    onSaveStage();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <PageContainer title={pageName} description={pageDescription}>
      <DetailsPage
        title="Thông tin giai đoạn"
        saveMessage="Lưu thông tin giai đoạn?"
        onSave={handleSubmit}
        hasDelete
        deleteMessage="Xóa giai đoạn?"
        onDelete={onDeleteStage}
      >
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {/* NAME */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Tên"
                required
                subtitle="Nhập tên giai đoạn"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              ></TextForm>
            </Grid>

            {/* END TIME PAYMENT */}
            <Grid item xs={12} lg={12}>
              <DateForm
                datetime
                title="Hạn chót thanh toán"
                subtitle="Hạn chót thanh toán cho giai đoạn này"
                value={formData.endTimePayment}
                error={formData.endTimePaymentError.hasError}
                errorLabel={formData.endTimePaymentError.label}
                onChange={(value) => handleInputChange("endTimePayment", value)}
              ></DateForm>
            </Grid>

            {/* IS WARRANTY PAID */}
            <Grid item xs={12} lg={12}>
              <CheckboxForm
                title="Giai đoạn bảo hành"
                subtitle="Check vào ô nếu là giai đoạn bảo hành"
                required
                checked={formData.isWarrantyStage}
                onChange={(e) =>
                  handleInputChange("isWarrantyStage", e.target.checked)
                }
              ></CheckboxForm>
            </Grid>

            {/* IS PREPAID */}
            <Grid item xs={12} lg={12}>
              <CheckboxForm
                title="Phải trả trước"
                subtitle="Check nếu phải thanh toán trước khi bắt đầu"
                required
                checked={formData.isPrepaid}
                onChange={(e) =>
                  handleInputChange("isPrepaid", e.target.checked)
                }
              ></CheckboxForm>
            </Grid>

            {/* STATUS */}
            <Grid item xs={12} lg={12}>
              <SelectForm
                title="Trạng thái"
                required
                subtitle="Trạng thái của giai đoạn này"
                value={formData.status}
                options={stageStatusOptions}
                defaultValue={-1}
                defaultLabel="Chọn một..."
                error={formData.statusError.hasError}
                errorLabel={formData.statusError.label}
                onChange={(value) => handleInputChange("status", value)}
                disabled
              ></SelectForm>
            </Grid>

            {/* DESCRIPTION */}
            <Grid item xs={12} lg={12}>
              <TextForm
                title="Mô tả"
                multiline
                rows={4}
                subtitle="Mô tả sơ lược giai đoạn"
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
              Tổng quan giai đoạn số {formData?.stageNo ?? "x"}
            </Typography>
            {/* <Typography variant="h5" sx={{ my: "auto" }}>
              {formData?.isWarrantyStage ? "(Giai đoạn bảo hành)" : null}
            </Typography> */}
            <Typography
              variant="h5"
              sx={{ my: "auto", mt: 1, borderTop: 1, borderColor: "gray" }}
            ></Typography>

            <Grid container sx={{ mt: 1, pt: 2 }}>
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Số ngày làm việc ước tính:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="p" sx={{ my: "auto" }}>
                  {formData?.estimateBusinessDay ?? 0} Ngày
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1, pt: 2 }}>
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Số tiền trên hợp đồng:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="p" sx={{ my: "auto" }}>
                  {formData?.totalContractPaid?.toLocaleString("en-US") ?? 0}{" "}
                  VND
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1, pt: 2 }}>
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Số tiền phát sinh:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="p" sx={{ my: "auto" }}>
                  {formData?.totalIncurredPaid?.toLocaleString("en-US") ?? 0}{" "}
                  VND
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1, pt: 2 }}>
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Ngày bắt đầu:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="p" sx={{ my: "auto" }}>
                  {formData?.startedDate
                    ? moment(formData?.startedDate).format("L")
                    : "Chưa xác định"}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1, pt: 2 }}>
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Ngày kết thúc:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="p" sx={{ my: "auto" }}>
                  {formData?.endDate
                    ? moment(formData?.endDate).format("L")
                    : "Chưa xác định"}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1, pt: 2 }}>
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Hạn chót thanh toán:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="p" sx={{ my: "auto" }}>
                  {formData?.endTimePayment
                    ? moment(formData?.endTimePayment).format("L")
                    : "Chưa xác định"}
                </Typography>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 1, pt: 2 }}>
              <Grid item xs={6} lg={5}>
                <Typography variant="h6" sx={{ my: "auto" }}>
                  Khoảng phạt thanh toán trễ:
                </Typography>
              </Grid>
              <Grid item xs={6} lg={7} sx={{ textAlign: "right" }}>
                <Typography variant="p" sx={{ my: "auto" }}>
                  {formData?.penaltyFee?.toLocaleString("en-US") ?? 0} VND
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
