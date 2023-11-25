import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "asdf",
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, username) => {
      state.username = username;
    },
    setUserLoginState: (state, loginState) => {
      state.loggedIn = loginState;
    },
  },
});

export const { setUsername, setUserLoginState } = userSlice.actions;

export default userSlice.reducer;
