"use client";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { generateIndividualContract } from "/api/contractServices";
import { Box } from "@mui/material";

export default function PreviewIndividualContract({ formData }) {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);

  const generateContract = async () => {
    try {
      const blob = await generateIndividualContract(formData);

      setDocuments([blob]);
      console.log(documents);
    } catch (error) {
      toast.error("Lỗi dữ liệu: Tải file hợp đồng!");
    }
  };

  useEffect(() => {
    generateContract();
  }, []);

  return (
    <Box sx={{ height: "30rem" }}>
      <DocViewer
        documents={documents.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileType: "docx",
          fileName: "Xem trước file",
        }))}
        pluginRenderers={DocViewerRenderers}
      />
    </Box>
  );
}
