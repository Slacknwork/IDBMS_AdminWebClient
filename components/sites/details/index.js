"use client";

import { Box } from "@mui/material";

export default function SiteDetails({ children }) {
  return (
    <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
      {children}
    </Box>
  );
}
