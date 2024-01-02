"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

import { generateIndividualContract } from "/services/contractServices";

export default function PreviewCompanyContract({ formData }) {
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState(null);

  const generateContract = async () => {
    setLoading(true);
    try {
      const response = await generateIndividualContract(formData);
      setDocument(response);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Tải file hợp đồng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateContract();
  }, []);

  return (
    <Box sx={{ height: "25rem" }}>
      {document && <div dangerouslySetInnerHTML={{ __html: document }} />}
    </Box>
  );
}
