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
import {
  IconBuilding,
  IconDownload,
  IconFileCheck,
  IconUser,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import locales from "/constants/locales";
import fileConstants from "/constants/file";
import { projectStatusIndex } from "/constants/enums/projectStatus";

import {
  generateCompanyContract,
  generateIndividualContract,
} from "/services/contractServices";
import { downloadSettlementFile } from "/services/excelServices";

import FormModal from "../Form";
import IndividualContractForm from "./IndividualContractForm";
import CompanyContractForm from "./CompanyContractForm";
import { projectTypeIndex } from "/constants/enums/projectType";

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
      {project?.type === projectTypeIndex.Construction && (
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
      )}
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

  const [isDownloading, setIsDownloading] = useState(false);

  const fetchCompanyContract = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      toast.loading(`Đang tạo Hợp đồng doanh nghiệp...`);
      const fileName = `${fileConstants.documentType.CONTRACT} - ${project?.name}${fileConstants.type.DOCX}`;
      await generateCompanyContract(companyFormData, fileName);
      toast.dismiss();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Lỗi dữ liệu: Hợp đồng doanh nghiệp!");
    }
    setIsDownloading(false);
  };

  const fetchIndividualContract = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      toast.loading(`Đang tạo Hợp đồng cá nhân...`);
      const fileName = `${fileConstants.documentType.CONTRACT} - ${project?.name}${fileConstants.type.DOCX}`;
      await generateIndividualContract(individualFormData, fileName);
      toast.dismiss();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Lỗi dữ liệu: Hợp đồng cá nhân!");
    }
    setIsDownloading(false);
  };

  const fetchSettlementFile = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      toast.loading(`Đang tạo Bảng quyết toán...`);
      const fileName = `${fileConstants.documentType.SETTLEMENT} - ${project?.name}${fileConstants.type.XLSX}`;
      await downloadSettlementFile(project?.id, fileName);
      toast.dismiss();
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Lỗi dữ liệu: Quyết toán!");
    }
    setIsDownloading(false);
  };

  const fetchContract = () => {
    if (screen === 1 && selectedContractType === 3) {
      fetchSettlementFile();
      return;
    }
    if (screen !== 2) return;
    switch (selectedContractType) {
      case 1:
        fetchCompanyContract();
        break;
      case 2:
        fetchIndividualContract();
        break;
      default:
    }
  };

  useEffect(() => {
    fetchContract();
  }, [screen]);

  return (
    <FormModal
      sx={sx}
      buttonLabel="Tạo tự động"
      title="Tạo tài liệu tự động"
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
      disableSubmit={
        selectedContractType === 0 ||
        screen >= 2 ||
        (screen >= 1 && selectedContractType === 3)
      }
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
          ) : selectedContractType === 2 ? (
            <IndividualContractForm
              formData={individualFormData}
              setFormData={setIndividualFormData}
            ></IndividualContractForm>
          ) : (
            selectedContractType === 3 && (
              <Box sx={{ width: "100%", height: "15rem", textAlign: "center" }}>
                <Box sx={{ my: "auto" }}>
                  <IconDownload size={125} color="gray"></IconDownload>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Tập tin đang được tải xuống...
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mt: 1 }}>
                    <button
                      onClick={fetchContract}
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        border: "none",
                        background: "none",
                        padding: 0,
                        font: "inherit",
                      }}
                    >
                      Click vào đây
                    </button>{" "}
                    nếu tập tin không tự động tải xuống.
                  </Typography>
                </Box>
              </Box>
            )
          ))}
        {screen === 2 && (
          <Box sx={{ width: "100%", height: "15rem", textAlign: "center" }}>
            <Box sx={{ my: "auto" }}>
              <IconDownload size={125} color="gray"></IconDownload>
              <Typography variant="h5" sx={{ mt: 2 }}>
                Tập tin đang được tải xuống...
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                <button
                  onClick={fetchContract}
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    padding: 0,
                    font: "inherit",
                  }}
                >
                  Click vào đây
                </button>{" "}
                nếu tập tin không tự động tải xuống.
              </Typography>
            </Box>
          </Box>
        )}
      </Grid>
    </FormModal>
  );
}
