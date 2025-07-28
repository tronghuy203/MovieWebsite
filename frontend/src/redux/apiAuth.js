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
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
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
      "http://localhost:8000/v1/auth/register",
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
      "http://localhost:8000/v1/auth/verifyOtp",
      otp
    );
    dispatch(getOtpSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(getOtpFailed());
  }
};

export const logout = async (dispatch, accessToken, navigate, axiosJWT) => {
  dispatch(getLogoutStart());
  try {
    await axiosJWT.post(
      "http://localhost:8000/v1/auth/logout",
      {},
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getLogoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(getLogoutFailed());
    throw error;
  }
};
