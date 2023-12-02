"use client";

import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import participationRoleOptions from "/constants/enums/participationRole";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  overflowY: "auto",
  boxShadow: 24,
};

const userOptions = [
  { id: "1", name: "User 1", email: "user1@mail.com", phone: "01234567890" },
  { id: "2", name: "user 2", email: "user2@mail.com", phone: "01234567890" },
];

export default function DocumentModal({ children }) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    user: [],
    userError: { hasError: false, label: "" },
    role: -1,
    roleError: { hasError: false, label: "" },
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
      [`${field}Error`]: { hasError: false, label: "" }, // Reset error on change
    }));
  };

  return (
    <Box>
      <Button variant="contained" disableElevation onClick={handleOpen}>
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} component="div">
          <Box
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 2,
              mx: 3,
              height: "5rem",
              position: "sticky",
              top: 0,
              backgroundColor: "white",
              borderBottom: 1,
              zIndex: 1,
            }}
          >
            <Typography variant="h4" id="child-modal-title" sx={{ py: 2 }}>
              Thêm thành viên
            </Typography>
            <IconButton
              aria-label="close"
              sx={{
                my: "auto",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid
            sx={{ px: 3, my: 1, maxHeight: "30rem", overflowY: "auto" }}
            component={"div"}
            container
            spacing={3}
          >
            {/* USER */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Người dùng</Typography>
                  <Typography variant="p">Chọn người dùng</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      multiple
                      options={userOptions} // Assuming you have an array of user options
                      getOptionLabel={(option) => option.name} // Replace with the actual property for user name
                      value={formData.user}
                      onChange={(event, newValue) =>
                        handleInputChange("user", newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          error={formData.userError?.hasError}
                          helperText={formData.userError?.label}
                        />
                      )}
                    />
                    {/* Add error handling for user selection if needed */}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* ROLE */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Vai trò</Typography>
                  <Typography variant="p">Chọn vai trò</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <Select
                      variant="outlined"
                      value={formData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      error={formData.roleError?.hasError}
                    >
                      <MenuItem disabled value="">
                        Chọn vai trò
                      </MenuItem>
                      {participationRoleOptions.map((role, index) => (
                        <MenuItem key={role} value={index}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      <Typography variant="subtitle2" color="error">
                        {formData.roleError?.label}
                      </Typography>
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* SUBMIT */}
            <Grid item xs={12} lg={12}>
              <Box
                sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}
                spacing={2}
              >
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleClose}
                >
                  Tạo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
