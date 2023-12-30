import { createSlice } from "@reduxjs/toolkit";

import { getAdvertisementProjectById } from "/api/advertisementServices";
import { getProjectById } from "/api/projectServices";
import { getSiteById } from "/api/siteServices";

const initialState = {
  project: { name: "Dự án", type: 0, status: 0, language: 0 },
  site: { name: "Khu công trình" },
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProject: (state, actions) => {
      state.project = actions.payload.project || state.project;
    },
    clearProject: (state) => {
      state.project = { name: "Dự án", type: 0, status: 0, language: 0 };
    },
    setSite: (state, actions) => {
      state.site = actions.payload.site || state.site;
    },
    clearSite: (state) => {
      state.site = { name: "Khu công trình" };
    },
  },
});

export const fetchAdvertisementProjectData = (id) => {
  return async (dispatch) => {
    try {
      const response = await getAdvertisementProjectById(id);
      dispatch(setProject({ project: response }));
    } catch (error) {
      dispatch(clearProject());
    }
  };
};

export const fetchProjectData = (id) => {
  return async (dispatch) => {
    try {
      const response = await getProjectById(id);
      dispatch(setProject({ project: response.data }));
    } catch (error) {
      dispatch(clearProject());
    }
  };
};

export const fetchSiteData = (id) => {
  return async (dispatch) => {
    try {
      const response = await getSiteById(id);
      dispatch(setSite({ site: response }));
    } catch (error) {
      dispatch(clearSite());
    }
  };
};

export const { setProject, setSite, clearSite } = dataSlice.actions;

export default dataSlice.reducer;
