import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  siteName: "",
  projectName: "",
};

export const breadcrumbSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBreadcrumb: (state, actions) => {
      state.siteName = actions.payload.siteName || state.siteName;
      state.projectName = actions.payload.projectName || state.projectName;
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
