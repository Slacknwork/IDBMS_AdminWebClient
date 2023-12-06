"use client";

import { store, persistor } from "/store";
import { Provider } from "react-redux";
import { baselightTheme } from "/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          {children}
          <ToastContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
