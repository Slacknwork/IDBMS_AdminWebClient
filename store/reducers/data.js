import { createSlice } from "@reduxjs/toolkit";

import { getProjectById } from "/api/projectServices";

const initialState = { project: { name: "", type: 0, status: 0, language: 0 } };

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProject: (state, actions) => {
      state.project = actions.payload.project || state.project;
    },
  },
});

export const fetchProjectData = (id) => {
  return async (dispatch) => {
    try {
      const response = await getProjectById(id);
      dispatch(setProject({ project: response }));
    } catch (error) {
      dispatch(
        setProject({
          project: { name: "Error", type: 0, status: 0, language: 0 },
        })
      );
    }
  };
};

export const { setProject } = dataSlice.actions;

export default dataSlice.reducer;
