"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { fetchProjectData } from "/store/reducers/data";
import { useSelector, useDispatch } from "react-redux";

import locales from "/constants/locales";

import { mapProjectDesign } from "/services/projectDesignServices";
import { createPaymentStagesByDesign } from "/services/paymentStageServices";
import FormModal from "/components/shared/Modals/Form";

export default function MapProjectDesignModal({ success }) {
  // INIT
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.data);
  const project = data?.project;

  // FETCH DATA
  const [loading, setLoading] = useState(false);
  const [projectDesign, setProjectDesign] = useState({});
  const fetchMapProjectDesign = async () => {
    try {
      const estimatePrice = project?.estimatedPrice;
      const type = project?.type;
      const projectDesign = await mapProjectDesign({ estimatePrice, type });
      setProjectDesign(projectDesign);
    } catch (error) {
      toast.error("Lỗi: Chọn thiết kế dự án!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    dispatch(fetchProjectData(params.id));
    await Promise.all([fetchMapProjectDesign()]);
    setLoading(false);
  };

  const onSubmit = async () => {
    try {
      await createPaymentStagesByDesign(params.id);
      toast.success("Tạo giai đoạn thành công!");
      if (typeof success === "function") {
        success();
      }
    } catch (error) {
      toast.error("Lỗi tạo giai đoạn!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FormModal
      sx={{ mx: 1 }}
      buttonLabel="Tạo theo mẫu"
      title="Tạo giai đoạn theo thiết kế dự án"
      submitLabel="Tạo"
      onSubmit={onSubmit}
      confirmBeforeSubmit
      confirmBeforeSubmitMessage="Xác nhận tạo các giai đoạn đã liệt kê?"
    >
      <Grid item xs={12} lg={12}>
        {loading ? (
          <Stack sx={{ height: "20rem" }}>
            <CircularProgress sx={{ m: "auto" }}></CircularProgress>
          </Stack>
        ) : (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ mb: 1 }} variant="h4">
                {projectDesign?.name}
              </Typography>
              <Typography variant="p" sx={{ my: "auto", color: "gray" }}>
                {project?.estimatedPrice.toLocaleString("en-US")} VND
              </Typography>
            </Box>
            <Box sx={{ mb: 1, display: "flex" }}>
              <Typography variant="h6">
                Giá trị dao động:{" "}
                {projectDesign?.minBudget?.toLocaleString("en-US")} VND
              </Typography>
              <Typography sx={{ mx: 2 }}>-</Typography>
              <Typography variant="h6">
                {projectDesign?.maxBudget?.toLocaleString("en-US")} VND
              </Typography>
            </Box>
            <Box sx={{ pb: 2, borderBottom: 1, borderColor: "lightgray" }}>
              <Typography variant="p">{projectDesign?.description}</Typography>
            </Box>

            <Box sx={{ my: 2 }}>
              {projectDesign?.paymentStageDesigns?.map((paymentStageDesign) => (
                <Grid
                  container
                  spacing={2}
                  sx={{
                    mb: 1,
                    pb: 2,
                    borderBottom: 1,
                    borderColor: "lightgray",
                  }}
                  key={paymentStageDesign.id}
                >
                  <Grid item xs={5} lg={5} sx={{ my: "auto" }}>
                    <Typography variant="h6">
                      {paymentStageDesign.name} (
                      {paymentStageDesign.pricePercentage}
                      %)
                    </Typography>
                  </Grid>
                  <Grid item xs={7} lg={7} sx={{ my: "auto" }}>
                    <Typography variant="p" textAlign="justify">
                      {paymentStageDesign.description}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
        )}
      </Grid>
    </FormModal>
  );
}
