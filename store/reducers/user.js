import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  name: "",
  token: "",
  role: "",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.id = actions.payload.id || state.id;
      state.username = actions.payload.username || state.username;
      state.name = actions.payload.name || state.name;
      state.token = actions.payload.token || state.token;
      state.role = actions.payload.role || state.role;
      state.loggedIn = true;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
