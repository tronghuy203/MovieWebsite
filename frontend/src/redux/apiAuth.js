import {
  getLoginFailed,
  getLoginStart,
  getLoginSuccess,
  getLogoutFailed,
  getLogoutStart,
  getLogoutSuccess,
  getOtpFailed,
  getOtpStart,
  getOtpSuccess,
  getRegisterFailed,
  getRegisterStart,
  getRegisterSuccess,
} from "./authSlice";
import axios from "axios";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(getLoginStart());
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVERURL}/v1/auth/login`, user,{
       withCredentials: true,
    });
    dispatch(getLoginSuccess(res.data));
    if(res.data.admin){
      navigate("/admin");
    }else{
      navigate("/");
    }
  } catch (error) {
    dispatch(getLoginFailed(error.response?.data?.message || "Có lỗi kết nối. Vui lòng thử lại!"));
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(getRegisterStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/v1/auth/register`,
      user
    );
    dispatch(getRegisterSuccess(res.data));
    navigate("/verifyotp", { state: { email: user.email } });
  } catch (error) {
    console.log(error);
    dispatch(getRegisterFailed(error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại"));
  }
};

export const verifyOtp = async (otp, dispatch, navigate) => {
  dispatch(getOtpStart());
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/v1/auth/verifyOtp`,
      otp
    );
    dispatch(getOtpSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(getOtpFailed());
  }
};

export const logout = async (dispatch, navigate, axiosJWT) => {
  dispatch(getLogoutStart());
  try {
    await axiosJWT.post(
      `${process.env.REACT_APP_SERVERURL}/v1/auth/logout`,
      {}
    );
    dispatch(getLogoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(getLogoutFailed());
    throw error;
  }
};
