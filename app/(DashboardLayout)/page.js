"use client";

import { Grid, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { useSelector } from "react-redux";

import { getDashboardData } from "/services/dashboardServices";

import DashboardCard from "/components/shared/DashboardCard";
import ProductPerformance from "/components/dashboard/ProductPerformance";
import PageContainer from "/components/container/PageContainer";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  // INIT
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const dashboard = await getDashboardData();
    } catch (error) {
      toast.error("Lỗi dữ liệu: Trang chủ!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchDashboard()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <DashboardCard title="Báo cáo gần nhất">
            <Timeline
              className="theme-timeline"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              sx={{
                p: 0,
                mb: "-40px",
                "& .MuiTimelineConnector-root": {
                  width: "1px",
                  backgroundColor: "#efefef",
                },
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.5,
                  paddingLeft: 0,
                },
              }}
            >
              <TimelineItem>
                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  Payment received from John Doe of $385.90
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="secondary" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight="600">New sale recorded</Typography>{" "}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  Payment was made of $64.95 to Michael
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="warning" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight="600">New sale recorded</Typography>{" "}
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="error" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight="600">New arrival recorded</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success" variant="outlined" />
                </TimelineSeparator>
                <TimelineContent>Payment Received</TimelineContent>
              </TimelineItem>
            </Timeline>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={8}>
          <ProductPerformance></ProductPerformance>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
