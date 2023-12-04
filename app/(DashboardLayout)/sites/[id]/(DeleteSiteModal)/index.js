"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import { deleteSiteById } from "../../../../../api/siteServices";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const modalTitle = "Xóa";
const modalMessage = "Xóa thông tin công trình?";

export default function SiteModal({ children, siteId }) {
  const router = useRouter();
  // MODAL TOGGLE
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteSite = async () => {
    console.log(siteId);
    try {
      const response = await deleteSiteById(siteId);
      console.log(response);
      toast.success("Xóa thành công!");
      router.push(`/sites`);
      // handleClose();
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <Box>
      <Button
        color="error"
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
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">{modalTitle}</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <p>{modalMessage}</p>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box
                sx={{ display: "flex", justifyContent: "flex-end" }}
                spacing={2}
              >
                <Button
                  sx={{ mr: 2 }}
                  color="error"
                  variant="outlined"
                  disableElevation
                  onClick={handleClose}
                >
                  Hủy
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  disableElevation
                  onClick={handleDeleteSite}
                >
                  Xóa
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
