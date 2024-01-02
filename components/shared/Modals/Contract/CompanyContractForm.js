"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";
import moment from "moment-timezone";
import { toast } from "react-toastify";

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import { getCompanyContractInfoById } from "/services/contractServices";

import TextForm from "../../Forms/Text";
import NumberForm from "../../Forms/Number";

export default function CompanyContractForm({ formData, setFormData }) {
  const params = useParams();

  const validateInput = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Không thể để trống" : "";
      // Add validation for other fields as needed
      default:
        return "";
    }
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "projectCategory":
      case "basedOnDecorProject":
        setFormData((prevData) => ({ ...prevData, [`${field}Id`]: value }));
        console.log(value);
        break;
      default:
        break;
    }
    const errorLabel = validateInput(field, value);
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: !!errorLabel, label: errorLabel },
    }));
  };

  const [loading, setLoading] = useState(true);

  const fetchContractData = async () => {
    setLoading(true);
    try {
      const data = await getCompanyContractInfoById({
        projectId: params.id,
      });
      setFormData((prevData) => ({ ...prevData, ...data }));
    } catch (error) {
      toast.error("Lỗi dữ liệu: Hợp đồng!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, []);

  return (
    <Grid container rowSpacing={2} columnSpacing={4}>
      {/* A COMPANY NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên công ty A"
          required
          subtitle="Nhập tên công ty A"
          value={formData.aCompanyName}
          error={formData.aCompanyNameError.hasError}
          errorLabel={formData.aCompanyNameError.label}
          onChange={(e) => handleInputChange("aCompanyName", e.target.value)}
        />
      </Grid>

      {/* A COMPANY ADDRESS */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Địa chỉ công ty A"
          required
          subtitle="Nhập địa chỉ công ty A"
          value={formData.aCompanyAddress}
          error={formData.aCompanyAddressError.hasError}
          errorLabel={formData.aCompanyAddressError.label}
          onChange={(e) => handleInputChange("aCompanyAddress", e.target.value)}
        />
      </Grid>

      {/* A OWNER NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Chủ sở hữu công ty A"
          required
          subtitle="Nhập tên chủ sở hữu công ty A"
          value={formData.aOwnerName}
          error={formData.aOwnerNameError.hasError}
          errorLabel={formData.aOwnerNameError.label}
          onChange={(e) => handleInputChange("aOwnerName", e.target.value)}
        />
      </Grid>

      {/* A PHONE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Điện thoại công ty A"
          required
          subtitle="Nhập số điện thoại công ty A"
          value={formData.aPhone}
          error={formData.aPhoneError.hasError}
          errorLabel={formData.aPhoneError.label}
          onChange={(e) => handleInputChange("aPhone", e.target.value)}
        />
      </Grid>

      {/* A COMPANY CODE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mã công ty A"
          required
          subtitle="Nhập mã công ty A"
          value={formData.aCompanyCode}
          error={formData.aCompanyCodeError.hasError}
          errorLabel={formData.aCompanyCodeError.label}
          onChange={(e) => handleInputChange("aCompanyCode", e.target.value)}
        />
      </Grid>

      {/* A POSITION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Chức vụ công ty A"
          required
          subtitle="Nhập chức vụ trong công ty A"
          value={formData.aPosition}
          error={formData.aPositionError.hasError}
          errorLabel={formData.aPositionError.label}
          onChange={(e) => handleInputChange("aPosition", e.target.value)}
        />
      </Grid>

      {/* A EMAIL */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Email công ty A"
          required
          subtitle="Nhập địa chỉ email công ty A"
          value={formData.aEmail}
          error={formData.aEmailError.hasError}
          errorLabel={formData.aEmailError.label}
          onChange={(e) => handleInputChange("aEmail", e.target.value)}
        />
      </Grid>

      {/* B COMPANY NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên công ty B"
          required
          subtitle="Nhập tên công ty B"
          value={formData.bCompanyName}
          error={formData.bCompanyNameError.hasError}
          errorLabel={formData.bCompanyNameError.label}
          onChange={(e) => handleInputChange("bCompanyName", e.target.value)}
        />
      </Grid>

      {/* B COMPANY ADDRESS */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Địa chỉ công ty B"
          required
          subtitle="Nhập địa chỉ công ty B"
          value={formData.bCompanyAddress}
          error={formData.bCompanyAddressError.hasError}
          errorLabel={formData.bCompanyAddressError.label}
          onChange={(e) => handleInputChange("bCompanyAddress", e.target.value)}
        />
      </Grid>

      {/* B SWIFT CODE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mã SWIFT công ty B"
          required
          subtitle="Nhập mã SWIFT công ty B"
          value={formData.bSwiftCode}
          error={formData.bSwiftCodeError.hasError}
          errorLabel={formData.bSwiftCodeError.label}
          onChange={(e) => handleInputChange("bSwiftCode", e.target.value)}
        />
      </Grid>

      {/* B REPRESENTED BY */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Đại diện công ty B"
          required
          subtitle="Nhập tên đại diện công ty B"
          value={formData.bRepresentedBy}
          error={formData.bRepresentedByError.hasError}
          errorLabel={formData.bRepresentedByError.label}
          onChange={(e) => handleInputChange("bRepresentedBy", e.target.value)}
        />
      </Grid>

      {/* B COMPANY PHONE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Số điện thoại công ty B"
          required
          subtitle="Nhập số điện thoại công ty B"
          value={formData.bCompanyPhone}
          error={formData.bCompanyPhoneError.hasError}
          errorLabel={formData.bCompanyPhoneError.label}
          onChange={(e) => handleInputChange("bCompanyPhone", e.target.value)}
        />
      </Grid>

      {/* B POSITION */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Chức vụ công ty B"
          required
          subtitle="Nhập chức vụ trong công ty B"
          value={formData.bPosition}
          error={formData.bPositionError.hasError}
          errorLabel={formData.bPositionError.label}
          onChange={(e) => handleInputChange("bPosition", e.target.value)}
        />
      </Grid>

      {/* B EMAIL */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Email công ty B"
          required
          subtitle="Nhập địa chỉ email công ty B"
          value={formData.bEmail}
          error={formData.bEmailError.hasError}
          errorLabel={formData.bEmailError.label}
          onChange={(e) => handleInputChange("bEmail", e.target.value)}
        />
      </Grid>

      {/* NUM OF COPIE */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số bản sao"
          required
          titleSpan={6}
          fieldSpan={6}
          subtitle="Số lượng bản sao"
          value={formData.numOfCopie}
          error={formData.numOfCopieError.hasError}
          errorLabel={formData.numOfCopieError.label}
          onChange={(value) => handleInputChange("numOfCopie", value)}
        />
      </Grid>

      {/* NUM OF A */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số lượng A"
          required
          titleSpan={6}
          fieldSpan={6}
          subtitle="Số lượng A"
          value={formData.numOfA}
          error={formData.numOfAError.hasError}
          errorLabel={formData.numOfAError.label}
          onChange={(value) => handleInputChange("numOfA", value)}
        />
      </Grid>

      {/* NUM OF B */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Số lượng B"
          required
          titleSpan={6}
          fieldSpan={6}
          subtitle="Số lượng B"
          value={formData.numOfB}
          error={formData.numOfBError.hasError}
          errorLabel={formData.numOfBError.label}
          onChange={(value) => handleInputChange("numOfB", value)}
        />
      </Grid>

      {/* ESTIMATE DAYS */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Ngày ước tính"
          required
          titleSpan={6}
          fieldSpan={6}
          subtitle="Số ngày ước tính hoàn thành"
          value={formData.estimateDays}
          error={formData.estimateDaysError.hasError}
          errorLabel={formData.estimateDaysError.label}
          onChange={(value) => handleInputChange("estimateDays", value)}
        />
      </Grid>

      {/* PROJECT NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên Dự Án"
          required
          subtitle="Nhập tên dự án"
          value={formData.projectName}
          error={formData.projectNameError.hasError}
          errorLabel={formData.projectNameError.label}
          onChange={(e) => handleInputChange("projectName", e.target.value)}
        />
      </Grid>

      {/* PAYMENT METHOD */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Phương thức thanh toán"
          required
          subtitle="Nhập phương thức thanh toán"
          value={formData.paymentMethod}
          error={formData.paymentMethodError.hasError}
          errorLabel={formData.paymentMethodError.label}
          onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
        />
      </Grid>

      {/* VALUE */}
      <Grid item xs={12} lg={6}>
        <NumberForm
          title="Giá trị"
          required
          titleSpan={6}
          fieldSpan={6}
          subtitle="Giá trị dự án"
          value={formData.value}
          error={formData.valueError.hasError}
          errorLabel={formData.valueError.label}
          onChange={(value) => handleInputChange("value", value)}
          endAdornment={<span>VND</span>}
        />
      </Grid>
    </Grid>
  );
}
