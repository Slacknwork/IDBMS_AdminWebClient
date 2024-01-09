"use client";

import Link from "next/link";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import moment from "moment-timezone";
import "moment/locale/vi";

import { companyRoleConstants } from "/constants/enums/companyRole";
import timezone from "/constants/timezone";

moment.tz.setDefault(timezone.momentDefault);
moment.locale(timezone.momentLocale);

import {
  getDashboardData,
  getDashboardDataByUserId,
} from "/services/dashboardServices";

import DashboardCard from "/components/shared/DashboardCard";
import PageContainer from "/components/container/PageContainer";

export default function DashboardPage() {
  // INIT
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [recentReports, setRecentReports] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [numOngoingProjects, setNumOngoingProjects] = useState(0);
  const [numOngoingTasks, setNumOngoingTasks] = useState(0);

  const fetchDashboard = async () => {
    try {
      const dashboard =
        user.role === companyRoleConstants.ADMIN
          ? await getDashboardData()
          : (user.role === companyRoleConstants.ARCHITECT ||
              user.role === companyRoleConstants.CONSTRUCTION_MANAGER) &&
            (await getDashboardDataByUserId(user.id));

      setRecentReports(dashboard.recentReports);
      setRecentProjects(dashboard.recentProjects);
      setNumOngoingProjects(dashboard.numOngoingProjects);
      setNumOngoingTasks(dashboard.numOngoingTasks);
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
      <Grid container spacing={3} sx={{ minHeight: "36rem" }}>
        <Grid item xs={12} lg={4}>
          <DashboardCard title="Báo cáo gần nhất">
            <Timeline
              className="theme-timeline"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              sx={{
                p: 0,
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
              {loading ? (
                <Stack sx={{ width: "100%", height: "10rem" }}>
                  <CircularProgress sx={{ m: "auto" }}></CircularProgress>
                </Stack>
              ) : recentReports && recentReports.length > 0 ? (
                recentReports.map((report) => (
                  <TimelineItem key={report.id}>
                    <TimelineOppositeContent>
                      {moment(report?.createdTime).format("lll")}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="primary" variant="outlined" />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {report.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        {report.projectTask?.name}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))
              ) : (
                <Stack sx={{ width: "100%", height: "10rem" }}>
                  <Typography variant="p" sx={{ m: "auto" }}>
                    Không có dữ liệu.
                  </Typography>
                </Stack>
              )}
            </Timeline>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={8}>
          <DashboardCard title="Dự án gần nhất">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="50%">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Last Updated
                    </Typography>
                  </TableCell>
                  <TableCell width="25%" align="right">
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                    ></Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {project.name}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {project.site?.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {moment(project.updatedDate).format("lll")}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        disableElevation
                        variant="contained"
                        component={Link}
                        href={`/projects/${project.id}`}
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
