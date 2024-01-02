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

import {
  createEmployees,
  getUsersByParticipationInProject,
} from "/services/projectParticipationServices";
import { getAllUsers } from "/services/userServices";

import FormModal from "/components/shared/Modals/Form";
import participationRoleOptions from "/constants/enums/participationRole";
import companyRoleOptions from "/constants/enums/companyRole";

export default function CreateParticipationModal({ sx, success }) {
  const params = useParams();

  const [formData, setFormData] = useState({
    role: -1,
    roleError: { hasError: false, label: "" },
    projectId: params.id,
    listUserId: [],
    listUserIdError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    switch (field) {
      case "role":
        handleRoleChange(value);
        console.log(value);
        handleInputError(field, false, "");
        break;
      case "listUserId":
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

  const handleRoleChange = (participationRole) => {
    setFormData((prevData) => ({
      ...prevData,
      role: participationRole,
    }));

    switch (participationRole) {
      case 0: // pj owner
      case 1: // viewer
        setFilteredUsers(users.filter((user) => user.role === 0)); // customer
        break;
      case 2: // lead architect
      case 3: // architect
        setFilteredUsers(users.filter((user) => user.role === 1)); // architect
        break;
      case 4: // construction manager
        setFilteredUsers(users.filter((user) => user.role === 2)); // construction manager
        break;
      case 5: // pj manager
        setFilteredUsers(
          users.filter((user) => user.role === 1 || user.role === 2)
        ); // arc / cons
        break;
      default:
        setFilteredUsers(users);
    }
  };

  const handleUserChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      listUserId: newValue,
    }));
  };

  const handleCreate = async () => {
    console.log(formData);

    const userIds = formData.listUserId.map((user) => user.id);

    try {
      const response = await createEmployees({
        ...formData,
        listUserId: userIds,
      });
      toast.success("Thêm thành công!");
      console.log(response);
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [participationUsers, setParticipationUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // FETCH OPTIONS
  const fetchOptionsFromApi = async () => {
    const fetchParticipationUsers = async () => {
      try {
        const response = await getUsersByParticipationInProject({
          projectId: params.id,
        });
        console.log(response);
        setParticipationUsers(response || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Thành viên dự án' từ hệ thống");
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log(response);
        setUsers((response.list || []).sort((a, b) => a.role - b.role));
        setFilteredUsers((response.list || []).sort((a, b) => a.role - b.role));
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Lỗi nạp dữ liệu 'Người dùng' từ hệ thống");
      }
    };
    await Promise.all([fetchParticipationUsers(), fetchUsers()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOptionsFromApi();
  }, []);

  return (
    <FormModal
      sx={sx}
      buttonLabel="Tạo"
      title="Tạo thành viên tham gia dự án"
      submitLabel="Tạo"
      onSubmit={handleCreate}
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
                    disabled={index === 0 || index === 1}
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
        <Grid container>
          <Grid item xs={4} lg={4}>
            <Typography variant="h5">
              Thành viên
              <span style={{ color: "red" }}>*</span>
            </Typography>
            <Typography variant="p">Chọn người tham gia dự án</Typography>
          </Grid>
          <Grid item xs={8} lg={8}>
            <FormControl fullWidth>
              <Autocomplete
                multiple
                options={filteredUsers} // filterList
                getOptionLabel={(option) =>
                  `${option.name} - ${companyRoleOptions[option.role]}`
                }
                getOptionDisabled={(option) => {
                  // Check if the option's ID is already Participated
                  return participationUsers.some(
                    (selectedUser) => selectedUser?.userId === option?.id
                  );
                }}
                noOptionsText="Không tìm thấy"
                value={formData.listUserId}
                onChange={(event, values) =>
                  handleInputChange("listUserId", values)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Danh sách thành viên trong hệ thống.."
                  />
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </FormModal>
  );
}
