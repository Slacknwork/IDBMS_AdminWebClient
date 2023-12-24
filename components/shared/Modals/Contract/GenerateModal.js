"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import FormModal from "../Form";
import IndividualContractForm from "./IndividualContractForm";
import CompanyContractForm from "./CompanyContractForm";
import PreviewIndividualContract from "./PreviewIndividualContract";
import PreviewCompanyContract from "./PreviewCompanyContract";

function SelectContractTypeScreen({
  selectedContractType,
  setSelectedContractType,
}) {
  return (
    <Grid container columnSpacing={6} justifyContent="center">
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
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography textAlign={"center"} gutterBottom variant="h5">
                Công ty
              </Typography>
              <Typography textAlign={"center"} variant="subtitle2">
                Tạo hợp đồng cho công ty
              </Typography>
            </CardContent>
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
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography textAlign={"center"} gutterBottom variant="h5">
                Cá nhân
              </Typography>
              <Typography textAlign={"center"} variant="subtitle2">
                Tạo hợp đồng cho cá nhân
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

export default function GenerateContractModal({ sx }) {
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
          onClick={() => screen > 0 && setScreen(screen - 1)}
        >
          Quay lại
        </Button>
      }
      disableSubmit={selectedContractType === 0}
      onSubmit={() => screen < 2 && setScreen(screen + 1)}
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
        {screen === 2 &&
          (selectedContractType === 1 ? (
            <PreviewCompanyContract
              formData={companyFormData}
            ></PreviewCompanyContract>
          ) : (
            selectedContractType === 2 && (
              <PreviewIndividualContract
                formData={individualFormData}
              ></PreviewIndividualContract>
            )
          ))}
      </Grid>
    </FormModal>
  );
}
