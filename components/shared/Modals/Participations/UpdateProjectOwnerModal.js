"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import FormModal from "/components/shared/Modals/Form";
import TextForm from "/components/shared/Forms/Text";
import DateForm from "/components/shared/Forms/Date";
import CheckboxForm from "/components/shared/Forms/Checkbox";
import NumberForm from "/components/shared/Forms/Number";
import SelectForm from "/components/shared/Forms/Select";
import AutocompleteForm from "/components/shared/Forms/Autocomplete";
import FileForm from "/components/shared/Forms/File";
import {
  createProjectParticipation,
  updateProjectParticipation,
} from "../../../../services/projectParticipationServices";
import projectTypeOptions from "../../../../constants/enums/projectType";

import { getAllUsers } from "../../../../services/userServices";
import participationRoleOptions from "../../../../constants/enums/participationRole";
import companyRoleOptions from "../../../../constants/enums/companyRole";
import LoopIcon from "@mui/icons-material/Loop";

export default function UpdateProjectOwnerParticipationModal({
  success,
  participationId,
  currentUserId,
}) {
  const params = useParams();

  const [formData, setFormData] = useState({
    role: 0,
    roleError: { hasError: false, label: "" },
    projectId: params.id,
    userId: "",
    userIdError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "userId":
        handleUserChange(value);
        handleInputError(field, false, "");
        break;
      default:
        handleInputError(field, false, "");
    }
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleUserChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      userId: newValue,
    }));
  };

  const handleUpdate = async () => {
    console.log(formData);

    try {
      let response;
      if (participationId) {
        response = await updateProjectParticipation(participationId, formData);
      } else {
        response = await createProjectParticipation(formData);
      }

      toast.success("Cập nhật thành công!");
      console.log(response);
      success(true);
      // router.push(`/roomTypes/${response?.id}`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log(response);

        setUsers((response?.list ?? []).filter((user) => user.role === 0));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Người dùng' từ hệ thống");
      }
    };
    await Promise.all([fetchUsers()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  useEffect(() => {
    handleInputChange("userId", currentUserId);
  }, [currentUserId]);

  return (
    <FormModal
      buttonLabel="Cập nhật"
      title="Cập nhật chủ dự án"
      submitLabel="Cập nhật"
      onSubmit={handleUpdate}
      buttonEndIcon={<LoopIcon />}
    >
      {/* PARTICIPATION ROLE */}
      <Grid item xs={12} lg={12}>
        <SelectForm
          title="Vai trò"
          required
          subtitle="Chọn vai trò"
          value={formData.role}
          defaultValue={0}
          options={participationRoleOptions}
          error={formData.roleError.hasError}
          errorLabel={formData.roleError.label}
          onChange={(value) => handleInputChange("role", value)}
          disabled
        />
      </Grid>

      {/* USER */}
      <Grid item xs={12} lg={12}>
        <AutocompleteForm
          title="Danh sách khách hàng trong hệ thống"
          subtitle="Chọn khách hàng"
          value={formData.userId}
          options={users}
          error={formData.userIdError.hasError}
          errorLabel={formData.userIdError.label}
          onChange={(value) => handleInputChange("userId", value)}
        ></AutocompleteForm>
      </Grid>
    </FormModal>
  );
}
