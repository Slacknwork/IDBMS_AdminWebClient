"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  TextField,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { getPaymentStagesByProjectId } from "../../../api/paymentStageServices";
import { useParams } from "next/navigation";
import PaymentStageModal from "./Modal";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


const stages = [
  {
    id: "1",
    stageNo: 1,
    name: "Pre-order",
    pricePercentage: 30,
    status: 0,
    isPrepaid: true,
    endTimePayment: "1/1/2023",
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

export default function ProjectPayments() {
  const params = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleStartStage = () => {
    console.log("start")
    console.log(stages);
  };

  const [payments, setPayments] = useState([]);
  const [projectId, setProjectId] = useState(params.id);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getPaymentStagesByProjectId(projectId);
          console.log(data);
          setPayments(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, [projectId]);


  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          disableElevation
          color="primary"
          onClick={handleModalOpen}
        >
          Thêm giai đoạn
        </Button>
        <PaymentStageModal
          open={modalOpen}
          onClose={handleModalClose}
        ></PaymentStageModal>
      </Box>
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
                Giai đoạn
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Tên
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Phần trăm
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Đã trả tiền
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Cần trả trước
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Thời hạn
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments && payments?.map((stage) => (
            <StyledTableRow key={stage.id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {stage.stageNo}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {stage.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {stage.pricePercentage}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    px: "4px",
                    backgroundColor: "primary.main",
                    color: "#fff",
                  }}
                  size="small"
                  label={stage.isPaid ? "Đã trả" : "Chưa"}
                ></Chip>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    px: "4px",
                    backgroundColor: "primary.main",
                    color: "#fff",
                  }}
                  size="small"
                  label={stage.isPrepaid ? "Có" : "Không"}
                ></Chip>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={400}>
                  {new Date(stage?.endTimePayment).toLocaleDateString("en-GB")}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  disableElevation
                  color="success"
                  onClick={handleStartStage}
                >
                  Bắt đầu giai đoạn
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button
                  component={Link}
                  variant="contained"
                  disableElevation
                  color="primary"
                  href={`/projects/${params.id}/payment/${stage.id}`}
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
