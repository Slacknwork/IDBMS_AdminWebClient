"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";
import moment from "moment-timezone";
import { toast } from "react-toastify";
import checkValidField from "/components/validations/field"
import checkValidEmail from "/components/validations/email"
import checkValidPhone from "/components/validations/phone"

moment.tz.setDefault("Asia/Ho_Chi_Minh");

import { getIndividualContractInfoById } from "/services/contractServices";

import TextForm from "../../Forms/Text";
import DateForm from "../../Forms/Date";
import NumberForm from "../../Forms/Number";

export default function CreateProjectModal({ formData, setFormData }) {
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
    let result = { isValid: true, label: "" }

    switch (field) {
      case "customerName":
      case "projectName":
      case "identityCode":
      case "issuedBy":
      case "bCompanyName":
      case "bRepresentedBy":
      case "bSwiftCode":
      case "bPosition":
        result = checkValidField({
          value: value,
          maxLength: 50,
          required: true
        });

        break;
      case "dateOfBirth":
      case "codeCreatedDate":
        result = checkValidField({
          value: value,
          required: true
        });

        break;
      case "address":
      case "bCompanyAddress":
      case "registeredPlaceOfPermanentResidence":
      case "paymentMethod":
        result = checkValidField({
          value: value,
          maxLength: 750,
          required: true
        });

        break;
      case "phone":
      case "bCompanyPhone":
        const validPhone = checkValidPhone(value);

        if (validPhone.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validPhone.label,
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
      case "email":
      case "bEmail":
        const validEmail = checkValidEmail(value);

        if (validEmail.isValid == false) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: value,
            [`${field}Error`]: {
              hasError: true,
              label: validEmail.label,
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
      case "numOfCopie":
      case "numOfA":
      case "numOfB":
      case "estimateDays":
        result = checkValidField({
          value: value,
          minValue: 0,
          checkZeroValue: true,
          required: true
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

  const [loading, setLoading] = useState(true);

  const fetchContractData = async () => {
    setLoading(true);
    try {
      const data = await getIndividualContractInfoById({
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
      {/* CUSTOMER NAME */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Tên Khách hàng"
          required
          subtitle="Nhập tên khách hàng"
          value={formData.customerName}
          error={formData.customerNameError.hasError}
          errorLabel={formData.customerNameError.label}
          onChange={(e) => handleInputChange("customerName", e.target.value)}
        />
      </Grid>

      {/* DATE OF BIRTH */}
      <Grid item xs={12} lg={6}>
        <DateForm
          datetime
          title="Ngày Sinh"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Ngày sinh của khách hàng"
          value={formData.dateOfBirth}
          error={formData.dateOfBirthError.hasError}
          errorLabel={formData.dateOfBirthError.label}
          onChange={(value) => handleInputChange("dateOfBirth", value)}
        />
      </Grid>

      {/* ADDRESS */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Địa chỉ"
          required
          subtitle="Nhập địa chỉ"
          value={formData.address}
          error={formData.addressError.hasError}
          errorLabel={formData.addressError.label}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
      </Grid>

      {/* PHONE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Điện thoại"
          required
          subtitle="Nhập số điện thoại"
          value={formData.phone}
          error={formData.phoneError.hasError}
          errorLabel={formData.phoneError.label}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </Grid>

      {/* EMAIL */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Email"
          required
          subtitle="Nhập địa chỉ email"
          value={formData.email}
          error={formData.emailError.hasError}
          errorLabel={formData.emailError.label}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </Grid>

      {/* IDENTITY CODE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Mã số cá nhân"
          required
          subtitle="Nhập mã số cá nhân"
          value={formData.identityCode}
          error={formData.identityCodeError.hasError}
          errorLabel={formData.identityCodeError.label}
          onChange={(e) => handleInputChange("identityCode", e.target.value)}
        />
      </Grid>

      {/* CODE CREATED DATE */}
      <Grid item xs={12} lg={6}>
        <DateForm
          datetime
          title="Ngày cấp"
          required
          titleSpan={6}
          fieldSpan={6}
          spacing={5}
          subtitle="Ngày cấp mã số cá nhân"
          value={formData.codeCreatedDate}
          error={formData.codeCreatedDateError.hasError}
          errorLabel={formData.codeCreatedDateError.label}
          onChange={(value) => handleInputChange("codeCreatedDate", value)}
        />
      </Grid>

      {/* ISSUED BY */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Cơ quan cấp"
          required
          subtitle="Nhập cơ quan cấp mã số cá nhân"
          value={formData.issuedBy}
          error={formData.issuedByError.hasError}
          errorLabel={formData.issuedByError.label}
          onChange={(e) => handleInputChange("issuedBy", e.target.value)}
        />
      </Grid>

      {/* REGISTERED PLACE OF PERMANENT RESIDENCE */}
      <Grid item xs={12} lg={6}>
        <TextForm
          title="Nơi đăng ký thường trú"
          required
          subtitle="Nhập nơi đăng ký thường trú"
          value={formData.registeredPlaceOfPermanentResidence}
          error={formData.registeredPlaceOfPermanentResidenceError.hasError}
          errorLabel={formData.registeredPlaceOfPermanentResidenceError.label}
          onChange={(e) =>
            handleInputChange(
              "registeredPlaceOfPermanentResidence",
              e.target.value
            )
          }
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
