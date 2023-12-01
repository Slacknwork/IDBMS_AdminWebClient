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
} from "@mui/material";
import { getAllUsers } from "../../api/userServices";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PageContainer from "/components/container/PageContainer";
import CreateModal from "./createModal";
import UpdateModal from "./updateModal";
import UpdateStatusModal from "./updateStatusModal";
import userStatus from "/constants/enums/userStatus";

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const fetchDataFromApi = async () => {
        try {
          const data = await getAllUsers();
          console.log(data);
          setUsers(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Lỗi nạp dữ liệu từ hệ thống");
        }
      };
      fetchDataFromApi();
    }
  }, []);


  return (
    <PageContainer title={"PageContainer"} description={"PageContainer"}>
      <CreateModal
        request={{
          name: "John Doe",
          bio: "A software engineer",
          companyName: "ABC Corporation",
          address: "123 Main St, Cityville",
          email: "john.doe@example.com",
          password: "securepassword",
          phone: "1234567890",
          dateOfBirth: "2023-12-01T14:22:42.565Z",
          language: 0,
          externalId: "",
        }}
      >
        Lưu
      </CreateModal>
      <UpdateModal
        id={"7A2B1D40-1169-41BB-8062-06AD22F91744"}
        request={{
          name: "nam kun",
          bio: "A software engineer",
          companyName: "ABC Corporation",
          address: "123 Main St, Cityville",
          email: "john.doe@example.com",
          password: "securepassword",
          phone: "1234567890",
          dateOfBirth: "2023-12-01T14:22:42.565Z",
          language: 0,
          externalId: "",
        }}
      >
        Cập nhật
      </UpdateModal>
      <UpdateStatusModal
        id={"7A2B1D40-1169-41BB-8062-06AD22F91744"}
        status={1}
      >
        Cập nhật status
      </UpdateStatusModal>
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
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
                  Email
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Điện thoại
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Số dư
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Trạng thái
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {user.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {user.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {user.phone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {user.balance}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>
                  <Chip
                    sx={{
                      px: "4px",
                      backgroundColor: "primary.main",
                      color: "#fff",
                    }}
                    size="small"
                    label={userStatus[user.status]}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Button
                    component={Link}
                    variant="contained"
                    disableElevation
                    color="primary"
                    href={`/users/${user.id}`}
                  >
                    Thông tin
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PageContainer>
  );
}
