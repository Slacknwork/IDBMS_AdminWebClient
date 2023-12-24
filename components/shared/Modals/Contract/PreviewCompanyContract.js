"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { generateCompanyContract } from "/api/contractServices";
import { Box } from "@mui/material";

export default function PreviewCompanyContract({ formData }) {
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState(null);

  const generateContract = async () => {
    setLoading(true);
    try {
      const response = await generateCompanyContract(formData);
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
