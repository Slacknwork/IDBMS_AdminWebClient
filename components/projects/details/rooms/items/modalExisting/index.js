"use client";

import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

export default function ItemModal({ children }) {
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const interiorItems = [
    {
      id: 1,
      code: "ITEM001",
      name: "Sofa",
      imageUrl:
        "https://i.pinimg.com/originals/be/d8/c2/bed8c28f7c314f30b6657297911cfc15.jpg",
      interiorItemCategory: { id: 1, name: "Furniture" },
      interiorItemStatus: 0,
    },
    {
      id: 2,
      code: "ITEM002",
      name: "Table",
      imageUrl:
        "https://zago-store.vn/wp-content/uploads/2021/03/loft-coffee-square-table-90x90x45h-cm_1-750x750.jpg",
      interiorItemCategory: { id: 2, name: "Decor" },
      interiorItemStatus: 1,
    },
  ];

  const handleInputChange = (value) => {
    setSelectedItem(value);
  };

  return (
    <Box>
      <Button
        sx={{ mr: 2 }}
        variant="contained"
        disableElevation
        onClick={handleOpen}
      >
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
              Thêm đồ nội thất
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
            {/* SELECTED ITEM ID */}
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Chọn một đồ dùng</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <Autocomplete
                    options={interiorItems}
                    getOptionLabel={(option) => option.name}
                    value={selectedItem}
                    onChange={(_, newValue) => handleInputChange(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
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
