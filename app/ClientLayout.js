"use client";

import { store } from "/store";
import { Provider } from "react-redux";
import { baselightTheme } from "/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={baselightTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
