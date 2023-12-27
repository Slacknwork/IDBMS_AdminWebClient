"use client";

import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import languageOptions from "/constants/enums/language";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";
import DetailsPage from "/components/shared/DetailsPage";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import SelectForm from "/components/shared/Forms/Select";
import {
  getUserById,
  updateUser,
  updateUserStatus,
} from "../../../../api/userServices";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ItemDetails() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    jobPosition: "",
    companyName: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: null,
    language: -1,
    nameError: { hasError: false, label: "" },
    bioError: { hasError: false, label: "" },
    jobPositionError: { hasError: false, label: "" },
    companyNameError: { hasError: false, label: "" },
    addressError: { hasError: false, label: "" },
    emailError: { hasError: false, label: "" },
    passwordError: { hasError: false, label: "" },
    phoneError: { hasError: false, label: "" },
    dateOfBirthError: { hasError: false, label: "" },
    languageError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" },
    }));
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const params = useParams();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  // INIT CONST
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchDataFromApi = async () => {
    setLoading(true)
    const fetchUser = async () => {
      try {
        const response = await getUserById(params.id);
        console.log(response);
        setFormData((prevData) => ({ ...prevData, ...response }));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'người dùng' từ hệ thống");
      }
    };
    await Promise.all([
      fetchUser(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);


  const onSaveUser = async () => {
    const transformedValue = transformData(formData);
    console.log(transformedValue);
    try {
      const response = await updateUser(params.id, transformedValue);
      console.log(response);
      toast.success("Cập nhật thành công!");
      await fetchDataFromApi()
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };
  const onSuspendUser = async () => {
    try {
      if (formData?.status === 2) {
        const response = await updateUserStatus(
          params.id,
          0,
        );
        toast.success("Phục hồi thành công!");
      } else if (formData?.status === 0) {
        const response = await updateUserStatus(
          params.id,
          2,
        );
        toast.success("Đình chỉ thành công!");
      }
      await fetchDataFromApi();
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
  return (
    <PageContainer title={formData.name} description="Chi tiết người dùng">
      <DashboardCard>
        <DetailsPage
          title="Thông tin người dùng"
          saveMessage="Lưu thông tin người dùng?"
          deleteMessage={
            (formData?.status === 2)
              ? "Phục hồi người dùng này?"
              : "Đình chỉ người dùng này?"
          }
          onSave={onSaveUser}
          deleteLabel={(formData?.status === 2) ? "Phục hồi" : "Đình chỉ"}
          hasDelete
          onDelete={onSuspendUser}
          loading={loading}
        >
          <Grid item xs={12} lg={12}>
            <Grid container columnSpacing={8} rowSpacing={3}>
              {/* NAME */}
              <Grid item xs={12} lg={6}>
                <TextForm
                  title="Tên"
                  required
                  subtitle="Nhập tên người dùng"
                  value={formData.name}
                  error={formData.nameError.hasError}
                  errorLabel={formData.nameError.label}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                ></TextForm>
              </Grid>

              {/* BIO */}
              <Grid item xs={12} lg={6}>
                <TextForm
                  title="Tiểu sử"
                  subtitle="Nhập tiểu sử người dùng"
                  value={formData.bio}
                  error={formData.bioError.hasError}
                  errorLabel={formData.bioError.label}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                ></TextForm>
              </Grid>

              {/* JOB POSITION */}
              <Grid item xs={12} lg={6}>
                <TextForm
                  title="Vị trí công việc"
                  subtitle="Nhập vị trí công việc"
                  value={formData.jobPosition}
                  error={formData.jobPositionError.hasError}
                  errorLabel={formData.jobPositionError.label}
                  onChange={(e) =>
                    handleInputChange("jobPosition", e.target.value)
                  }
                ></TextForm>
              </Grid>

              {/* COMPANY NAME */}
              <Grid item xs={12} lg={6}>
                <TextForm
                  title="Tên công ty"
                  subtitle="Nhập tên công ty"
                  value={formData.companyName}
                  error={formData.companyNameError.hasError}
                  errorLabel={formData.companyNameError.label}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                ></TextForm>
              </Grid>

              {/* ADDRESS */}
              <Grid item xs={12} lg={6}>
                <TextForm
                  title="Địa chỉ"
                  required
                  subtitle="Nhập địa chỉ người dùng"
                  value={formData.address}
                  error={formData.addressError.hasError}
                  errorLabel={formData.addressError.label}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                ></TextForm>
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
                ></TextForm>
              </Grid>

              {/* PASSWORD */}
              <Grid item xs={12} lg={6}>
                <TextForm
                  title="Mật khẩu"
                  required
                  subtitle="Nhập mật khẩu"
                  value={formData.password}
                  error={formData.passwordError.hasError}
                  errorLabel={formData.passwordError.label}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                ></TextForm>
              </Grid>

              {/* PHONE */}
              <Grid item xs={12} lg={6}>
                <TextForm
                  title="Số điện thoại"
                  required
                  subtitle="Nhập số điện thoại"
                  value={formData.phone}
                  error={formData.phoneError.hasError}
                  errorLabel={formData.phoneError.label}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                ></TextForm>
              </Grid>

              {/* DATE OF BIRTH */}
              <Grid item xs={12} lg={6}>
                <DateForm
                  title="Ngày sinh"
                  required
                  subtitle="Nhập ngày sinh"
                  value={formData.dateOfBirth}
                  error={formData.dateOfBirthError.hasError}
                  errorLabel={formData.dateOfBirthError.label}
                  onChange={(value) => handleInputChange("dateOfBirth", value)}
                ></DateForm>
              </Grid>

              {/* LANGUAGE */}
              <Grid item xs={12} lg={6}>
                <SelectForm
                  title="Ngôn ngữ"
                  required
                  subtitle="Chọn ngôn ngữ"
                  value={formData.language}
                  options={languageOptions}
                  defaultValue={-1}
                  defaultLabel="Chọn một..."
                  error={formData.languageError.hasError}
                  errorLabel={formData.languageError.label}
                  onChange={(value) => handleInputChange("language", value)}
                ></SelectForm>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            {/* Additional details can be added here */}
          </Grid>
        </DetailsPage>
      </DashboardCard>
    </PageContainer>
  );
}
