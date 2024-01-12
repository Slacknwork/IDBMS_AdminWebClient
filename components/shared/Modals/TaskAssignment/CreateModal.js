"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  tableCellClasses,
  TextField,
  Typography,
} from "@mui/material";
import { IconSearch } from "@tabler/icons-react";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { projectTypeIndex } from "/constants/enums/projectType";
import participationRoleOptions, {
  participationRoleIndex,
} from "/constants/enums/participationRole";

import { getParticipationsByProjectId } from "/services/projectParticipationServices";
import { createTaskAssignments } from "/services/taskAssignmentServices";

import FormModal from "/components/shared/Modals/Form";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export default function CreateTaskAssignmentModal({ success, selectedTasks }) {
  // INIT
  const data = useSelector((state) => state.data);
  const project = data?.project;
  const params = useParams();

  // SEARCH
  const [search, setSearch] = useState("");
  const [searchForm, setSearchForm] = useState("");
  const onSearchSubmit = () => {
    setSearch(searchForm);
  };

  // PARTICIPATIONS
  const [count, setCount] = useState(0);
  const [participations, setParticipations] = useState([]);
  const fetchParticipations = async () => {
    try {
      const projectId = params.id;
      const role =
        project?.type === projectTypeIndex.Decor
          ? participationRoleIndex.Architect
          : project?.type === projectTypeIndex.Construction &&
            participationRoleIndex.ConstructionManager;

      const data = await getParticipationsByProjectId({
        projectId,
        role,
        search,
      });
      setParticipations(data.paginatedList?.list);
      setCount(data.paginatedList?.totalItem);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Thành viên!");
    }
  };

  // SELECT PARTICIPANTS
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const onSelectedParticipantsChange = (participantId) => {
    const isSelected = selectedParticipants.includes(participantId);
    if (isSelected) {
      setSelectedParticipants(
        selectedParticipants.filter((id) => id !== participantId)
      );
    } else {
      setSelectedParticipants([...selectedParticipants, participantId]);
    }
  };

  // CREATE TASK ASSIGNMENT
  const onCreateTaskAssignment = async () => {
    try {
      const projectId = params.id;
      const projectParticipationId = selectedParticipants;
      const projectTaskId = selectedTasks;
      await createTaskAssignments(
        {
          projectParticipationId,
          projectTaskId,
        },
        projectId
      );
      toast.success("Phân công thành công!");
      typeof success === "function" && success();
    } catch (error) {
      toast.error("Lỗi phân công!");
    }
  };

  useEffect(() => {
    fetchParticipations();
  }, [search]);

  return (
    <FormModal
      sx={{ my: "auto", mr: 1 }}
      submitLabel="Chọn"
      title={`Phân công ${selectedTasks ? selectedTasks.length : 0} công việc`}
      buttonLabel="Phân công"
      confirmBeforeSubmit
      confirmBeforeSubmitMessage={`Phân công ${
        selectedTasks ? selectedTasks.length : 0
      } công việc cho ${
        selectedParticipants ? selectedParticipants.length : 0
      } thành viên?`}
      confirmBeforeSubmitButtonLabel="Phân công"
      onSubmit={onCreateTaskAssignment}
    >
      <Grid item xs={12}>
        <FormControl sx={{ minWidth: 300 }}>
          <TextField
            label="Tìm kiếm"
            size="small"
            variant="outlined"
            placeholder="Tìm tên thành viên..."
            value={searchForm}
            onChange={(e) => setSearchForm(e.target.value)}
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
        <Box sx={{ height: "20rem", overflowY: "scroll" }}>
          {participations && participations.length > 0 ? (
            <Table aria-label="simple table">
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  bgcolor: "white",
                  zIndex: 1,
                }}
              >
                <TableRow>
                  <StyledTableCell width={"10%"}></StyledTableCell>
                  <StyledTableCell width={"45%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Tên
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell width={"45%"}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Vai trò
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participations.map((participation) => (
                  <StyledTableRow key={participation.id}>
                    <TableCell>
                      <Checkbox
                        color="primary"
                        onChange={() =>
                          onSelectedParticipantsChange(participation.id)
                        }
                        checked={selectedParticipants.includes(
                          participation.id
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {participation.user?.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={participationRoleOptions[participation.role]}
                      ></Chip>
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
