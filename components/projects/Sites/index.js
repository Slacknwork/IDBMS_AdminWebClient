"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Breadcrumbs,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import { getProjectById, updateProjectStatus } from "../../../api/projectServices";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const sites = [
  {
    id: "1",
    name: "Suburb house",
    address: "123 Whatever street",
    usePurpose: "to live in and do stuffs",
    area: 200,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProjectList() {
  const params = useParams();


  const [project, setProject] = useState([]);
  const [pending, setPendingConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getProjectById(params.id);
          console.log(data);
          setProject(data);
          if (data.status === 1) {
            setPendingConfirm(true);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data");
        }
      };
      fetchDataFromApi();
    }
  }, []);

  const handleAcceptProject = async (projectId) => {
    console.log(projectId)
    try {
      const response = await updateProjectStatus(projectId, 2);
      console.log(response);
      toast.success("Chấp nhận thành công!");
      setPendingConfirm(false)
    } catch (error) {
      console.error("Error update :", error);
      toast.error("Lỗi!");
    }
  };

  const handleRejectProject = async (projectId) => {
    console.log(projectId)
    try {
      const response = await updateProjectStatus(projectId, 6);
      console.log(response);
      toast.success("Từ chối thành công!");
    } catch (error) {
      console.error("Error update :", error);
      toast.error("Lỗi!");
    }
  };

  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
      {pending && <Box display="flex" justifyContent="right" alignItems="center" padding={2}>
        <Button
          variant="contained"
          disableElevation
          color="success"
          onClick={() => handleAcceptProject(project.id)}
        >
          Chấp nhận
        </Button>
        <Button
          variant="contained"
          disableElevation
          color="error"
          onClick={() => handleRejectProject(project.id)}
        >
          Từ chối dự án
        </Button>
      </Box>}

      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ mt: 2 }}>Công trình</Typography>
      </Breadcrumbs>
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
          mt: 2,
        }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tên
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Địa chỉ
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Mục đích
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Diện tích
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {project?.sites?.map((site) => (
            <StyledTableRow key={site.id}>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {site.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {site.address}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {site.usePurpose}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {site.area}m2
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  variant="contained"
                  disableElevation
                  color="primary"
                  href={`/projects/${params.id}/sites/${site.id}`}
                >
                  Chi tiết
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
