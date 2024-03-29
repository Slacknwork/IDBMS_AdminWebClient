import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TextForm from "../../Forms/Text";
import SelectForm from "../../Forms/Select";
import FormModal from "../Form";
import { createNotificationForAllCustomers } from "/services/notificationServices";
import { toast } from "react-toastify";
import notificationCategoryOptions from "/constants/enums/notificationCategory";
import checkValidField from "/components/validations/field";
import { useSearchParams } from "next/navigation";

export default function CreateNotificationModalForCustomers({ sx, success }) {
  const [formData, setFormData] = useState({
    category: "",
    categoryError: { hasError: false, label: "" },
    content: "",
    contentError: { hasError: false, label: "" },
  });
  const searchParams = useSearchParams();

  const modalOpenQuery = "create";
  const handleInputChange = (field, value) => {
    let result = { isValid: true, label: "" };

    switch (field) {
      case "category":
        result = checkValidField({
          value: value,
          required: true,
        });

        break;
      case "content":
        result = checkValidField({
          value: value,
          maxLength: 750,
          required: true,
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
  const [openModal, setOpenModal] = useState(
    searchParams.get(modalOpenQuery) ?? false
  );
  const [formHasError, setFormHasError] = useState(true);
  const [switchSubmit, setSwitchSubmit] = useState(false);

  const handleSubmit = () => {
    for (const field in formData) {
      !field.endsWith("Error") && handleInputChange(field, formData[field]);
    }
    setSwitchSubmit(true);
  };

  const handleCreate = async () => {
    try {
      if (!switchSubmit) return;
      const response = await createNotificationForAllCustomers(formData);
      toast.success("Gửi thành công!");
      console.log(response);
      handleClose();
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

    setOpenModal(false);
    handleCreate();
    setSwitchSubmit(false);
  }, [switchSubmit]);

  return (
    <FormModal
      sx={sx}
      isOpen={openModal}
      setOpenModal={setOpenModal}
      buttonLabel="Gửi thông báo"
      title="Gửi thông báo cho tất cả khách hàng trong hệ thống"
      submitLabel="Gửi"
      onSubmit={handleSubmit}
      disableCloseOnSubmit
    >
      {/* CATEGORY */}
      <Grid item xs={12} lg={12}>
        <SelectForm
          required
          title="Loại thông báo"
          subtitle="Chọn loại thông báo"
          value={formData.category}
          options={notificationCategoryOptions}
          error={formData.categoryError.hasError}
          errorLabel={formData.categoryError.label}
          onChange={(value) => handleInputChange("category", value)}
        ></SelectForm>
      </Grid>

      {/* CONTENT */}
      <Grid item xs={12} lg={12}>
        <TextForm
          fullWidth
          required
          multiline
          title="Nội dung"
          subtitle="Nhập nội dung thông báo"
          value={formData.content}
          error={formData.content.hasError}
          errorLabel={formData.contentError.label}
          onChange={(e) => handleInputChange("content", e.target.value)}
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
