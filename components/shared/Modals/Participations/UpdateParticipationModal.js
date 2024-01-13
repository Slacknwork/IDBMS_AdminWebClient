import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  Stack,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { IconSearch } from "@tabler/icons-react";

import participationRoleOptions from "/constants/enums/participationRole";
import companyRoleOptions from "/constants/enums/companyRole";

import {
  createProjectParticipation,
  updateProjectParticipation,
} from "/services/projectParticipationServices";

import FormModal from "/components/shared/Modals/Form";
import UserCard from "/components/shared/UserCard";

import LoopIcon from "@mui/icons-material/Loop";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UpdateParticipationModal({
  title = "Cập nhật",
  success,
  participationId,
  participationRole,
  currentUserId,
  users,
  handleOpen,
  loading,
  search,
  setSearch,
  page,
  setPage,
  pageSize,
  setPageSize,
}) {
  const params = useParams();

  const [formData, setFormData] = useState({
    role: participationRole,
    projectId: params.id,
    userId: "",
    userIdError: { hasError: false, label: "" },
  });
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    console.log(formData);
    setSelectedUser(users?.find((user) => user.id === formData.userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, users]);

  const handleInputChange = (field, value) => {
    switch (field) {
      case "userId":
        handleUserChange(value);
        handleInputError(field, false, "");
        break;
      default:
        handleInputError(field, false, "");
    }
  };

  const handleInputError = (field, hasError, label) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${field}Error`]: { hasError, label },
    }));
  };

  const handleUserChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      userId: newValue,
    }));
  };

  const handleUpdate = async () => {
    try {
      participationId
        ? await updateProjectParticipation(participationId, formData)
        : await createProjectParticipation(formData);
      toast.success("Cập nhật thành công!");
      success(true);
    } catch (error) {
      console.error("Error :", error);
      toast.error("Lỗi!");
    }
  };

  const onOpenModal = async () => {
    if (typeof handleOpen === "function") {
      await handleOpen();
      handleInputChange("userId", currentUserId);
    }
  };

  const [searchForm, setSearchForm] = useState(search);
  const onSearchChange = (e) => {
    setSearchForm(e.target.value);
  };
  const onSearchSubmit = () => {
    setSearch(searchForm);
  };

  return (
    <FormModal
      stickyBottom
      buttonLabel="Cập nhật"
      title={title}
      submitLabel="Cập nhật"
      onSubmit={handleUpdate}
      buttonEndIcon={<LoopIcon />}
      hasOpenEvent
      onOpen={onOpenModal}
      confirmBeforeSubmit
      confirmBeforeSubmitMessage={
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Cập nhật{" "}
            <span style={{ fontWeight: 800, fontSize: 16 }}>
              {participationRoleOptions[participationRole]}{" "}
            </span>
          </Typography>
          <UserCard
            name={selectedUser?.name || "Không tìm thấy"}
            email={selectedUser?.email || "..."}
            phone={selectedUser?.phone || "..."}
          ></UserCard>
        </Box>
      }
    >
      <Grid item xs={12} lg={12}>
        <FormControl sx={{ minWidth: 300 }}>
          <TextField
            label="Tìm kiếm"
            size="small"
            variant="outlined"
            placeholder={"Tìm tên người dùng"}
            value={searchForm}
            onChange={onSearchChange}
            onBlur={onSearchSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearchSubmit();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Box sx={{ height: "22rem", overflowY: "scroll" }}>
          {loading ? (
            <Stack sx={{ my: 5 }}>
              <CircularProgress sx={{ mx: "auto" }}></CircularProgress>
            </Stack>
          ) : (users && users.length) > 0 ? (
            <Table aria-label="simple table">
              {/* Table Head */}
              <TableHead
                sx={{ position: "sticky", top: 0, bgcolor: "white", zIndex: 1 }}
              >
                <TableRow>
                  <StyledTableCell width="25%">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Người dùng
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width="25%">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Vai trò
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width="25%">
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                    ></Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              {/* Table Body */}
              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.id}>
                    <TableCell>
                      <UserCard
                        name={user?.name || "Không tìm thấy"}
                        email={user?.email || "..."}
                        phone={user?.phone || "..."}
                      ></UserCard>
                    </TableCell>
                    <TableCell>
                      <Chip label={companyRoleOptions[user?.role ?? 0]}></Chip>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={() => handleUserChange(user?.id)}
                        checked={formData.userId === user?.id}
                      ></Checkbox>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Stack sx={{ my: 5 }}>
              <Typography variant="p" sx={{ textAlign: "center" }}>
                Không có dữ liệu.
              </Typography>
            </Stack>
          )}
        </Box>
      </Grid>
    </FormModal>
  );
}
