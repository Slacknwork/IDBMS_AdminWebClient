"use client";

import { store, persistor } from "/store";
import { Provider } from "react-redux";
import { baselightTheme } from "/utils/theme/DefaultColors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { viVN } from "@mui/x-date-pickers/locales";

const theme = createTheme({
  ...baselightTheme,
  viVN,
});

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
