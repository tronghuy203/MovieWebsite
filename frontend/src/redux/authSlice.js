import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isFetching: false,
      currentUser: null,
      error: false,
      errorMessage: "",
    },
    register: {
      isFetching: false,
      success: false,
      error: false,
      errorMessage: "",
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
    getLoginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.errorMessage = action.payload;
    },
    getRegisterStart: (state) => {
      state.register.isFetching = true;
    },
    getRegisterSuccess: (state) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = false;
    },
    getRegisterFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.errorMessage = action.payload;
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
    getLogoutSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    getLogoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    clearMessageErrorLogin: (state) =>{
      state.login.error = false;
      state.login.errorMessage = ""
    },
     clearMessageErrorRegister: (state) =>{
      state.register.error = false;
      state.register.errorMessage = ""
    }
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
  getLogoutFailed,
  clearMessageErrorRegister,
  clearMessageErrorLogin
} = authSlice.actions;
export default authSlice.reducer;
