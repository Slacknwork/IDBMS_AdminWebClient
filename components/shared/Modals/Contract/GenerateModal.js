"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { IconBuilding, IconFileCheck, IconUser } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import fileConstants from "/constants/file";
import { projectStatusIndex } from "/constants/enums/projectStatus";

import {
  generateCompanyContract,
  generateIndividualContract,
} from "/services/contractServices";

import FormModal from "../Form";
import IndividualContractForm from "./IndividualContractForm";
import CompanyContractForm from "./CompanyContractForm";

function SelectContractTypeScreen({
  selectedContractType,
  setSelectedContractType,
}) {
  const data = useSelector((state) => state.data);
  const project = data?.project;

  return (
    <Grid container columnSpacing={3} justifyContent="center">
      <Grid item xs={12} lg={4}>
        <Card>
          <CardActionArea
            disabled={project?.status !== projectStatusIndex.Negotiating}
            onClick={() => setSelectedContractType(1)}
            sx={{
              height: "15rem",
              ...(selectedContractType === 1 && {
                border: 3,
                borderColor: "dodgerblue",
              }),
            }}
          >
            <Box style={{ textAlign: "center", my: "auto" }}>
              <IconBuilding
                style={{ marginTop: "2em" }}
                size={75}
              ></IconBuilding>
              <CardContent>
                <Typography textAlign={"center"} gutterBottom variant="h5">
                  Công ty
                </Typography>
                <Typography textAlign={"center"} variant="subtitle2">
                  Tạo hợp đồng cho công ty
                </Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardActionArea
            disabled={project?.status !== projectStatusIndex.Negotiating}
            onClick={() => setSelectedContractType(2)}
            sx={{
              height: "15rem",
              ...(selectedContractType === 2 && {
                border: 3,
                borderColor: "dodgerblue",
              }),
            }}
          >
            <Box style={{ textAlign: "center", my: "auto" }}>
              <IconUser style={{ marginTop: "2em" }} size={75}></IconUser>
              <CardContent>
                <Typography textAlign={"center"} gutterBottom variant="h5">
                  Cá nhân
                </Typography>
                <Typography textAlign={"center"} variant="subtitle2">
                  Tạo hợp đồng cho cá nhân
                </Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardActionArea
            onClick={() => setSelectedContractType(3)}
            sx={{
              height: "15rem",
              ...(selectedContractType === 3 && {
                border: 3,
                borderColor: "dodgerblue",
              }),
            }}
          >
            <Box style={{ textAlign: "center", my: "auto" }}>
              <IconFileCheck
                style={{ marginTop: "2em" }}
                size={75}
              ></IconFileCheck>
              <CardContent>
                <Typography textAlign={"center"} gutterBottom variant="h5">
                  Quyết toán
                </Typography>
                <Typography textAlign={"center"} variant="subtitle2">
                  Tạo bản quyết toán cho dự án
                </Typography>
              </CardContent>
            </Box>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

export default function GenerateContractModal({ sx }) {
  // INIT
  const data = useSelector((state) => state.data);
  const project = data?.project;

  // COMPANY DATA
  const [companyFormData, setCompanyFormData] = useState({
    aCompanyName: "",
    aCompanyAddress: "",
    aOwnerName: "",
    aPhone: "",
    aCompanyCode: "",
    aPosition: "",
    aEmail: "",
    bCompanyName: "",
    bCompanyAddress: "",
    bSwiftCode: "",
    bRepresentedBy: "",
    bCompanyPhone: "",
    bPosition: "",
    bEmail: "",
    numOfCopie: 0,
    numOfA: 0,
    numOfB: 0,
    estimateDays: 0,
    projectName: "",
    paymentMethod: "",
    value: 0,
    aCompanyNameError: { hasError: false, label: "" },
    aCompanyAddressError: { hasError: false, label: "" },
    aOwnerNameError: { hasError: false, label: "" },
    aPhoneError: { hasError: false, label: "" },
    aCompanyCodeError: { hasError: false, label: "" },
    aPositionError: { hasError: false, label: "" },
    aEmailError: { hasError: false, label: "" },
    bCompanyNameError: { hasError: false, label: "" },
    bCompanyAddressError: { hasError: false, label: "" },
    bSwiftCodeError: { hasError: false, label: "" },
    bRepresentedByError: { hasError: false, label: "" },
    bCompanyPhoneError: { hasError: false, label: "" },
    bPositionError: { hasError: false, label: "" },
    bEmailError: { hasError: false, label: "" },
    numOfCopieError: { hasError: false, label: "" },
    numOfAError: { hasError: false, label: "" },
    numOfBError: { hasError: false, label: "" },
    estimateDaysError: { hasError: false, label: "" },
    projectNameError: { hasError: false, label: "" },
    paymentMethodError: { hasError: false, label: "" },
    valueError: { hasError: false, label: "" },
  });

  // INDIVIDUAL DATA
  const [individualFormData, setIndividualFormData] = useState({
    customerName: "",
    dateOfBirth: null,
    address: "",
    phone: "",
    email: "",
    identityCode: "",
    codeCreatedDate: null,
    issuedBy: "",
    registeredPlaceOfPermanentResidence: "",
    bCompanyName: "",
    bCompanyAddress: "",
    bSwiftCode: "",
    bRepresentedBy: "",
    bCompanyPhone: "",
    bPosition: "",
    bEmail: "",
    numOfCopie: 0,
    numOfA: 0,
    numOfB: 0,
    estimateDays: 0,
    projectName: "",
    paymentMethod: "",
    value: 0,
    customerNameError: { hasError: false, label: "" },
    dateOfBirthError: { hasError: false, label: "" },
    addressError: { hasError: false, label: "" },
    phoneError: { hasError: false, label: "" },
    emailError: { hasError: false, label: "" },
    identityCodeError: { hasError: false, label: "" },
    codeCreatedDateError: { hasError: false, label: "" },
    issuedByError: { hasError: false, label: "" },
    registeredPlaceOfPermanentResidenceError: { hasError: false, label: "" },
    bCompanyNameError: { hasError: false, label: "" },
    bCompanyAddressError: { hasError: false, label: "" },
    bSwiftCodeError: { hasError: false, label: "" },
    bRepresentedByError: { hasError: false, label: "" },
    bCompanyPhoneError: { hasError: false, label: "" },
    bPositionError: { hasError: false, label: "" },
    bEmailError: { hasError: false, label: "" },
    numOfCopieError: { hasError: false, label: "" },
    numOfAError: { hasError: false, label: "" },
    numOfBError: { hasError: false, label: "" },
    estimateDaysError: { hasError: false, label: "" },
    projectNameError: { hasError: false, label: "" },
    paymentMethodError: { hasError: false, label: "" },
    valueError: { hasError: false, label: "" },
  });

  const [screen, setScreen] = useState(0);
  const [selectedContractType, setSelectedContractType] = useState(0);
  const onSelectedContractTypeChange = (type) => {
    setSelectedContractType(type);
  };
  const handleScreen = (newScreen) => {
    setScreen(newScreen);
  };

  const fetchCompanyContract = async () => {
    try {
      const fileName = `${fileConstants.documentType.CONTRACT} - ${project?.name}${fileConstants.type.DOCX}`;
      await generateCompanyContract(companyFormData, fileName);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi dữ liệu: Hợp đồng doanh nghiệp!");
    }
  };

  const fetchIndividualContract = async () => {
    try {
      const fileName = `${fileConstants.documentType.CONTRACT} - ${project?.name}${fileConstants.type.DOCX}`;
      await generateIndividualContract(individualFormData, fileName);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi dữ liệu: Hợp đồng cá nhân!");
    }
  };

  useEffect(() => {
    if (screen !== 2) return;
    switch (selectedContractType) {
      case 1:
        fetchCompanyContract();
        break;
      case 2:
        fetchIndividualContract();
        break;
      case 3:
        break;
      default:
    }
  }, [screen]);

  return (
    <FormModal
      sx={sx}
      buttonLabel="Tạo tự động"
      title="Tạo hợp đồng"
      submitLabel="Tiếp"
      size="big"
      disableCloseOnSubmit
      stickyBottom
      bottomLeftContent={
        <Button
          disabled={screen === 0}
          disableElevation
          variant="outlined"
          onClick={() => screen > 0 && handleScreen(screen - 1)}
        >
          Quay lại
        </Button>
      }
      disableSubmit={selectedContractType === 0 || screen >= 2}
      onSubmit={() => screen < 2 && handleScreen(screen + 1)}
    >
      <Grid item xs={12} lg={12}>
        {screen === 0 && (
          <SelectContractTypeScreen
            selectedContractType={selectedContractType}
            setSelectedContractType={onSelectedContractTypeChange}
          ></SelectContractTypeScreen>
        )}
        {screen === 1 &&
          (selectedContractType === 1 ? (
            <CompanyContractForm
              formData={companyFormData}
              setFormData={setCompanyFormData}
            ></CompanyContractForm>
          ) : (
            selectedContractType === 2 && (
              <IndividualContractForm
                formData={individualFormData}
                setFormData={setIndividualFormData}
              ></IndividualContractForm>
            )
          ))}
        {screen === 2 && <Typography variant="body1">Đang tải...</Typography>}
      </Grid>
    </FormModal>
  );
}
