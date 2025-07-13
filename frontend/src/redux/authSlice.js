import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isFetching: false,
      currentUser: null,
      error: false,
    },
    register: {
      isFetching: false,
      success: false,
      error: false,
    },
    otp: {
      isFetching: false,
      success: false,
      error: false,
    },
  },
  reducers: {
    getLoginStart: (state) => {
      state.login.isFetching = true;
    },
    getLoginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    getLoginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    getRegisterStart: (state) => {
      state.register.isFetching = true;
    },
    getRegisterSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    getRegisterFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    getOtpStart: (state) => {
      state.otp.isFetching = true;
    },
    getOtpSuccess: (state) => {
      state.otp.isFetching = false;
      state.otp.success = true;
      state.otp.error = false;
    },
    getOtpFailed: (state) => {
      state.otp.isFetching = false;
      state.otp.error = true;
    },

    getLogoutStart: (state) => {
      state.login.isFetching = true;
    },
    getLogoutSuccess: (state,action) => {
       state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    getLogoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const {
  getLoginStart,
  getLoginSuccess,
  getLoginFailed,
  getRegisterStart,
  getRegisterSuccess,
  getRegisterFailed,
  getOtpStart,
  getOtpSuccess,
  getOtpFailed,
  getLogoutStart,
  getLogoutSuccess,
  getLogoutFailed
} = authSlice.actions;
export default authSlice.reducer;
