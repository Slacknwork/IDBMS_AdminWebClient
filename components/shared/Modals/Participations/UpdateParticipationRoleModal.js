"use client";

import { useEffect, useState } from "react";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
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
  createEmployees,
  updateProjectParticipation,
} from "../../../../services/projectParticipationServices";

import participationRoleOptions from "../../../../constants/enums/participationRole";

export default function UpdateParticipationRoleModal({ participant }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    role: participant.role,
    roleError: { hasError: false, label: "" },
    projectId: params.id,
    userId: [],
    userIdError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "userId":
        handleUserChange(value);
        console.log(value);
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
      const response = await updateProjectParticipation(
        participant.id,
        formData
      );
      toast.success("Cập nhật thành công!");
      console.log(response);
      // router.push(`/roomTypes/${response?.id}`);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const isOptionDisabled = (index) => {
    // cannot update to pj owner / manager
    if (index === 0 || index === 1) return true;

    // all role can be Viewer
    if (index === 4) return false;

    switch (participant?.user?.role) {
      case 1: // architect
        return index !== 2; // Allow participation role 2 - Architect
      case 2: // construction
        return index !== 3; // Allow participation role 4 - Construction Manager
      default:
        return true;
    }
  };

  return (
    <FormModal
      buttonLabel="Cập nhật vai trò"
      title="Cập nhật vai trò trong dự án"
      submitLabel="Cập nhật"
      onSubmit={handleUpdate}
    >
      {/* PARTICIPATION ROLE */}
      <Grid item xs={12} lg={12}>
        <Grid container>
          <Grid item xs={4} lg={4}>
            <Typography variant="h5">
              Vai trò
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Typography variant="p">Chọn vai trò</Typography>
          </Grid>
          <Grid item xs={8} lg={8}>
            <FormControl fullWidth>
              <Select
                variant="outlined"
                value={formData.role}
                onChange={(e) =>
                  handleInputChange("role", parseInt(e.target.value))
                }
                error={formData.roleError.hasError}
              >
                {participationRoleOptions.map((option, index) => (
                  <MenuItem
                    key={index}
                    value={index}
                    disabled={isOptionDisabled(index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {formData.roleError.hasError && (
                <FormHelperText>{formData.roleError.label}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      {/* USER */}
      <Grid item xs={12} lg={12}>
        <TextForm
          title="Tên người dùng trong hệ thống"
          subtitle="Chọn người dùng"
          value={participant?.user?.name}
          disabled
        ></TextForm>
      </Grid>
    </FormModal>
  );
}
