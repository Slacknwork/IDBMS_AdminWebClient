"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import NumberForm from "/components/shared/Forms/Number";
import NumberSimpleForm from "/components/shared/Forms/NumberSimple";
import FileForm from "/components/shared/Forms/File";
import DateForm from "/components/shared/Forms/Date";
import CheckForm from "/components/shared/Forms/Checkbox";
import checkValidField from "/components/validations/field"
import checkValidUrl from "/components/validations/url"

import {
  getWarrantyClaimById,
  updateWarrantyClaim,
  deleteWarrantyClaimById,
} from "/services/warrantyClaimServices";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function WarrantyClaimDetails() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    nameError: { hasError: false, label: "" },
    reason: "",
    reasonError: { hasError: false, label: "" },
    solution: "",
    solutionError: { hasError: false, label: "" },
    note: "",
    noteError: { hasError: false, label: "" },
    totalPaid: 0,
    totalPaidError: { hasError: false, label: "" },
    isCompanyCover: false,
    isCompanyCoverError: { hasError: false, label: "" },
    endDate: null,
    endDateError: { hasError: false, label: "" },
    confirmationDocument: null,
    confirmationDocumentError: { hasError: false, label: "" },
    projectId: params.id,
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
      case "totalPaid":
      case "isCompanyCover":
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
      case "confirmationDocument":
        const validFile = checkValidUrl(value);
        if (validFile.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validFile.label,
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
      case "reason":
      case "solution":
      case "note":  
      case "endDate":
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

  const handleFileInputChange = (file) => {
    handleInputChange("confirmationDocument", file);
  };
  // INIT CONST
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    const fetchWarrantyClaim = async () => {
      try {
        const response = await getWarrantyClaimById(params.warrantyId);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Bảo hiểm' từ hệ thống");
      }
    };
    await Promise.all([fetchWarrantyClaim()]);
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

  // HANDLE BUTTON CLICK
  const handleSave = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);

    try {
      const response = await updateWarrantyClaim(
        params.warrantyId,
        transformedValue
      );
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const handleDelete = async () => {
    try {
      const response = await deleteWarrantyClaimById(
        params.warrantyId,
        params.id
      );
      console.log(response);
      toast.success("Xóa thành công!");
      router.push(`/projects/${params.id}/warranty-claims`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const transformData = (obj) => {
    const result = { ...obj };
    for (const key in result) {
      if (result[key] === null) {
        result[key] = "";
      }
    }

    return result;
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: checked,
    }));
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

    handleSave();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <PageContainer title={formData?.name} description="Chi tiết Bảo hiểm">
      <DetailsPage
        title="Thông tin Bảo hiểm"
        saveMessage="Lưu thông tin Bảo hiểm?"
        onSave={handleSubmit}
        deleteMessage={"Xóa Bảo hiểm này?"}
        deleteLabel={"Xóa"}
        hasDelete
        onDelete={handleDelete}
      >
        <Grid item xs={12} lg={12}>
          <Grid container columnSpacing={8} rowSpacing={3}>
            {/* NAME */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Tên"
                required
                subtitle="Nhập tên cho phiếu Bảo hiểm"
                value={formData.name}
                error={formData.nameError.hasError}
                errorLabel={formData.nameError.label}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Grid>

            {/* REASON */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Lý do"
                subtitle="Nhập lý do / nguyên nhân"
                value={formData.reason}
                error={formData.reasonError.hasError}
                errorLabel={formData.reasonError.label}
                onChange={(e) => handleInputChange("reason", e.target.value)}
              />
            </Grid>

            {/* SOLUTION */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Giải pháp"
                subtitle="Nhập giải pháp giải quyết"
                value={formData.solution}
                error={formData.solutionError.hasError}
                errorLabel={formData.solutionError.label}
                onChange={(e) => handleInputChange("solution", e.target.value)}
              />
            </Grid>

            {/* NOTE */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Ghi chú"
                subtitle="Nhập ghi chú thêm (nếu có)"
                value={formData.note}
                error={formData.noteError.hasError}
                errorLabel={formData.noteError.label}
                onChange={(e) => handleInputChange("note", e.target.value)}
              />
            </Grid>

            {/* TOTAL PAID */}
            <Grid item xs={12} lg={6}>
              <TextForm
                title="Tổng số tiền"
                required
                subtitle="Nhập tổng số tiền để Bảo hiểm"
                value={formData.totalPaid}
                error={formData.totalPaidError.hasError}
                errorLabel={formData.totalPaidError.label}
                onChange={(e) => handleInputChange("totalPaid", e.target.value)}
              />
            </Grid>

            {/* IS COMPANY COVER */}
            <Grid item xs={12} lg={6}>
              <CheckForm
                title="Bảo Hiểm bởi Công Ty"
                required
                checked={formData.isCompanyCover}
                onChange={(e) =>
                  handleCheckboxChange("isCompanyCover", e.target.checked)
                }
              />
            </Grid>

            {/* END DATE */}
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

            {/* CONFIRMATION DOCUMENT */}
            <Grid item xs={12} lg={12}>
              <FileForm
                fullWidth
                title="Tài Liệu Xác Nhận"
                subtitle="Chọn tệp"
                titleSpan={3}
                fieldSpan={9}
                value={formData.confirmationDocument}
                error={formData.confirmationDocumentError.hasError}
                errorLabel={formData.confirmationDocumentError.label}
                onChange={(file) =>
                  handleFileInputChange("confirmationDocument", file)
                }
                hasFile
                fileType={
                  formData.confirmationDocument == null ??
                  "/images/results/has-file.png"
                }
              ></FileForm>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          {/* Additional details can be added here */}
        </Grid>
      </DetailsPage>
    </PageContainer>
  );
}
