import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refresh: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, refresh, role } = action.payload;
      state.token = token;
      state.refresh = refresh;
      state.role = role;
    },
    logout: (state) => {
        state.token = null;
        state.refresh = null;
        state.role = null;
        localStorage.removeItem("reduxState");
      }
      
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
