import { createSlice } from "@reduxjs/toolkit";

import { getAdvertisementProjectById } from "/services/advertisementServices";
import { getProjectParticipation } from "/services/projectParticipationServices";
import { getProjectById } from "/services/projectServices";
import { getSiteById } from "/services/siteServices";

const initialState = {
  project: { name: "Dự án", type: 0, status: 0, language: 0 },
  projectRole: { userId: "", projectId: "", role: "" },
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
    setProjectRole: (state, actions) => {
      state.projectRole = actions.payload.projectRole || state.projectRole;
    },
    clearProjectRole: (state) => {
      state.projectRole = { userId: "", projectId: "", role: "" };
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
      dispatch(setProject({ project: response }));
    } catch (error) {
      dispatch(clearProject());
    }
  };
};

export const fetchProjectRoleData = ({ userId, projectId } = {}) => {
  return async (dispatch) => {
    try {
      const response = await getProjectParticipation({ userId, projectId });
      dispatch(setProjectRole({ projectRole: response }));
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

export const {
  setProject,
  setSite,
  clearSite,
  clearProject,
  setProjectRole,
  clearProjectRole,
} = dataSlice.actions;

export default dataSlice.reducer;
