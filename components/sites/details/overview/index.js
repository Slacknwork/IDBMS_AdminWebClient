"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";

import SaveSiteModal from "./modal";

export default function Sites() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // FIELDS
  const [name, setName] = useState("");
  const onNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
      <Grid container columnSpacing={4} rowSpacing={4} sx={{ mt: 1 }}>
        <Grid
          item
          xs={12}
          lg={12}
          sx={{ borderBottom: 1, borderColor: "grey.500", py: 3 }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            spacing={2}
          >
            <Typography variant="h2" sx={{ my: "auto" }}>
              Tên
            </Typography>
            <SaveSiteModal>Lưu</SaveSiteModal>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Grid container columnSpacing={2} rowSpacing={4}>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Tên</Typography>
                  <Typography variant="p">cái cc gì đó ở dưới đây</Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      value={name}
                      onChange={onNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={4} lg={4}>
                  <Typography variant="h5">Tên</Typography>
                  <Typography variant="p">
                    thêm cái cc gì đó ở dưới đây
                  </Typography>
                </Grid>
                <Grid item xs={8} lg={8}>
                  <FormControl fullWidth>
                    <TextField
                      variant="outlined"
                      value={name}
                      onChange={onNameChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ my: "auto" }}>
              Project Owner
            </Typography>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
              <Typography variant="p" sx={{ my: "auto", mx: 2 }}>
                Anthony N
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
