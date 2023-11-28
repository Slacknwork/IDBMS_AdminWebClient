"use client";

import {
  Autocomplete,
  Modal,
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import participationRole from "../../../../constants/enums/participationRole";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../../../../api/userServices";
import { createParticipation } from "../../../../api/projectParticipationServices";
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  p: 4,
};

export default function ProjectDocumentModal({ open, onClose, projectId }) {
  console.log(projectId)
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getUser();
          console.log(data);
          setUsers(data);
          setFilteredUsers(data)
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }

  }, []);

  const handleAddParticipation = async () => {
    const newParticipation = {
      userId: selectedUser.id,
      projectId: projectId,
      role: parseInt(selectedRole, 10),
    };
    console.log(newParticipation)
    try {
      const response = await createParticipation(newParticipation);
      console.log(response);
      if (response.data != null) {
        toast.success("Thêm thành công!");
      } else {
        throw new Error("Create failed!");
      }
    } catch (error) {
      console.error("Error login :", error);
      toast.error("Lỗi!");
    }
  };

  const [selectedRole, setSelectedRole] = useState(1);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value)
    console.log(event.target.value)
    const filterRole = event.target.value;

    const allowedAllRoles = ["Chủ dự án", "Người xem"];
    const allowedDecorRoles = ["Kĩ sư thiết kế trưởng", "Kĩ sư thiết kế"];
    const allowedConstructionRoles = ["Quản lý công trình"];

    if (!allowedAllRoles.includes(participationRole[filterRole])) {

      if (allowedDecorRoles.includes(participationRole[filterRole])) {
        setFilteredUsers(users.filter((user) => user.userRoles.some(companyRole => companyRole.role === 1)));
      }

      if (allowedConstructionRoles.includes(participationRole[filterRole])) {
        setFilteredUsers(users.filter((user) => user.userRoles.some(companyRole => companyRole.role === 2)));
      }

    } else {
      setFilteredUsers(users)
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserChange = (event, newValue) => {
    console.log(newValue)
    setSelectedUser(newValue);

  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Thêm thành viên
        </Typography>
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={filteredUsers}
              getOptionLabel={(option) => option.name}
              sx={{ mt: 2, width: 1 }}
              noOptionsText="Không tìm thấy"
              value={selectedUser}
              onChange={handleUserChange}
              renderInput={(params) => (
                <TextField {...params} label="Người dùng" />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl sx={{ mt: 2, width: 1 }}>
              <InputLabel>Vai trò</InputLabel>
              <Select labelId="demo-simple-select-label" label="Age"
                value={selectedRole} onChange={handleRoleChange}
              >
                {Object.entries(participationRole).map(([label, value]) => (
                  <MenuItem key={label} value={label}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={9}></Grid>
          <Grid item xs={12} lg={3}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              fullWidth
              onClick={handleAddParticipation}
            >
              Thêm
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
